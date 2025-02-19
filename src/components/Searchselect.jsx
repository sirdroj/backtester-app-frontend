import { useState, useEffect, useRef } from "react";

export default function Searchselect({ options, onSelect }) {
  options = options.filter(op => op !== "None");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null); // Reference for detecting outside clicks
 const [selected,setSelected]=useState()
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-20" ref={dropdownRef} >
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex bg-gray-700 justify-center w-full px-4 py-2 text-sm font-medium text-white   rounded-md shadow-sm "
      >
        <span className="mr-2 w-[120px]">{selected || "Select an Option"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute text-white right-0 mt-2 w-56 bg-gray-700 shadow-lg rounded-md border border-gray-200 p-2">
          {/* Search Input */}
          {options.length>5 && <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 py-1 text-white bg-gray-700 border rounded-md border-gray-300 focus:outline-none"
          />}

          {/* Dropdown Options */}
          <div className="mt-2 space-y-1 text-white">
            {options.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-2 py-1 text-sm text-gray-white z-[100000000] hover:bg-gray-600 cursor-pointer rounded-md"
                  onClick={() => {
                    setSelected(option)
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No matches found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
