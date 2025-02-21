import React, { useState } from "react";
import Papa from "papaparse";
import currentAPI from "../apiendpoint";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/useStore";
import * as XLSX from "xlsx";

const AddwatchlistPopup = () => {
  const [tableData, setTableData] = useState([]);
  const [watchlistName, setWatchlistName] = useState("");
  const [error, setError] = useState("");
  const [isFileValid, setIsFileValid] = useState(false);
  const [fileName, setFileName] = useState(""); // New state for file name
  const [file,setfile]=useState()
  const navigate = useNavigate();
  const {
    token,
    fetchSentibytes,
    showAddwatchlistPopup,
    set_showAddwatchlistPopup,
    fetchoptions
  } = useStore();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data } = results;
          if (data.length > 0 && "Name" in data[0] && "Ticker" in data[0]) {
            setTableData(data);
            setIsFileValid(true);
            setFileName(file.name);
            setError("");
          } else {
            setTableData([]);
            setIsFileValid(false);
            setFileName("");
            setError(
              "Invalid CSV format. Ensure columns are 'Name' and 'Ticker'."
            );
          }
        },
      });
    } else if (fileExtension === "xls" || fileExtension === "xlsx") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[firstSheetName]
        );

        if (
          sheetData.length > 0 &&
          "Name" in sheetData[0] &&
          "Ticker" in sheetData[0]
        ) {
          setTableData(sheetData);
          setIsFileValid(true);
          setFileName(file.name);
          setError("");
        } else {
          setTableData([]);
          setIsFileValid(false);
          setFileName("");
          setError(
            "Invalid Excel format. Ensure columns are 'Name' and 'Ticker'."
          );
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setTableData([]);
      setIsFileValid(false);
      setFileName("");
      setError("Please upload a valid CSV or Excel file.");
    }
  };

  const handleSubmit = async () => {
    if (!watchlistName.trim()) {
      alert("Please enter a watchlist name.");
      return;
    }

    try {
      const response = await fetch(`${currentAPI}/add_customwatchlist`, {
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
        set_showAddwatchlistPopup(false)
        fetchoptions()
      } else {
        const errorText = await response.json();
        console.error("Error:", errorText);
        alert(
          `Failed to submit the file. Error: ${
            errorText.detail?.[0]?.msg || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <div
      className={`fixed ${
        showAddwatchlistPopup ? "flex" : "hidden"
      } z-[1000] justify-center items-center h-full w-full bg-black bg-opacity-[2%] backdrop-blur-sm`}
    >
      <div className=" bg-slate-700 p-10 rounded-md">
        <div className="flex justify-end">
          <button
            className="bg-slate-600 px-1 rounded-md"
            onClick={() => set_showAddwatchlistPopup(false)}
          >
            close
          </button>
        </div>
        <h1 className="text-center text-lg font-bold">Add Watchlist</h1>
        <form
          className="flex flex-col items-center mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <p className="px-4 text-[13px] text-center">
            <b>Note :-</b> The uploaded CSV should have two columns only: 'Name'
            and 'Ticker'.
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
            <label
              htmlFor="csv-upload"
              className="p-2 px-4 text-[14px] border text-white cursor-pointer underline border-gray-300 rounded-md bg-gray-300 bg-opacity-20"
            >
              Add Watch List
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv, .xls, .xlsx"
              className="hidden"
              onChange={handleFileUpload}
            />
            {fileName && (
              <p className="text-sm text-green-400 mt-2">
                Uploaded: {fileName}
              </p>
            )}
          </div>
          {isFileValid && (
            <button
              type="submit"
              className="p-2 px-4 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddwatchlistPopup;
