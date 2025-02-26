import React, { useEffect, useState } from "react";
import Searchselect from "../Searchselect";
import useStore from "../../stores/useStore";

const initializeFormData = (inputsData) => {
  let initialData = {};

  const traverseInputs = (nodes, dataObj) => {
    nodes.forEach((node) => {
      if (!node.key) return; // Ensure key exists
      dataObj[node.key] = {};

      if (node.inputs) {
        node.inputs.forEach((input) => {
          dataObj[node.key] = input.type === "number" ? 0 : null;
        });
      }

      if (node.children) {
        traverseInputs(node.children, dataObj[node.key]); // Recurse deeper
      }
    });
  };

  traverseInputs(inputsData, initialData);
  return initialData;
};

const cleanData = (data) => {
  console.log("input clean data", data);
  const deepClean = (obj) => {
    if (typeof obj !== "object" || obj === null) return obj;

    let newObj = {};
    let hasNestedObjects = false; // To check if a parent has grandchildren

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        let cleanedChild = deepClean(value);

        if (Object.keys(cleanedChild).length > 0) {
          newObj[key] = cleanedChild;
          hasNestedObjects = true; // Mark this parent as having valid grandchildren
        }
      } else if (value !== null && value !== 0) {
        newObj[key] = value;
      }
    });

    // If no grandchildren exist, ensure all children are non-null & non-zero
    if (!hasNestedObjects && Object.keys(newObj).length > 0) {
      const allValid = Object.values(newObj).every((v) => v !== null && v !== 0 && v !== "None");
      if (!allValid) return {}; // Remove parent if any child is null/0
    }

    return newObj;
  };

  return deepClean(data);
};
function clean_data2(formData) {
  const cleanedData = {};
  console.log("Initial formData:", { formData });

  Object.keys(formData).forEach((sectionKey) => {
      let section = formData[sectionKey];

      if (sectionKey === "custom_watchlist" || sectionKey === "trend") {
        // Filter out null, undefined, and "None" values
        section = Object.fromEntries(
            Object.entries(section).filter(
                ([key, value]) => value !== null && value !== undefined && value !== "None"
            )
        );

        // If custom_watchlist is empty after filtering, do not add it to cleanedData
        if (Object.keys(section).length === 0) {
            return;
        }
    }

      // Check if the section has any values that should be considered as "null-like"
      let hasNull = Object.values(section).some(
          (value) => value === null || value === "" || value === "None" || value === 0
      );

      // Special condition for market_capitalisation
      if (sectionKey === "market_capitalisation" && Object.keys(section).length === 1) {
          hasNull = true;
      }

      if (!hasNull) {
          cleanedData[sectionKey] = section;
      }
  });

  console.log("Final cleanedData:", { cleanedData });
  return cleanedData;
}


