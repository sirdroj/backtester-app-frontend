import React, { useState } from "react";

const DropdownWithRadio = () => {
  const [options, setOptions] = useState([
    { id: 1, label: "AMC & Broking", checked: false },
    { id: 2, label: "AUTO", checked: false },
    { id: 3, label: "Auto Ancillaries", checked: false },
    { id: 4, label: "Banks - Private Sector", checked: false },
    { id: 5, label: "Banks - Public Sector", checked: false },
    { id: 6, label: "Cement", checked: false },
    { id: 7, label: "Chemicals", checked: false },
    { id: 8, label: "Railways", checked: false },
    { id: 9, label: "Construction & Infra", checked: false },
    { id: 10, label: "Defence", checked: false },
    { id: 11, label: "Digital & Platform", checked: false },
    { id: 12, label: "Domestic Appliances", checked: false },
    { id: 13, label: "Electric Equipment", checked: false },
    { id: 14, label: "Electronics - Components", checked: false },
    { id: 15, label: "Engineering", checked: false },
    { id: 16, label: "Fertilizers", checked: false },
    { id: 17, label: "Finance - Housing", checked: false },
    { id: 18, label: "FMCG FOOD", checked: false },
    { id: 19, label: "FMCG Personal Care", checked: false },
    { id: 20, label: "Footware", checked: false },
    { id: 21, label: "Healthcare", checked: false },
    { id: 22, label: "Home", checked: false },
    { id: 23, label: "Hotels", checked: false },
    { id: 24, label: "Insurance", checked: false },
    { id: 25, label: "IT LargeCap", checked: false },
    { id: 26, label: "IT Midcap", checked: false },
    { id: 27, label: "Jewellery", checked: false },
    { id: 28, label: "Media & Entertainment", checked: false },
    { id: 29, label: "Metals", checked: false },
    { id: 30, label: "Miscellaneous", checked: false },
    { id: 31, label: "NBFC (Non-Banking Financial Company)", checked: false },
    { id: 32, label: "Oil- Gas & Refineries", checked: false },
    { id: 33, label: "Paints", checked: false },
    { id: 34, label: "Pesticides & Agrochemicals", checked: false },
    { id: 35, label: "Pharmaceuticals", checked: false },
    { id: 36, label: "Plastics Products", checked: false },
    { id: 37, label: "Power Generation And Supply", checked: false },
    { id: 38, label: "Real Estate", checked: false },
    { id: 39, label: "Renewable Energy", checked: false },
    { id: 40, label: "Retail", checked: false },
    { id: 41, label: "Telecommunications", checked: false },
    { id: 42, label: "Textiles - Products", checked: false },
    { id: 43, label: "Transportation & Logistics", checked: false },
    { id: 44, label: "Tyres", checked: false }
  ]);
  

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleCheckboxChange = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-700 px-4 rounded-md w-max ">
      <label className="flex space-x-4 justify-between items-center w-max cursor-pointer">
        <div className="p-1">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value); 
                setDropdownOpen(true); 
              }}
              value={searchTerm} 
              type="text"
              className="border-none bg-gray-700 text-gray-200 text-sm rounded-lg block w-full ps-10"
              placeholder="Search sectors"
            />
          </div>
        </div>
        <img
          src="./images/chevron-down (1).png"
          className={` ${dropdownOpen ? "rotate-180" : ""} w-6 h-6`}
          alt="Toggle"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </label>

      {dropdownOpen && (
        <div className="z-10 rounded-lg relative max-h-56 overflow-y-auto">
          <ul
            className=" px-3 pb-3 text-sm text-gray-200 top-0 left-0"
            aria-labelledby="dropdownSearchButton"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.id}>
                  <div className="flex items-center p-2 rounded">
                    <input
                      id={`checkbox-item-${option.id}`}
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="w-4 h-4 rounded"
                    />
                    <label
                      htmlFor={`checkbox-item-${option.id}`}
                      className="w-full ms-2 text-sm font-medium text-gray-200 rounded"
                    >
                      {option.label}
                    </label>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownWithRadio;
