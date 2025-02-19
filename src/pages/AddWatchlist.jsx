import React, { useState } from "react";
import Papa from "papaparse";
import currentAPI from "../apiendpoint";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/useStore";

const AddWatchlist = ({ setshowaddwatchlist }) => {
  const [tableData, setTableData] = useState([]);
  const [watchlistName, setWatchlistName] = useState("");
  const [error, setError] = useState("");
  const [isFileValid, setIsFileValid] = useState(false);
  const navigate = useNavigate();
  const { token, fetchSentibytes } = useStore();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setError("");
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data } = results;
          if (data.length > 0 && "Name" in data[0] && "Ticker" in data[0]) {
            setTableData(data);
            setIsFileValid(true);
          } else {
            setTableData([]);
            setIsFileValid(false);
            setError("Invalid CSV format. Ensure columns are 'Name' and 'Ticker'.");
          }
        },
      });
    } else {
      setTableData([]);
      setIsFileValid(false);
      setError("Please upload a valid CSV file.");
    }
  };

  const handleSubmit = async () => {
    if (!watchlistName.trim()) {
      alert("Please enter a watchlist name.");
      return;
    }

    try {
      const response = await fetch(`${currentAPI}/add_watchlistCSV`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          watchlistName,
          watchlist: tableData,
          token,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        alert("File submitted successfully!");
        setshowaddwatchlist(false);
        fetchSentibytes();
      } else {
        const errorText = await response.json();
        console.error("Error:", errorText);
        alert(
          `Failed to submit the file. Error: ${errorText.detail?.[0]?.msg || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the file. Please try again.");
    }
  };

  return (
    <form className="flex flex-col items-center mt-20" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
      <p className="px-4 text-[13px] text-center">
        <b>Note :-</b> The uploaded CSV should have two columns only: 'Name' and 'Ticker'.
      </p>
      <input
        type="text"
        value={watchlistName}
        onChange={(e) => setWatchlistName(e.target.value)}
        placeholder="Enter Watchlist Name"
        required
        className="border p-2 rounded-md my-2 w-64 text-black "
      />
      <div className="flex items-center space-x-4 justify-center h-14">
        <label
          htmlFor="csv-upload"
          className="p-2 px-4 text-[14px] border text-white cursor-pointer underline border-gray-300 rounded-md bg-gray-300 bg-opacity-20"
        >
          Add Watch List
        </label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />
        {isFileValid && (
          <button
            type="submit"
            className="p-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default AddWatchlist;
