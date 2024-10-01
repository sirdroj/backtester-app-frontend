import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const TradeInvestPeriod = () => {
  const [currentDropDown, setCurrentDropDown] = useState([0]);
  const [filterOrder, setFilterOrder] = useState(0);
  const [showNews, setShowNews] = useState(false);
  const [wholePeriod, setWholePeriod] = useState(false);

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
          <h1 className="font-semibold">INVEST/TRADE/PERIOD</h1>
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
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                Profile Type
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label>Chose a Type </label>
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
                        Trade
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
                        Invest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}

          <div className="mb-4">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px]">
              <span
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                Dates
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label>Whole Period</label>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wholePeriod}
                    onChange={(e) => setWholePeriod(!wholePeriod)}
                    className="sr-only peer"
                  />
                  {/* {wholePeriod} */}
                  <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-400"></div>
                </label>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  wholePeriod ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="flex justify-between my-2 items-center">
                  <label>Whole Period</label>
                  <div className="flex items-center text-[13px]">
                    <div className="relative top-[10px]">
                      <input
                        type="date"
                        className="bg-gray-700 scale-[0.8] p-1 rounded-md px-2"
                      />
                      <p className="text-[11px] text-center pr-5 text-gray-300">
                        Start Date
                      </p>
                    </div>
                    <span className="mx-3">-to-</span>
                    <div className="relative top-[10px]">
                      <input
                        type="date"
                        className="bg-gray-700 scale-[0.8] p-1 rounded-md px-2"
                      />
                      <p className="text-[11px] text-center pr-5 text-gray-300">
                        End Date
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  !wholePeriod
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="flex justify-between my-2 items-center">
                  <label>In Sample Dates</label>
                  <div className="flex items-center text-[13px]">
                    <div className="relative top-[10px]">
                      <input
                        type="date"
                        className="bg-gray-700 scale-[0.8] p-1 rounded-md px-2"
                      />
                      <p className="text-[11px] text-center pr-5 text-gray-300">
                        Start Date
                      </p>
                    </div>
                    <span className="mx-3">-to-</span>
                    <div className="relative top-[10px]">
                      <input
                        type="date"
                        className="bg-gray-700 scale-[0.8] p-1 rounded-md px-2"
                      />
                      <p className="text-[11px] text-center pr-5 text-gray-300">
                        End Date
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between my-2 items-center">
                  <label>Out Sample Dates</label>
                  <div className="flex items-center text-[13px]">
                    <div className="relative top-[10px]">
                      <input
                        type="date"
                        className="bg-gray-700 scale-[0.8] p-1 rounded-md px-2"
                      />
                      <p className="text-[11px] text-center pr-5 text-gray-300">
                        Start Date
                      </p>
                    </div>
                    <span className="mx-3">-to-</span>
                    <div className="relative top-[10px]">
                      <input
                        type="date"
                        className="bg-gray-700 scale-[0.8] p-1 rounded-md px-2"
                      />
                      <p className="text-[11px] text-center pr-5 text-gray-300">
                        End Date
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeInvestPeriod;
