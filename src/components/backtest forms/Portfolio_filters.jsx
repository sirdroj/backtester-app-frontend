import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import DropdownWithRadio from "../other utilities/DropdownWithRadio";

const Portfolio_filters = () => {
  const [currentDropDown, setCurrentDropDown] = useState([0]);
  const [filterOrder, setFilterOrder] = useState(0);
  const [showNews, setShowNews] = useState(false);
  const [wholePeriod, setWholePeriod] = useState(false);
  const [MCMIX_checkboxes, setMCMIX_checkbox] = useState([]);
  const data = {
    technicalData: [
      { label: "Trend", value: "Simple MA" },
      { label: "Momentum", value: "RSI" },
      { label: "Volatility", value: "ATR" },
      { label: "Breadth", value: "Breadth 1" },
      { label: "Volume", value: "Volume Accumulation" },
    ],
    fundamentalData: [
      {
        title: "QUARTERLY RESULTS",

        childrens: [
          {
            label: "Sales",
            values: ["YOY-growth"],
          },
          {
            label: "Expense",
            values: ["Material Cost", "10 weeks", "YOY-growth"],
          },
          {
            label: "Operating Profit",
            values: ["OPM %", "10 weeks", "YOY-growth"],
          },
          {
            label: "Net Profit",
            values: ["Profit after Tax %", "10 weeks", "YOY-growth"],
          },
          {
            label: "EPS in Rs",
            values: ["10 weeks", "YOY-growth"],
          },
        ],
      },
      {
        title: "PROFIT & LOSS",

        childrens: [
          {
            label: "Sales",
            values: ["YOY-growth"],
          },
          {
            label: "Expense",
            values: ["Material Cost", "10 weeks", "YOY-growth"],
          },
          {
            label: "Operating Profit",
            values: ["OPM %", "10 weeks", "YOY-growth"],
          },
          {
            label: "Tax",
            values: ["18%"],
          },
        ],
      },
      {
        title: "BALANCE SHEET",

        childrens: [
          {
            label: "Equity Capital",
            values: ["OPM %", "10 Days", "YOY-growth"],
          },
          {
            label: "Reserves ",
            values: ["OPM %", "10 Days", "YOY-growth"],
          },
          {
            label: "Borrowings",
            values: ["Long term Borrowings", "10 weeks", "YOY-growth"],
          },
          {
            label: "Other Liabilities",
            values: ["Trade Payble", "10 weeks", "YOY-growth"],
          },
          {
            label: "Fixed Assets",
            values: ["Land", "10 weeks", "YOY-growth"],
          },

          {
            label: "CWIP",
            values: ["OPM %", "10 weeks", "YOY-growth"],
          },
          {
            label: "Investments ",
            values: ["OPM %", "10 weeks", "YOY-growth"],
          },
          {
            label: "Other Assets",
            values: ["Inventories", "10 weeks", "YOY-growth"],
          },
        ],
      },
      {
        title: "CASH FLOWS",

        childrens: [
          {
            label: "Cash from Operating Activity",
            values: [
              "OPM %",
              "Profit from Receivables",
              "Intrest Paied",
              "10 Days",
              "YOY-growth",
            ],
          },
          {
            label: "Cash from Investing Activity",
            values: ["Fixed assets purchased", "10 Days", "YOY-growth"],
          },
          {
            label: "Cash from Financing Activity",
            values: ["Proceeds from Shares", "10 Days", "YOY-growth"],
          },
        ],
      },
      {
        title: "Shareholding Pattern",

        childrens: [
          {
            label: "Promoters",
            values: [
              "Tata Sons Private Limited",
              "10 Days",
              "YOY-growth",
            ],
          },
          {
            label: "Flls",
            values: [
              "Dodona Holdings Limited",
              "10 Days",
              "YOY-growth",
            ],
          },
          {
            label: "Dlls",
            values: [
              "SBI Life insurance Co Ltd",
              "10 Days",
              "YOY-growth",
            ],
          },
          {
            label: "Public",
            values: [
              "Derive Trading And Resorts Private Limited",
              "10 Days",
              "YOY-growth",
            ],
          },
        ],
      },
      {
        title: "Ratios",

        childrens: [
          {
            label: "Ratios",
            values: [
              "Debtor Days",
              "10 Days",
              "YOY-growth",
            ],
          },
          {
            label: "Cash Conversion Cycle",
            values: [
              "Working Capital Days",
              "10 Days",
              "YOY-growth",
            ],
          },
        ],
      },
    ],
  };

  const handleDropdownClick = (id) => {
    if (currentDropDown.includes(id)) {
      setCurrentDropDown(currentDropDown.filter((item) => item !== id));
    } else {
      setCurrentDropDown([...currentDropDown, id]);
    }
  };

  const handleCheckboxChange = (value) => {
    setMCMIX_checkbox((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      } else {
        return [...prevState, value];
      }
    });
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
          <h1 className="font-semibold p-2">NUMBER OF STOCK</h1>
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
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 p-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                Number of Stocks
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label> Number of Stocks in Portfolio </label>
                <div className=" flex justify-between inputs_wrapper">
                  <input
                    type="number"
                    className=" bg-gray-700 active:outline-gray-400 rounded-md w-20"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}
        </div>
      </div>
      <div className="px-">
        <div
          onClick={() => handleDropdownClick(1)}
          className="flex justify-between border-b-[px] h-[40px] items-center text-[18px] px-4 cursor-pointer"
          style={{
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.7)", // Adjust shadow as needed
          }}
        >
          <h1 className="font-semibold p-2">PORTFOLIO MIX</h1>
          <img
            src="./images/chevron-down (1).png"
            className={`${currentDropDown.includes(1) ? "rotate-180" : ""}`}
            alt="Toggle"
          />
        </div>
        <div
          className={`dropdown-content ${
            currentDropDown.includes(1) ? "show max-h-[" + +"]" : ""
          } ml-2 px-4 p-2`}
        >
          <div className="mb-4 m-1 ">
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
                Market Cap Mix
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <div
                  className=" flex items-center cursor-pointer"
                  onClick={() => handleCheckboxChange("largeCap")}
                >
                  <input
                    // id="link-checkbox"
                    type="checkbox"
                    checked={MCMIX_checkboxes.includes("largeCap")}
                    // onChange={() => handleCheckboxChange("largeCap")}
                    // onClick={() => handleCheckboxChange("largeCap")}
                    // value=""
                    class="w-4 h-4 mx-2 text-gray-600 rounded-sm"
                  />
                  Large Cap{" "}
                </div>
                <div className=" flex justify-between items-center inputs_wrapper">
                  <input
                    type="number"
                    className=" bg-gray-700 rounded-md w-20 m-1"
                  />
                  %
                </div>
              </div>
              <div className="flex justify-between my-2 items-center">
                <div
                  className=" flex items-center cursor-pointer"
                  onClick={() => handleCheckboxChange("midCap")}
                >
                  <input
                    // id="link-checkbox"
                    type="checkbox"
                    checked={MCMIX_checkboxes.includes("midCap")}
                    // onChange={() => handleCheckboxChange("midCap")}
                    // onClick={() => handleCheckboxChange("largeCap")}
                    // value=""
                    class="w-4 h-4 mx-2 text-gray-600 rounded-sm"
                  />
                  Mid Cap{" "}
                </div>
                <div className=" flex justify-between inputs_wrapper items-center">
                  <input
                    type="number"
                    className=" bg-gray-700 rounded-md w-20 m-1"
                  />
                  %
                </div>
              </div>
              <div className="flex justify-between my-2 items-center">
                <div
                  className=" flex items-center cursor-pointer"
                  onClick={() => handleCheckboxChange("smallCap")}
                >
                  <input
                    // id="link-checkbox"
                    type="checkbox"
                    checked={MCMIX_checkboxes.includes("smallCap")}
                    // onChange={() => handleCheckboxChange("smallCap")}
                    // onClick={() => handleCheckboxChange("largeCap")}
                    // value=""
                    class="w-4 h-4 mx-2 text-gray-600 rounded-sm"
                  />
                  Small Cap{" "}
                </div>
                <div className=" flex justify-between items-center inputs_wrapper">
                  <input
                    type="number"
                    className=" bg-gray-700 rounded-md w-20 m-1"
                  />
                  %
                </div>
              </div>
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}
          <div className="mb-4 m-1 z-50">
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
                Sector Mix
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2 pt-5"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between ite my-2 ">
                <label className="mt-2 ">Select Sectors</label>
                <div className=" flex justify-between  inputs_wrapper  z-50">
                  <DropdownWithRadio />
                </div>
              </div>
              <div className="flex justify-between ite my-2 ">
                <label className="mt-2 ">Sectors Allocation</label>
                <div className=" flex justify-between  inputs_wrapper">
                  <input
                    type="number"
                    className=" bg-gray-700 rounded-md w-20 m-1"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* ----------------------------------------------------***s2********************************************** */}
        </div>
      </div>
      <div className="z-0">
        <div
          onClick={() => handleDropdownClick(3)}
          className="flex justify-between border-b-[px] h-[40px] items-center text-[18px] px-4 cursor-pointer"
          style={{
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.7)", // Adjust shadow as needed
          }}
        >
          <h1 className="font-semibold p-2">ALLOCATION OF CAPITAL</h1>
          <img
            src="./images/chevron-down (1).png"
            className={`${currentDropDown.includes(3) ? "rotate-180" : ""}`}
            alt="Toggle"
          />
        </div>
        <div
          className={`dropdown-content ${
            currentDropDown.includes(3) ? "show max-h-[" + +"]" : ""
          } ml-2 px-4 p-2`}
        >
          <div className="mb-4 ">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
              <span
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 p-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                Capital
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label> AUM(capital) </label>
                <div className=" flex justify-between inputs_wrapper">
                  <input
                    type="number"
                    placeholder="10,00,00,000"
                    className=" bg-gray-700 active:outline-gray-400 rounded-md "
                  />
                </div>
              </div>

              {/* ------------------------------------------------------------------------- */}
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}
          <div className="mb-4 ">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
              <span
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 p-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                Allocation of Options
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label>Equiweight</label>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wholePeriod}
                    onChange={(e) => setWholePeriod(!wholePeriod)}
                    className="rounded-sm  checked:bg-gray-600 "
                  />

                  {/* <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-400"></div> */}
                </label>
              </div>

              {/* --------------------------------------------------- */}
              <label>Sectoral Trend</label>
              <div className="ml-4 border-l-[1px] pl-4">
                <div className="flex justify-between my-2 items-center">
                  <label> Energy </label>
                  <div className=" flex justify-between inputs_wrapper">
                    <input
                      type="number"
                      placeholder="1234"
                      className=" bg-gray-700 active:outline-gray-400 rounded-md "
                    />
                  </div>
                </div>
                {/* ------------------------------------------------------------------------- */}
                <div className="flex justify-between my-2 items-center">
                  <label> Auto </label>
                  <div className=" flex justify-between inputs_wrapper">
                    <input
                      type="number"
                      placeholder="1234"
                      className=" bg-gray-700 active:outline-gray-400 rounded-md "
                    />
                  </div>
                </div>
              </div>
              {/* --------------------------------------------------- */}
              <label>Market Cap</label>
              <div className="ml-4 border-l-[1px] pl-4">
                <div className="flex justify-between my-2 items-center">
                  <label> Mid Cap </label>
                  <div className=" flex justify-between inputs_wrapper">
                    <input
                      type="number"
                      placeholder="1234"
                      className=" bg-gray-700 active:outline-gray-400 rounded-md "
                    />
                  </div>
                </div>
                {/* ------------------------------------------------------------------------- */}
                <div className="flex justify-between my-2 items-center">
                  <label> Large Cap </label>
                  <div className=" flex justify-between inputs_wrapper">
                    <input
                      type="number"
                      placeholder="1234"
                      className=" bg-gray-700 active:outline-gray-400 rounded-md "
                    />
                  </div>
                </div>
              </div>
              {/* ------------------------------------------------------------------------- */}
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}
          <div className="mb-4 ">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
              <span
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 p-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                Factor Trend
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className=" my-4 items-center">
                <div className="flex justify-between font-semibold text-gray-400">
                  <label className="font-semibold">Technical Data</label>
                  {/* <div> Selected value</div> */}
                </div>
                <div className="ml-4 border-l-[1px] pl-4 text-xs">
                  <h1 className="">QUARTERLY RESULTS</h1>
                  <div className="flex justify-between my-2 items-center">
                    <div className="flex items-center">
                      <label> Trend - </label>
                      <div className="p-1 ml-2 px-4 bg-gray-700 border-[1px] rounded-md">
                        Simple MA
                      </div>
                    </div>

                    <div className=" flex justify-between inputs_wrapper">
                      <input
                        type="number"
                        placeholder="1234"
                        className=" bg-gray-700 active:outline-gray-400 rounded-md "
                      />
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------------- */}
                  <div className="flex justify-between my-2 items-center">
                    <div className="flex items-center">
                      <label> Momentum - </label>
                      <div className="p-1 ml-2 px-4 bg-gray-700 border-[1px] rounded-md">
                        RSI
                      </div>
                    </div>

                    <div className=" flex justify-between inputs_wrapper">
                      <input
                        type="number"
                        placeholder="1234"
                        className=" bg-gray-700 active:outline-gray-400 rounded-md "
                      />
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------------- */}
                  <div className="flex justify-between my-2 items-center">
                    <div className="flex items-center">
                      <label> Volatility - </label>
                      <div className="p-1 ml-2 px-4 bg-gray-700 border-[1px] rounded-md">
                        ATR
                      </div>
                    </div>

                    <div className=" flex justify-between inputs_wrapper">
                      <input
                        type="number"
                        placeholder="1234"
                        className=" bg-gray-700 active:outline-gray-400 rounded-md "
                      />
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------------- */}
                  <div className="flex justify-between my-2 items-center">
                    <div className="flex items-center">
                      <label> Breadth - </label>
                      <div className="p-1 ml-2 px-4 bg-gray-700 border-[1px] rounded-md">
                        Breadth 1
                      </div>
                    </div>

                    <div className=" flex justify-between inputs_wrapper">
                      <input
                        type="number"
                        placeholder="1234"
                        className=" bg-gray-700 active:outline-gray-400 rounded-md "
                      />
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------------- */}
                  <div className="flex justify-between my-2 items-center">
                    <div className="flex items-center">
                      <label> Volume - </label>
                      <div className="p-1 ml-2 px-4 bg-gray-700 border-[1px] rounded-md">
                        Volume Accunulation
                      </div>
                    </div>

                    <div className=" flex justify-between inputs_wrapper">
                      <input
                        type="number"
                        placeholder="1234"
                        className=" bg-gray-700 active:outline-gray-400 rounded-md "
                      />
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------------- */}
                </div>
                {/* --------------------------------------------------- */}
                <label className="">Fundamental Data</label>
                {data.fundamentalData.map((item, index) => (
                  <div
                    className="ml-4 border-b-[1px] border-gray-700 my-2 pl-1 "
                    key={index}
                  >
                    <h1 className="font-semibold text-[14px]">{item.title}</h1>
                    <div className="pl-2 ml-2 border-l-[1px]">
                      {item.childrens.map((item, index) => (
                        <div
                          key={index}
                          className="flex  justify-between my-2 items-center text-xs"
                        >
                          <div className="flex items-center">
                            <label> {item.label} - </label>
                            <div className="flex ">
                              {item.values.map((value, idx) => (
                                <div
                                  key={idx}
                                  className="p-1 ml-2 px-1 bg-gray-700 border-[1px] rounded-md"
                                >
                                  {value}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between inputs_wrapper">
                            <input
                              type="number"
                              placeholder="1234"
                              className="bg-gray-700 active:outline-gray-400 rounded-md"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}
          <div className="mb-4 ">
            <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
              <span
                className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 p-2 rounded-md pr-10 ${
                  currentDropDown.includes(0) ? "" : "shadow-none"
                }`}
                style={{
                  boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                }}
              >
                {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                Single Ticker
              </span>
            </h2>
            <form
              className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
              style={{
                boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
              }}
            >
              <div className="flex justify-between my-2 items-center">
                <label> Single Ticker </label>
                <div className=" flex justify-between inputs_wrapper">
                  <input
                    type="number"
                    placeholder="10"
                    className=" bg-gray-700 active:outline-gray-400 rounded-md "
                  />
                </div>
              </div>
            </form>
          </div>
          {/* ----------------------------------------------------***s2********************************************** */}
        </div>
      </div>
    </div>
  );
};

export default Portfolio_filters;
