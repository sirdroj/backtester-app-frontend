// src/store/useStore.js
import { create } from "zustand";
import currentAPI from "../apiendpoint";

// Zustand store
const useStore = create((set) => ({
  // State variables

  // State variables
  // explore_inputs_Data: [],
  userWatchlists: ["w1", "w2"],
  userPortfolios: ["p1", "p2"],

  fetchoptions: async () => {
    console.log("fetching options called");
    const { token } = useStore.getState();
    const url = `${currentAPI}/get_options?token=${encodeURIComponent(token)}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" }, // No Content-Type for GET
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      set({userWatchlists: data.watchlist_files, userPortfolios: data.portfolio_files});
    } catch (error) {
      console.error("Error fetching watchlist :", error);
    } finally {
    }
  },

  explore_inputs_Data: {
    universe_filters: {},
    technical_filters: {},
    fundamental_filters: {},
  },
  showAddPortfolioPopup: false,
  set_showAddPortfolioPopup: (data) => set({ showAddPortfolioPopup: data }),
  showAddwatchlistPopup: false,
  set_showAddwatchlistPopup: (data) => set({ showAddwatchlistPopup: data }),

  set_explore_inputs_Data: (data) => set({ explore_inputs_Data: data }),
  reset_explore_inputs_Data: () =>
    set({
      explore_inputs_Data: {
        universe_filters: {},
        technical_filters: {},
        fundamental_filters: {},
      },
    }),

  current_response_name: "Report 1",
  set_current_response_name: (data) => set({ current_response_name: data }),

  explore_response: [],
  set_explore_response: (data) => set({ explore_response: data }),

  explore_response_loading: false,
  set_explore_response_loading: (isLoading) =>
    set({ explore_response_loading: isLoading }),

  explore_response_error: false,
  set_explore_response_error: (error) => set({ explore_response_error: error }),

  handle_full_save_explore: (sec_name, data) => {
    const { explore_inputs_Data, set_explore_inputs_Data } =
      useStore.getState();

    console.log({ data });
    set_explore_inputs_Data({
      ...explore_inputs_Data,
      [sec_name]: data,
    });
    console.log("after action", { explore_inputs_Data });
  },
  // Function to send full form data
  send_Full_Explore_Data: async () => {
    const url = `${currentAPI}/explorer`;
    const { token, explore_inputs_Data } = useStore.getState();

    // Set loading state to true before starting the API request
    set({ explore_response_loading: true });

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(explore_inputs_Data),
      });

      if (!response.ok) {
        // Parse the error details from the response body
        const errorDetails = await response.json();
        const errorMessage = errorDetails.detail || "An unknown error occurred";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Update the response state
      set({ explore_response: result.results });

      // Reset error state if the request is successful
      set({ explore_response_error: null });

      return result;
    } catch (error) {
      // Log detailed error information
      console.error("Error details:", error.message);

      // Set the error state with the detailed error message
      set({ explore_response_error: error.message });

      return { error: error.message };
    } finally {
      // Set loading state to false after the API request finishes
      set({ explore_response_loading: false });
    }
  },
  name: "Aman",

  input: "",
  setInput: (data) => set({ input: data }),

  theme: "light",
  token: localStorage.getItem("access_token"),
  username: localStorage.getItem("username"),
  adminname: localStorage.getItem("adminname"),
  forminputData: {},
  watchlist: [],
  watchlist_news: [],
  watchlistNewsLoading: [],
  watchlistNewsError: [],
  news: [],
  newsloading: false,
  newserror: null,
  showWatchlistnewsPopup: null,
  sentibytes: [],
  sentibytesloading: false,
  sentibyteserror: null,

  portfoliosentibytes: [],
  portfoliosentibytesloading: false,
  portfoliosentibyteserror: null,

  indexTrend: [],

  // Actions

  setName: (newName) => set({ name: newName }),
  setToken: (newToken) => set({ token: newToken }),
  setUsername: (newUsername) => set({ username: newUsername }),
  setAdminName: (newAdminName) => set({ adminname: newAdminName }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  setFormInputData: (newFormData) => set({ forminputData: newFormData }),
  updateFormInputData: (key, value) =>
    set((state) => ({
      forminputData: {
        ...state.forminputData,
        [key]: { ...state.forminputData[key], ...value },
      },
    })),
  addFormInputData: (key, value) =>
    set((state) => ({
      forminputData: {
        ...state.forminputData,
        [key]: value,
      },
    })),
  removeFormInputData: (key) =>
    set((state) => {
      const newFormInputData = { ...state.forminputData };
      delete newFormInputData[key];
      return { forminputData: newFormInputData };
    }),

  // Action to fetch and update news
  setSentibytes: (data) => set({ sentibytes: data }),
  setsentibytesloading: (data) => set({ sentibytesloading: data }),
  setsentibyteserror: (data) => set({ sentibyteserror: data }),

  portfoliosetSentibytes: (data) => set({ portfoliosentibytes: data }),
  portfoliosetsentibytesloading: (data) =>
    set({ portfoliosentibytesloading: data }),
  portfoliosetsentibyteserror: (data) =>
    set({ portfoliosentibyteserror: data }),

  setshowWatchlistnewsPopup: (data) => set({ showWatchlistnewsPopup: data }),
  setWatchlist: (data) => set({ watchlist: data }),

  setWatchlistNews: (data) => set({ watchlist_news: data }),
  setWatchlistNewsLoading: (data) => set({ watchlistNewsLoading: data }),
  setWatchlistNewsError: (data) => set({ watchlistNewsError: data }),

  fetchnewsData: async () => {
    set({ newsloading: true, newserror: null });
    try {
      const response = await fetch(`${currentAPI}/news`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      set({ news: data, newsloading: false });
    } catch (err) {
      set({ newserror: err.message, newsloading: false });
    }
  },

  fetchindexTrend: async () => {
    set({ newsloading: true, newserror: null });
    try {
      const response = await fetch(`${currentAPI}/nifty_indexes`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      set({ indexTrend: data, newsloading: false });
    } catch (err) {}
  },

  fetchSentibytes: async () => {
    const { token } = useStore.getState();
    const url = `${currentAPI}/get_sentibytes/`;

    // const url = `${currentAPI}/get_sentibytes/`;
    const payload = {
      token,
      // watchlist: watchlist.map((obj) => obj.Ticker),
    };

    try {
      set({ sentibytesloading: true }); // Start loading
      set({ sentibyteserror: null }); // Clear any previous errors

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      set({ sentibytes: data.sentibytes }); // Update news state
    } catch (error) {
      console.error("Error fetching watchlist news:", error);
      set({ sentibyteserror: error.message }); // Set error state
    } finally {
      set({ sentibytesloading: false }); // Stop loading
    }
  },

  fetchPortfolioSentibytes: async () => {
    const { token } = useStore.getState();
    const url = `${currentAPI}/get_portfoliosentibytes/`;

    const payload = {
      token,
    };

    try {
      set({ portfoliosentibytesloading: true }); // Start loading
      set({ portfoliosentibyteserror: null }); // Clear any previous errors

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      set({ portfoliosentibytes: data.sentibytes }); // Update news state
    } catch (error) {
      console.error("Error fetching watchlist news:", error);
      set({ portfoliosentibyteserror: error.message }); // Set error state
    } finally {
      set({ portfoliosentibytesloading: false }); // Stop loading
    }
  },
}));

export default useStore;
