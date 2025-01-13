// import React, { useState } from 'react';

// const SentibyteObject = ({ data }) => {
//   const [dropdown, setDropdown] = useState(false);

//   return (
//     <div className="bg-gray-700 p-2 bg-opacity-50 rounded-md bg-blur-md transition-all duration-300">
//       {/* Ticker Section */}
//       <div
//         className="cursor-pointer font-bold text-lg"
//         onClick={() => setDropdown(!dropdown)}
//       >
//         {data["ticker"]}
//       </div>

//       {/* Display Sentybytes with Smooth Height Transition */}
//       <div
//         className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
//         style={{
//           maxHeight: dropdown ? `${data["sentybyte"].length * 2}rem` : '2rem',
//         }}
//       >
//         {dropdown
//           ? data["sentybyte"].map((item, index) => (
//               <p key={index} className="text-sm">
//                 {item}
//               </p>
//             ))
//           : <p className="text-sm">{data["sentybyte"][0]}</p>
//         }
//       </div>

//       {/* Dropdown Toggle Icon */}
//       <div className="w-full justify-end flex">
//         <img
//           src="./images/chevron-down (1).png"
//           alt="Toggle Dropdown"
//           className={`cursor-pointer transition-transform duration-300 ${
//             dropdown ? "rotate-180" : ""
//           }`}
//           onClick={() => setDropdown(!dropdown)}
//         />
//       </div>
//     </div>
//   );
// };

// export default SentibyteObject;

import React, { useState, useRef } from "react";

const SentibyteObject = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);
  const contentRef = useRef(null); // Ref to calculate the actual height of the content

  return (
    <div className="bg-gray-700 p-2 bg-opacity-50 rounded-md bg-blur-md transition-all duration-300 m-2 text-sm">
      {/* Ticker Section */}
      <div
        className="cursor-pointer font-bold text-[12px]"
        onClick={() => setDropdown(!dropdown)}
      >
        {data["ticker"]}
      </div>

      {/* Display Sentybytes with Smooth Height Transition */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: dropdown
            ? `${contentRef.current?.scrollHeight || 0}px`
            : "2rem", // Set height for only the first sentybyte
        }}
        ref={contentRef}
      >
        <ul className="list-disc pl-5">
          {" "}
          {/* Bullet points list */}
          {data["sentybyte"].map(
            (item, index) =>
              item.length > 0 && ( // Check if item length is greater than 0
                <li key={index} className="text-[12px]">
                  {" "}
                  {/* Each item is now wrapped in <li> */}
                  {item[0] === "-" ? item.slice(1) : item}
                </li>
              )
          )}
        </ul>
      </div>

      {/* Dropdown Toggle Icon */}
      <div className="w-full justify-end flex h-2 bg-opacity-10">
        <img
          src="./images/chevron-down (1).png"
          alt="Toggle Dropdown"
          className={`cursor-pointer transition-transform duration-300 h-5 relative bottom-1 ${
            dropdown ? "rotate-180" : ""
          }`}
          onClick={() => setDropdown(!dropdown)}
        />
      </div>
    </div>
  );
};

export default SentibyteObject;