const StrategyTypeExplor2 = () => {
  const inputsData = [
    {
      title: "DATA TYPE",
      key: "data_type",
      children: [
        {
          title: "Source type",
          key: "source_type",
          info: "Some info about trends and what is ",
          children: [
            {
              title: "Data Source",
              key: "data_source",
              inputs: [
                {
                  type: "file upload",
                  key: "file_upload",
                  show_option: "Upload Data",
                },
                {
                  type: "dropdown",
                  key: "data_source_dropdown",
                  options: ["None", "Native data", "Upload Data"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "ANALYSIS MIXTURE",
      key: "analysis_mixture",
      children: [
        {
          title: "Technical Threshhold",
          key: "technical_threshhold",
          children: [
            {
              title: "Trend",
              key: "trend",
              children: [
                {
                  title: "indicator",
                  key: "indicator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: [
                        "None",
                        "Exponential MA",
                        "Wilder's MA",
                        "15",
                        "10",
                        "8",
                      ],
                    },
                  ],
                },
                {
                  title: "Period Type",
                  key: "period_type",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Period",
                  key: "period",
                  inputs: [
                    {
                      type: "number",
                    },
                  ],
                },
                {
                  title: "Price",
                  key: "price",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["open", "close", "low", "high"],
                    },
                  ],
                },
                {
                  title: "trend comparator",
                  key: "trend_comparator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["None", ">", ">=", "<", "<="],
                    },
                  ],
                },
              ],
            },
            {
              title: "Momentum",
              key: "momentum",
              children: [
                {
                  title: "indicator",
                  key: "indicator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: [
                        "None",
                        "Exponential MA",
                        "Wilder's MA",
                        "15",
                        "10",
                        "8",
                      ],
                    },
                  ],
                },
                {
                  title: "Period Type",
                  key: "period_type",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Period",
                  key: "period",
                  inputs: [
                    {
                      type: "number",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Price",
                  key: "price",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["open", "close", "low", "high"],
                    },
                  ],
                },
                {
                  title: "trend comparator",
                  key: "trend_comparator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["None", ">", ">=", "<", "<="],
                    },
                  ],
                },
              ],
            },
            {
              title: "Volatility",
              key: "volatility",
              children: [
                {
                  title: "indicator",
                  key: "indicator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: [
                        "None",
                        "Exponential MA",
                        "Wilder's MA",
                        "15",
                        "10",
                        "8",
                      ],
                    },
                  ],
                },
                {
                  title: "Period Type",
                  key: "period_type",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Period",
                  key: "period",
                  inputs: [
                    {
                      type: "number",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Price",
                  key: "price",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["open", "close", "low", "high"],
                    },
                  ],
                },
                {
                  title: "trend comparator",
                  key: "trend_comparator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["None", ">", ">=", "<", "<="],
                    },
                  ],
                },
              ],
            },
            {
              title: "Breath",
              key: "breath",
              children: [
                {
                  title: "indicator",
                  key: "indicator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: [
                        "None",
                        "Exponential MA",
                        "Wilder's MA",
                        "15",
                        "10",
                        "8",
                      ],
                    },
                  ],
                },
                {
                  title: "Period Type",
                  key: "period_type",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Period",
                  key: "period",
                  inputs: [
                    {
                      type: "number",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Price",
                  key: "price",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["open", "close", "low", "high"],
                    },
                  ],
                },
                {
                  title: "trend comparator",
                  key: "trend_comparator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["None", ">", ">=", "<", "<="],
                    },
                  ],
                },
              ],
            },
            {
              title: "Volume",
              key: "volume",
              children: [
                {
                  title: "indicator",
                  key: "indicator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: [
                        "None",
                        "Exponential MA",
                        "Wilder's MA",
                        "15",
                        "10",
                        "8",
                      ],
                    },
                  ],
                },
                {
                  title: "Period Type",
                  key: "period_type",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Period",
                  key: "period",
                  inputs: [
                    {
                      type: "number",
                      options: ["Weekly", "Monthly"],
                    },
                  ],
                },
                {
                  title: "Price",
                  key: "price",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["open", "close", "low", "high"],
                    },
                  ],
                },
                {
                  title: "trend comparator",
                  key: "trend_comparator",
                  inputs: [
                    {
                      type: "dropdown",
                      options: ["None", ">", ">=", "<", "<="],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const { explore_inputs_Data, set_explore_inputs_Data } = useStore();
  // console.log("initializeFormData",initializeFormData(inputsData));
  // const [formData, setFormData] = useState(initializeFormData(inputsData));
  const [formData, setFormData] = useState(initializeFormData(inputsData));
  // console.log("clean data",formData && cleanData(formData))
  // const []
  function handleSelect(option) {
    console.log(option);
  }
  function getInput(type) {
    if (type == "dropdown") return <div>{type}</div>;
  }

  const gethandleChange = (item, input, sec, field) => {
    return (value) => {
      if (field === "number" && value < 0) {
        value = 0;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [item]: {
          ...prevFormData[item], // Ensure 'item' exists
          [input]: {
            ...prevFormData[item][input], // Ensure 'input' exists
            [sec]: {
              ...prevFormData[item][input][sec], // Ensure 'sec' exists
              [field]: value,
            },
          },
        },
      }));
    };
  };

  function handlesaveandnext(subinput, section) {
    console.log("subinput", subinput);
    console.log("form data", formData);
    let prevData = explore_inputs_Data;
    if (!prevData["strategy_type"]) {
      prevData["strategy_type"] = {};
    }
    if (!prevData["strategy_type"][subinput]) {
      prevData["strategy_type"][subinput] = {};
    }
    let clean_data = cleanData(formData[subinput][section]);
    console.log("subinput", subinput);
    console.log("clean data", clean_data);
    console.log("subinput- ", subinput, "section- ", section);

    if (clean_data) {
      prevData["strategy_type"][subinput][section] = clean_data;
      set_explore_inputs_Data(prevData);
    }
    // handleDropdownClick(subinput);
    // console.log("prevData", prevData);
    // console.log("subinput",subinput)
    // console.log("formData",formData)
    // console.log("clean data",cleanData(formData))
  }

  // useEffect(()=>{
  //   console.log({formData})

  // },[formData])

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
      {inputsData.map((item, index) => {
        if (item.key == "analysis_mixture") {
          return (
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
                {item.children.map((block, subIndex) => (
                  <div key={subIndex} className="mb-4 ">
                    <div
                      //   onSubmit={() => {
                      //     preventDefault();
                      //   }}
                      className="inputs px-2 shadow-black inset-2 rounded-lg p-2 mt-5"
                      style={{
                        boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                      }}
                    >
                      <h1 className="font-semibold">{block.title}</h1>

                      {block.children.map((sec) => {
                        return (
                          <div
                            key={sec.id}
                            className=" items-center justify-between my-2 rounded-sm p-1"
                            style={{
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                            }}
                          >
                            <div
                              className=" rounded-md font-bold p-1"
                              style={{
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", // Adjust shadow as needed
                              }}
                            >
                              {sec.title}
                            </div>
                            <div className=" justify-between ml-2  items-center inputs_wrapper">
                              {sec.children.map((field) => (
                                <div className="flex justify-between w-full my-2 pl-2">
                                  <div>{field.title}</div>
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
                                          <Searchselect
                                            options={input.options}
                                            onSelect={gethandleChange(
                                              item.key,
                                              block.key,
                                              sec.key,
                                              field.key
                                            )}
                                          />
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
                                          <input
                                            type="number"
                                            className="bg-gray-500 border text-black border-gray-800 text-sm rounded-lg p-2"
                                            min="1" // Ensures UI does not allow values < 1
                                          />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-end">
                        <button
                          // type="submit"
                          onClick={() => handlesaveandnext(item.key, block.key)}
                          className="p-1 border-[1px] rounded-lg px-4 text-sm"
                        >
                          Save&Next
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        return (
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
                        <div
                          key={field.id}
                          className="flex items-center justify-between my-2"
                        >
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
                      <button
                        type="submit"
                        className="p-1 border-[1px] rounded-lg px-4 text-sm"
                      >
                        Save&Next
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StrategyTypeExplor2;
