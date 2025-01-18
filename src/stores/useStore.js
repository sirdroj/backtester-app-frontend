// src/store/useStore.js
import { create } from "zustand";
import currentAPI from "../apiendpoint";

// Zustand store
const useStore = create((set) => ({
  // State variables


  explore_inputs_Data:{},
  
  set_explore_inputs_Data: (data)=>set({explore_inputs_Data: data}),
  
  name: "Aman",



  input:"",
  setInput: (data) => set({ input: data }),

  theme: "light",
  token: localStorage.getItem("access_token"),
  username: localStorage.getItem("username"),
  adminname: localStorage.getItem("adminname"),
  forminputData: {},
  watchlist: [],
  watchlist_news: [],
  watchlistNewsLoading:[],
  watchlistNewsError:[],
  news: [],
  newsloading: false,
  newserror: null,
  showWatchlistnewsPopup: null,
  sentibytes:[],
  sentibytesloading: false,
  sentibyteserror: null,

  portfoliosentibytes:[],
  portfoliosentibytesloading: false,
  portfoliosentibyteserror: null,

  indexTrend:[],


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
  portfoliosetsentibytesloading: (data) => set({ portfoliosentibytesloading: data }),
  portfoliosetsentibyteserror: (data) => set({ portfoliosentibyteserror: data }),


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
    } catch (err) {
    }
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
      set({ sentibyteserror: null })// Clear any previous errors
      
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      set({ sentibytes:data.sentibytes}); // Update news state
      
    } catch (error) {
      console.error("Error fetching watchlist news:", error);
      set({ sentibyteserror:error.message}); // Set error state
    } finally {
      set({ sentibytesloading:false}); // Stop loading
    }
  },


  fetchPortfolioSentibytes: async () => {
    const { token } = useStore.getState();
    const url = `${currentAPI}/get_portfoliosentibytes/`;

    // const url = `${currentAPI}/get_sentibytes/`;
    const payload = {
      token,
      // watchlist: watchlist.map((obj) => obj.Ticker),
    };
  
    try {
      
      set({ portfoliosentibytesloading: true }); // Start loading
      set({ portfoliosentibyteserror: null })// Clear any previous errors
      
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      set({ portfoliosentibytes:data.sentibytes}); // Update news state
      
    } catch (error) {
      console.error("Error fetching watchlist news:", error);
      set({ portfoliosentibyteserror:error.message}); // Set error state
    } finally {
      set({ portfoliosentibytesloading:false}); // Stop loading
    }
  },


}));

export default useStore;
