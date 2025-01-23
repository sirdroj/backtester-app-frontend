import React, { useState } from "react";
import useStore from "../../stores/useStore";
import currentAPI from "../../apiendpoint";

// const initializeFormData = (inputsData) => {
//   const initialData = {};
//   const traverseInputs = (inputs) => {
//     inputs.forEach((input) => {
//       // Initialize the data for each input's title
//       if (input.children) {
//         initialData[input.key] = {}; // Initialize with empty object for nested fields

//         input.children.forEach((child) => {
//           if (child.type === "dropdown" || child.type === "period") {
//             initialData[input.key][child.key] = child.options[0] || ""; // Set default value or empty string
//           } else if (child.type === "input") {
//             initialData[input.key][child.key] = ""; // Default for input fields
//           }
//           // Recurse into children
//           traverseInputs(child.children || []);
//         });
//       } else {
//         if (input.type === "dropdown" || input.type === "period") {
//           initialData[input.key] = input.options[0] || ""; // Set default value or empty string
//         } else if (input.type === "input") {
//           initialData[input.key] = ""; // Default for input fields
//         }
//       }
//     });
//   };

//   traverseInputs(inputsData);
//   return initialData;
// };

// const initializeFormData = (inputsData) => {
//   const data = {
//     trend: {
//       " ": {
//         indicator: "None",
//         period: "None",
//         period_type:"Weekly",
//         price: "None",
//       },
//     },
//     momentum: {
//       " ": {
//         indicator: "None",
//         period: "None",
//         period_type:"Weekly",
//         price: "None",
//       },
//     },
//     volatility: {
//       " ": {
//         indicator: "None",
//         period: "None",
//         period_type:"Weekly",
//         price: "None",
//       },
//     },
//     breadth: {
//       " ": {
//         indicator: "None",
//         period: "None",
//         period_type:"Weekly",
//         price: "None",
//       },
//     },
//     volume: {
//       undefined: {
//         indicator: "None",
//         period: "None",
//         period_type:"Weekly",
//         price: "None",
//       },
//     },
//   };
//   return data;
// };
const initializeFormData = (inputsData) => {
  const data = {
    trend: {
      indicator: "None",
      period: "None",
      period_type: "Weekly",
      price: "None",
    },
    momentum: {
      indicator: "None",
      period: "None",
      period_type: "Weekly",
      price: "None",
    },
    volatility: {
      indicator: "None",
      period: "None",
      period_type: "Weekly",
      price: "None",
    },
    breadth: {
      indicator: "None",
      period: "None",
      period_type: "Weekly",
      price: "None",
    },
    volume: {
      indicator: "None",
      period: "None",
      period_type: "Weekly",
      price: "None",
    },
  };
  return data;
};

