import React, { useState } from "react";

const CombineFiltersExplorer = () => {
  const [currentDropDown, setCurrentDropDown] = useState([0]);
  const [filterOrder, setFilterOrder] = useState(0);
  const [showNews, setShowNews] = useState(false);

  const handleDropdownClick = (id) => {
    if (currentDropDown.includes(id)) {
      setCurrentDropDown(currentDropDown.filter((item) => item !== id));
    } else {
      setCurrentDropDown([...currentDropDown, id]);
    }
  };

  return (
    <div>
      <div className="px-">
        <div
          onClick={() => handleDropdownClick(0)}
          className="flex justify-between border-b-[px] h-[40px] items-center text-[18px] px-4 cursor-pointer"
          style={{
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.7)", // Adjust shadow as needed
          }}
        >
          <h1 className="font-semibold">Combine Filter</h1>
          <img
            src="./images/chevron-down (1).png"
            className={`${currentDropDown.includes(0) ? "rotate-180" : ""}`}
            alt="Toggle"
          />
        </div>
        <div
          className={`dropdown-content ${
            currentDropDown.includes(0) ? "show max-h-[" + +"]" : ""
          } ml-2 px-4 p-2`}
        >
          <div className="mb-4 ">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
              <span
                className={`relative top-[20px] dark:bg-[#0D111E]  bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */} Filter
                Order
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label>Order </label>
                <div className=" flex justify-between inputs_wrapper">
                  <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                    <li class="w-full focus-within:z-10">
                      <a
                        onClick={() => setFilterOrder(1)}
                        href="#"
                        class={`${
                          filterOrder == 1
                            ? "bg-gray-500 text-gray-100 border-[1px] border-gray-100 scale-[1.01]"
                            : "bg-gray-700"
                        }  inline-block w-max p-2 bg-opacity-80   border-r-2 border-white   rounded-s-lg    `}
                        aria-current="page"
                      >
                        Technical first then Fundamental
                      </a>
                    </li>

                    <li class="w-full focus-within:z-10">
                      <a
                        onClick={() => setFilterOrder(2)}
                        href="#"
                        class={`${
                          filterOrder == 2
                            ? "bg-gray-500 text-gray-100 border-[1px] border-gray-100 scale-[1.01]"
                            : "bg-gray-700"
                        }  inline-block w-max p-2  bg-opacity-80  border-white   rounded-e-lg    `}
                      >
                        Fundamental first then Technical
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button type="submit" className="p-1 border-[1px] rounded-lg px-4 text-sm">Save&Next</button>
                </div>
            </form>
          </div>
          <div className="mb-4 ">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
              <span
                className={`relative top-[20px]  dark:bg-[#0D111E]  bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                NEWS SENTIMENT
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="mt-4 flex justify-end">
                <button
                  className="border-[1px] border-gray-500 px-2 rounded-md flex"
                  onClick={() => setShowNews(!showNews)}
                >
                  News
                  <img
                    src="./images/chevron-down (1).png"
                    className={`${
                      showNews ? "rotate-180" : ""
                    }`}
                    alt="Toggle"
                  />
                </button>
              </div>
              <table
                className={`${
                  showNews ? "" : "hidden"
                }  px-5 w-full mt-4 rounded-sm border-[1px] border-gray-600 text-gray-300`}
                style={{
                  boxShadow: "inset 0px -2px 2px rgba(0, 0, 0, 0.5)", // Inner shadow
                }}
              >
                <thead>
                  <tr className="border-b-[1px] ">
                    <th className="border-r-[1px] text-center border-[1px] border-gray-400">
                      News Headlines
                    </th>
                    <th className="text-center  border-[1px] border-gray-400">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-[80%] border-[1px] border-gray-400">
                      <div class="relative overflow-hidden  whitespace-nowrap w-[100%]">
                        <span class="inline-block animate-scroll text-sm">
                          Tata group buys Sir India, tata group becomes the
                          leading airlines owner
                        </span>
                      </div>
                    </td>
                    <td className="text-center flex items-center justify-center border-[1px] border-gray-400 bg-[#03FF10] bg-opacity-10">
                      <img src="./icons/up arrow.svg" alt="Up arrow" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[80%] border-[1px] border-gray-400">
                      <div class="relative overflow-hidden  whitespace-nowrap w-[100%]">
                        <span class="inline-block animate-scroll text-sm">
                          Hindenburg report unveals Adani group voilated some
                          roules
                        </span>
                      </div>
                    </td>
                    <td className="text-center flex justify-center border-[1px] border-gray-400 bg-[#FF0303] bg-opacity-10">
                      <img src="./icons/down arrow.svg" alt="Up arrow" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[80%] border-[1px] border-gray-400">
                      <div class="relative overflow-hidden  whitespace-nowrap w-[100%]">
                        <span class="inline-block animate-scroll text-sm">
                          Tata group buys Sir India, tata group becomes the
                          leading airlines owner
                        </span>
                      </div>
                    </td>
                    <td className="text-center flex items-center justify-center border-[1px] border-gray-400 bg-[#03FF10] bg-opacity-10">
                      <img src="./icons/up arrow.svg" alt="Up arrow" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between my-2 items-center">
                <label>Apply News Sentiment </label>

                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div class="relative w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-grey-200"></div>
                </label>
              </div>
              <div className="flex justify-end mt-2">
                <button type="submit" className="p-1 border-[1px] rounded-lg px-4 text-sm">Save&Next</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombineFiltersExplorer;
