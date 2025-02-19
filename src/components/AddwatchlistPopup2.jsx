import React, { useState } from "react";
import Papa from "papaparse";
import currentAPI from "../apiendpoint";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/useStore";

const AddwatchlistPopup2 = () => {
  const [tableData, setTableData] = useState([]);
  const [watchlistName, setWatchlistName] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { token, showAddwatchlistPopup, set_showAddwatchlistPopup } = useStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleSubmitFile = async () => {
    if (!selectedFile || !watchlistName) {
      setError("Please provide a watchlist name and upload a CSV file.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("watchlistName", watchlistName);
    formData.append("token", token);

    try {
      const response = await fetch(`${currentAPI}/upload-watchlist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      
      set_showAddwatchlistPopup(false);
      setFileName("");
      setSelectedFile(null);
      setWatchlistName("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`fixed ${showAddwatchlistPopup ? "block" : "hidden"} z-[100] flex justify-center items-center w-full`}>
      <div className="bg-slate-700 p-10 rounded-md">
        <div className="flex justify-end">
          <button className="bg-slate-600 px-1 rounded-md" onClick={() => set_showAddwatchlistPopup(false)}>
            Close
          </button>
        </div>
        <h1 className="text-center text-lg font-bold">Add Watchlist</h1>
        <form
          className="flex flex-col items-center mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitFile();
          }}
        >
          <p className="px-4 text-[13px] text-center">
            <b>Note:</b> The uploaded CSV should have two columns: 'Name' and 'Ticker'.
          </p>
          <input
            type="text"
            value={watchlistName}
            onChange={(e) => setWatchlistName(e.target.value)}
            placeholder="Enter Watchlist Name"
            required
            className="border p-2 rounded-md my-2 w-64 text-black"
          />
          <div className="flex flex-col items-center">
            <label htmlFor="csv-upload" className="p-2 px-4 text-[14px] border text-white cursor-pointer underline border-gray-300 rounded-md bg-gray-300 bg-opacity-20">
              Add Watch List
            </label>
            <input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
            {fileName && <p className="text-sm text-green-400 mt-2">Uploaded: {fileName}</p>}
          </div>
          <button type="submit" className="p-2 px-4 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600">
            Upload File
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddwatchlistPopup2;