const TechnicalFormExplorer = () => {
  const { explore_inputs_Data, set_explore_inputs_Data ,handle_full_save_explore} = useStore();

  async function sendFormData(stage, inputs) {
    const url = `${currentAPI}/explorer/technical_filters/${stage}`;
    // const url = "https://api.sentientco.in/forms/technicalFilters";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage: stage,
          data: inputs,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      return result; // Return response for further use if needed
    } catch (error) {
      console.error("Error:", error.message);
      return { error: error.message }; // Return error for handling in UI
    }
  }
  async function sendFullFormData(inputs) {
    const url = `${currentAPI}/explorer/technical_filters`;
    // const url = "https://api.sentientco.in/forms/technicalFilters";
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // level: "technical_filters",
          technical_filter: inputs,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      return result; // Return response for further use if needed
    } catch (error) {
      console.error("Error:", error.message);
      return { error: error.message }; // Return error for handling in UI
    }
  }

  function handleSave(key, data) {
    // updateFormInputData(title,data)

    // sendFormData(key, data);

    set_explore_inputs_Data({
      ...explore_inputs_Data,
      technical_filters: {
        ...explore_inputs_Data.technical_filters, // Clone the current technical_filters object
        [key]: data, // Update the specific key
      },
    });
  }

  function removeNoneValues(data) {
    const cleanedData = {};

    Object.keys(data).forEach((key) => {
      const filteredSubObject = {};
      let x = true;
      Object.keys(data[key]).forEach((subKey) => {
        if (data[key][subKey] == "None") {
          x = false;
        }
      });

      if (x) {
        cleanedData[key] = data[key];
      }
    });

    return cleanedData;
  }


  function handle_full_save(data) {
    const cleanedData = removeNoneValues(data);
    handle_full_save_explore("technical_filters",cleanedData);

    // console.log({ data });
    // set_explore_inputs_Data({
    //   ...explore_inputs_Data,
    //   technical_filters: cleanedData,
    // });
  }

  const {
    forminputData,
    setFormInputData,
    updateFormInputData,
    addFormInputData,
    removeFormInputData,
  } = useStore();

  const inputsData = [
    {
      title: "Trend",
      key: "trend",
      children: [
        {
          title: "Indicator",
          key: "indicator",
          inputs: [
            {
              type: "dropdown",
              options: [
                "None",
                "Simple MA",
                "Exponential MA",
                "Wilder's MA",
                "Custom MA",
                "Double EMA",
                "Cumulative MA",
                "Triple MA",
                "Linear Weighted MA",
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
              options: [
                // "None",
                // "Yearly",
                // "Quaterly",
                // "Monthly",
                "Weekly",
                // "Daily",
              ],
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
              options: ["None", "Open", "Close", "Low", "High", "Volume"],
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
          title: "Indicator",
          key: "indicator",
          inputs: [
            {
              type: "dropdown",
              options: ["None", "RSI", "CMO", "Stochastic"],
            },
          ],
        },
        {
          title: "Period Type",
          key: "period_type",
          inputs: [
            {
              type: "dropdown",
              options: [
                // "None",
                // "Yearly",
                // "Quaterly",
                // "Monthly",
                "Weekly",
                // "Daily",
              ],
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
              options: ["None", "Open", "Close", "Low", "High", "Volume"],
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
          title: "Indicator",
          key: "indicator",
          inputs: [
            {
              type: "dropdown",
              options: ["None", "ATR", "VIX"],
            },
          ],
        },
        {
          title: "Period Type",
          key: "period_type",
          inputs: [
            {
              type: "dropdown",
              options: [
                // "None",
                // "Yearly",
                // "Quaterly",
                // "Monthly",
                "Weekly",
                // "Daily",
              ],
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
              options: ["None", "Open", "Close", "Low", "High", "Volume"],
            },
          ],
        },
      ],
    },
    {
      title: "Breadth",
      key: "breadth",
      children: [
        {
          title: "Indicator",
          key: "indicator",
          inputs: [
            {
              type: "dropdown",
              options: ["None", "Advancing", "Declining"],
            },
          ],
        },
        {
          title: "Period Type",
          key: "period_type",
          inputs: [
            {
              type: "dropdown",
              options: [
                // "None",
                // "Yearly",
                // "Quaterly",
                // "Monthly",
                "Weekly",
                // "Daily",
              ],
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
              options: ["None", "Open", "Close", "Low", "High", "Volume"],
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
          title: "Indicator",
          key: "indicator",
          inputs: [
            {
              type: "dropdown",
              options: ["None", "Volume Accumulation", "Volume weighted MA"],
            },
          ],
        },
        {
          title: "Period Type",
          key: "period_type",
          inputs: [
            {
              type: "dropdown",
              options: [
                // "None",
                // "Yearly",
                // "Quaterly",
                // "Monthly",
                "Weekly",
                // "Daily",
              ],
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
              options: ["None", "Open", "Close", "Low", "High", "Volume"],
            },
          ],
        },
      ],
    },
  ];

  const [formData, setFormData] = useState(initializeFormData(inputsData));
  // const [formData, setFormData] = useState({});
  // console.log("--initial data---", initializeFormData(inputsData));

  const handleChange = (section, inputType, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [inputType]: value,
      },
    }));
    console.log(section, inputType, value);
    console.log({ formData });
  };

  const [currentDropDown, setCurrentDropDown] = useState([0]);

  const handleDropdownClick = (id) => {
    if (currentDropDown.includes(id)) {
      setCurrentDropDown(currentDropDown.filter((item) => item !== id));
    } else {
      setCurrentDropDown([...currentDropDown, id]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // sendFullFormData(formData);
        // handle_full_save(formData);
      }}
      className="relative"
    >
      <div>

     
      {inputsData.map((section, index) => (
        <div key={index} className="px-">
          <div
            onClick={() => handleDropdownClick(index)}
            className="flex justify-between border-b px-2 h-[40px] w-full items-center text-[20px] cursor-pointer"
            style={{ boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.7)" }}
          >
            <h1 className="font-semibold">{section.title}</h1>
            <img
              src="./images/chevron-down.png"
              className={`${
                currentDropDown.includes(index) ? "rotate-180" : ""
              } invert`}
              alt="Toggle"
            />
          </div>
          <div
            className={`dropdown-content ${
              currentDropDown.includes(index) ? "show max-h-full" : "hidden"
            } ml-2 px-4 p-2`}
          >
            {section.children.map((inputField, subIndex) => (
              <div key={inputField.title} className="flex justify-between my-2">
                <label className="mr-2">{inputField.title}</label>
                {inputField.inputs.map((input, inputIndex) => (
                  <div key={inputIndex}>
                    {input.type === "dropdown" && (
                      <select
                        value={formData[section.key]?.[inputField.key] || ""}
                        required
                        onChange={(e) =>
                          handleChange(
                            section.key,
                            inputField.key,
                            e.target.value
                          )
                        }
                        className="bg-gray-500 border border-gray-700 text-black text-sm rounded-lg p-2"
                      >
                        {input.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {input.type === "number" && (
                      <input
                        required
                        type="number"
                        value={formData[section.key]?.[inputField.key] || ""}
                        onChange={(e) =>
                          handleChange(
                            section.key,
                            inputField.key,
                            e.target.value
                          )
                        }
                        className="bg-gray-500 border text-black border-gray-800 text-sm rounded-lg p-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-end py-2">
              {/* <button
                type="submit"
                className="p-1 border-[1px] rounded-lg px-4 text-sm cursor-pointer"
                onClick={() => {
                  console.log(formData[section.key]);
                  // console.log(forminputData)
                  handleSave(section.key,formData[section.key])
                }}
              >
                Save&Next
              </button> */}
            </div>
          </div>
        </div>
      ))}
      {/* </div>
        </div>
      ))} */}
       </div>
      <div className="w-full flex justify-end p-2 pt-10  bottom-0">
        <button
          // type="submit"
          className="p-1 border-[1px] rounded-lg px-4 text-sm cursor-pointer"
          onClick={() => {
            // console.log(formData[section.key]);
            // console.log(forminputData)
            handle_full_save(formData);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TechnicalFormExplorer;
