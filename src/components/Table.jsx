import React from 'react';

export const Table = ({ products }) => {
  return (
    <div className="mx-10 my-2 flex justify-center overflow-auto rounded-md">
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
      <div className="relative max-h-[500px] overflow-x-auto shadow-md sm:rounded-lg w-[95%] ">
        <table className="w-max rounded-md min text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="bg-[#F7F8FB] text-black sticky top-0 z-10">
              {Object.keys(products[0]).map((key) => (
                <th key={key} scope="col" className="px-6 py-3 bg-opacity-20 dark:bg-gray-800">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={`border-b ${index%2==0?"bg-[#FBFBFB]":" bg-white"} border-b-gray-200 dark:border-gray-700`}>
                {Object.values(product).map((value, idx) => (
                  <td
                  key={idx}
                  className={`px-6 py-2 text-xs font font-semibold ${idx === 0 ? "text-black font-semibold" : ""} ${
                    value.endsWith("%") ? (parseFloat(value) < 0 ? "text-red-500" : "text-green-500") : ""
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
