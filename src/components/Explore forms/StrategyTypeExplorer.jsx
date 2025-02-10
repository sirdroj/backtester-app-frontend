import React, { useState } from "react";

const initializeFormData = (inputsData) => {
  const initialData = {};

  const traverseInputs = (inputs) => {
    inputs.forEach((input) => {
      // Initialize the data for each input's title
      if (input.children) {
        initialData[input.title] = {}; // Initialize with empty object for nested fields

        input.children.forEach((child) => {
          if (child.type === "dropdown" || child.type === "period") {
            initialData[input.title][child.title] = child.options[0] || ""; // Set default value or empty string
          } else if (child.type === "input") {
            initialData[input.title][child.title] = ""; // Default for input fields
          }
          // Recurse into children
          traverseInputs(child.children || []);
        });
      } else {
        if (input.type === "dropdown" || input.type === "period") {
          initialData[input.title] = input.options[0] || ""; // Set default value or empty string
        } else if (input.type === "input") {
          initialData[input.title] = ""; // Default for input fields
        }
      }
    });
  };

  traverseInputs(inputsData);
  return initialData;
};

const StrategyType = () => {
  const inputsData = [
    {
      title: "DATA TYPE",
      children: [
        {
          title: "Source type",
          info: "Some info about trends and what is ",
          children: [
            {
              title: "Data Source",
              inputs: [
                {
                  type: "file upload",
                  show_option: "Upload Data",
                },
                {
                  type: "dropdown",
                  options: ["None","Native data", "Upload Data"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "ANALYSIS MIXTURE",
      children: [
        {
          title: "Technical Threshhold",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Trend",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None",
                    "Exponential MA",
                    "Wilder's MA",
                    // "Custom MAs",
                    "15",
                    "10",
                    "8",
                  ],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "simple MA",
                },
              ],
            },
            {
              title: "Momentum",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","RSI", "Stochastic", "15", "10", "8"],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "CMO",
                },
              ],
            },
            {
              title: "Volume",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","Volume Accunulation", "15", "10", "8"],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "Volume weighted MA",
                },
              ],
            },
          ],
        },
        {
          title: "Fundamental Threshhold",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Sales Growth",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","QTR-Growth", "Rate of Change", "CAGR", 10, 15],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "YOY-Growth",
                },
              ],
            },
            {
              title: "Expense",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","Employee Cost", "50%", "20%"],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "Material Cost",
                },
              ],
            },
            {
              title: "Profit before tax",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","35", "30%", "20%"],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "Tax %",
                },
              ],
            },
            {
              title: "Operating Profit",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","Interest", "Depreciation", "50%", "20%"],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "OPM %",
                },
              ],
            },
            {
              title: "Net Profit +",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None",
                    "Reported Net Profit",
                    "Minority share",
                    "Profit for EPS",
                    "Exceptional items AT",
                    "Profit for PE",
                    "50%",
                    "20%",
                  ],
                },
                {
                  type: "dropdown",
                  options: ["None",">", ">=", "<", "<="],
                },
                {
                  type: "fixed",
                  info: "Profit after tax",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  function getInput(type) {
    if (type == "dropdown") return <div>{type}</div>;
  }
  const [formData, setFormData] = useState(() =>
    initializeFormData(inputsData)
  );

  const handleChange = (secName, filterName, inputName, value) => {
    if (inputName == "quantity" && value < 0) {
      value = 0;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [filterName]: {
        ...prevFormData[filterName],
        [inputName]: value,
      },
    }));
  };

  const [currentDropDown, setCurrentDropDown] = useState([0]);

  const handleDropdownClick = (id) => {
    if (currentDropDown.includes(id)) {
      setCurrentDropDown(currentDropDown.filter((item) => item !== id));
    } else {
      // setCurrentDropDown([...currentDropDown, id]);
      setCurrentDropDown([id]);
    }
  };

  return (
    <div>
      {inputsData.map((item, index) => (
        <div key={index} className="px-">
          <div
            onClick={() => handleDropdownClick(index)}
            className="flex justify-between border-b-[px] h-[40px] items-center text-[18px] px-4 cursor-pointer"
            style={{
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.7)", // Adjust shadow as needed
            }}
          >
            <h1 className="font-semibold">{item.title}</h1>
            <img
              src="./images/chevron-down (1).png"
              className={`${
                currentDropDown.includes(index) ? "rotate-180" : ""
              }`}
              alt="Toggle"
            />
          </div>
          <div
            className={`dropdown-content ${
              currentDropDown.includes(index) ? "show max-h-[" + +"]" : ""
            } ml-2 px-4 p-2`}
          >
            {item.children.map((input, subIndex) => (
              <div key={subIndex} className="mb-4 ">
                {/* <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[18px] ">
                  <span
                    className={`relative top-[20px] dark:bg-[#0D111E]  bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                      currentDropDown.includes(index) ? "" : "shadow-none"
                    }`}
                    style={{
                      boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                    }}
                  >
                    {input.title} -
                  </span>
                </h2> */}
                <form
                  className="inputs px-2 shadow-black inset-2 rounded-lg p-2 mt-5"
                  style={{
                    boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                  }}
                >
                  <h1 className="font-semibold">{input.title}</h1>
                  <p className="text-center pt-1 pb-4 text-[10px]">
                    {input.info}
                  </p>

                  {input.children.map((field) => {
                    return (
                      <div key={field.id} className="flex items-center justify-between my-2">
                        {/* <div> {field.title} </div> */}
                        <label>{field.title}</label>
                        <div className=" flex justify-between items-center inputs_wrapper">
                          {field.inputs.map((input) => {
                            return (
                              <div key={input.id} className="mx-2 ">
                                {input.type === "file upload" && (
                                  <div className="p-[2px] scale-90 bg-gray-700 text-[10px] rounded-lg">
                                    <input
                                      className="rounded-md"
                                      type="file"
                                      accept=".csv, .xlsx"
                                    />{" "}
                                  </div>
                                )}

                                {input.type === "dropdown" && (
                                  <select
                                    id="states"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                                  >
                                    {input.options.map(
                                      (option, optionIndex) => (
                                        <option
                                          key={optionIndex}
                                          value={option}
                                        >
                                          {option}
                                        </option>
                                      )
                                    )}
                                  </select>
                                )}

                                {input.type === "fixed" && (
                                  <div
                                    id="states"
                                    className="border-[1px] p-[6px] border-red-300 w-[11rem] rounded-md bg-gray-700"
                                  >
                                    {input.info}
                                  </div>
                                )}

                                {input.type === "number" && (
                                  <div class="relative flex items-center max-w-[8rem]">
                                    <button
                                      // onClick={()=>count>0?setCount(count-1):""}
                                      // onClick={()=>handleChange(item.name,"quantity",formData[item.name].quantity-1)}
                                      type="button"
                                      id="decrement-button"
                                      data-input-counter-decrement="quantity-input"
                                      class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    >
                                      <svg
                                        class="w-3 h-3 text-gray-900 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M1 1h16"
                                        />
                                      </svg>
                                    </button>
                                    <input
                                      type="text"
                                      id="quantity-input"
                                      data-input-counter
                                      aria-describedby="helper-text-explanation"
                                      class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="999"
                                      // value={item["name"]=="Trend"?{count}:""}
                                      //   value={item.name === "Trend" ? count : ""}
                                      // value={formData[item.name].quantity}

                                      required
                                    />
                                    <button
                                      type="button"
                                      id="increment-button"
                                      // onClick={()=>handleChange(item.name,"quantity",formData[item.name].quantity+1)}

                                      data-input-counter-increment="quantity-input"
                                      class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    >
                                      <svg
                                        class="w-3 h-3 text-gray-900 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M9 1v16M1 9h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-end">
                <button type="submit" className="p-1 border-[1px] rounded-lg px-4 text-sm">Save&Next</button>
                </div>
                </form>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StrategyType;
