import React, { useState } from 'react';

export const YearlySummaryTable = ({ products, tableTheme }) => {
  const [selectedOptionSecond, setSelectedOptionSecond] = useState('Option 1'); // For second column
  const [selectedOptionThird, setSelectedOptionThird] = useState('Option 1'); // For third column

  const handleSelectChangeSecond = (event) => {
    setSelectedOptionSecond(event.target.value);
  };

  const handleSelectChangeThird = (event) => {
    setSelectedOptionThird(event.target.value);
  };

  return (
    <div className={` my-2 flex justify-center overflow-auto rounded-md`}>
      <style>{`
        /* Scrollbar styles for webkit browsers (Chrome, Safari) */
        ::-webkit-scrollbar {
          width: 8px; /* Adjust width */
          height: 8px; /* Adjust height for horizontal scrollbar */
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1; /* Background of the scrollbar track */
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888; /* Color of the scrollbar thumb */
          border-radius: 10px; /* Rounded corners for thumb */
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555; /* Color on hover */
        }

        /* For Firefox */
        scrollbar-width: thin; /* Makes scrollbar thin */
        scrollbar-color: #888 #f1f1f1; /* thumb color and track color */
      `}</style>
      <div className="relative max-h-[500px] overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-max rounded-md min text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200 dark:bg-opacity-55">
          <thead className="text-xs uppercase dark:text-white">
            <tr className="bg-[#F7F8FB] dark:bg-slate-700 sticky top-0 z-10 text-sm">
              {Object.keys(products[0]).map((key, index) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-2 bg-opacity-20 dark:bg-gray-900 dark:bg-opacity-25 text-sm border-x-[1px] border-gray-600 "
                >
                  {/* Regular header for columns except 2nd and 3rd */}
                  {index === 1 ? (
                    <select
                      value={selectedOptionSecond}
                      onChange={handleSelectChangeSecond}
                      className="text-black p-1 dark:text-white text-sm dark:bg-gray-800 bg-transparent active:border-none focus:border-none rounded-lg px-5"
                    >
                      <option value="Option 1">StratV1F2</option>
                      <option value="Option 2">StratV2F1</option>
                      <option value="Option 3">StratV3F1</option>
                    </select>
                  ) : index === 2 ? (
                    <select
                      value={selectedOptionThird}
                      onChange={handleSelectChangeThird}
                      className="text-black p-1 dark:text-white text-sm dark:bg-gray-800 bg-transparent active:border-none focus:border-none rounded-lg px-5"
                    >
                      
                      <option value="Option 1">Nifty 500</option>
                      <option value="Option 2">Nifty 50</option>
                      <option value="Option 3">LargeCap 100</option>
                    </select>
                  ) : (
                    key.charAt(0).toUpperCase() + key.slice(1)
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0
                    ? 'dark:bg-gray-900 bg-[#FBFBFB]'
                    : 'dark:bg-gray-800 bg-white'
                } dark:text-gray-200 border-b-gray-200 dark:border-gray-700 `}
              >
                {Object.values(product).map((value, idx) => (
                  <td
                    key={idx}
                    className={`px-6 py-2 text-xs font font-semibold border-x-[1px] border-gray-600 ${
                      idx === 0 ? 'text-black font-bold dark:text-white ' : ''
                    } ${
                      value.endsWith('%')
                        ? parseFloat(value) < 0
                          ? 'text-red-500'
                          : 'text-green-500'
                        : ''
                    } w-max`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
