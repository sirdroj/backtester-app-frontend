import React from 'react';


export const TableEquity = ({ products ,tableTheme}) => {
  let colordc={1:"green",2:"red",3:"blue",4:"yellow"}

  return (
    <div className={`  mx-0   flex justify-center overflow-auto rounded-md`}>
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
      <div className=" relative h-[full] overflow-x-auto shadow-md sm:rounded-lg  w-full">
        <table className=" rounded-md min text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200 dark:bg-opacity-55">
          <thead className="text-xs uppercase dark:text-white">
            <tr className="bg-[#F7F8FB] dark:bg-slate-700  sticky top-0 z-10 border-b-[1px] border-gray-600">
              {Object.keys(products[0]).map((key,idx) =>{ 
                return(
                <th key={key} scope="col" className={`bg-${colordc[idx]}-200 px-6 py-3   dark:bg-opacity-50`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              )})}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={`border-b ${index%2==0?" dark:bg-gray-900  bg-[#FBFBFB]":" dark:bg-gray-800 bg-white"} dark:text-gray-200 border-b-gray-200 dark:border-gray-700`}>
                {Object.values(product).map((value, idx) => (
                  <td
                  key={idx}
                  className={`bg-${colordc[idx]}-200  px-6 py-2 bg-opacity-75 ${idx!=0?"dark:text-black":""} text-xs font font-semibold ${idx === 0 ? "text-black dark:text-white font-bold " : ""} ${
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
