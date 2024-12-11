import React, { useState } from "react";
import useStore from "../../stores/useStore";

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

const TechnicalForm2 = () => {


  async function sendFormData(stage, inputs) {
    const url = "https://api.sentientco.in/forms/technicalFilters"; 
    const token = localStorage.getItem("access_token");; 
    try {
      const response = await fetch(url, {
        method: "PATCH", 
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage: stage,
          data:  inputs
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
  function handleSave(title,data){
    updateFormInputData(title,data)
    sendFormData(title,data)
  }


  const {forminputData,setFormInputData,updateFormInputData,addFormInputData,removeFormInputData}=useStore()

  const inputsData = [
    {
      title: "Trend",
      children: [
        {
          title: " ",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Simple MA",
                    "Exponential MA",
                    "Wilder's MA",
                    "Custom MAs",
                  ],
                },
              ],
            },
            {
              title: "Period Type",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Yearly",
                    "Quaterly",
                    "Monthly",
                    "Weekly",
                    "Daily",
                  ],
                }
              ],
            },
            {
              title: "Period",
              inputs: [
                {
                  type: "number",
                },
              ],
            },
            {
              title: "Price",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None","open","close","low","high","volume"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Momentum",
      children: [
        {
          title: " ",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "RSI", "CMO", "Stochastic"],
                },
              ],
            },
            {
              title: "Period Type",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Yearly",
                    "Quaterly",
                    "Monthly",
                    "Weekly",
                    "Daily",
                  ],
                }
              ],
            },
            {
              title: "Period",
              inputs: [
                {
                  type: "number",
                },
              ],
            },
            {
              title: "Price",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "Price A", "Price B"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Volatility",
      children: [
        {
          title: " ",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "ATR", "VIX"],
                },
              ],
            },
            {
              title: "Period Type",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Yearly",
                    "Quaterly",
                    "Monthly",
                    "Weekly",
                    "Daily",
                  ],
                }
              ],
            },
            {
              title: "Period",
              inputs: [
                {
                  type: "number",
                },
              ],
            },
            {
              title: "Price",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "Price A", "Price B"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Breadth",
      children: [
        {
          title: " ",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "OPT1", "OPT2"],
                },
              ],
            },
            {
              title: "Period Type",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Yearly",
                    "Quaterly",
                    "Monthly",
                    "Weekly",
                    "Daily",
                  ],
                }
              ],
            },
            {
              title: "Period",
              inputs: [
                {
                  type: "number",
                },
              ],
            },
            {
              title: "Price",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "Price A", "Price B"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Volume",
      children: [
        {
          title: "",
          // info: "Some info about trends and what is QUARTERLY RESULTS",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Volume Accunulation",
                    "Volume weighted MA",
                  ],
                },
              ],
            },
            {
              title: "Period Type",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "None",
                    "Yearly",
                    "Quaterly",
                    "Monthly",
                    "Weekly",
                    "Daily",
                  ],
                }
              ],
            },
            {
              title: "Period",
              inputs: [
                {
                  type: "number",
                },
              ],
            },
            {
              title: "Price",
              inputs: [
                {
                  type: "dropdown",
                  options: ["None", "Price A", "Price B"],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const [formData, setFormData] = useState(() => initializeFormData(inputsData));

  const handleChange = (section, filter, inputType, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [filter]: {
          ...prevFormData[section][filter],
          [inputType]: value,
        },
      },
    }));
    // console.log({formData})
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
              className={`${currentDropDown.includes(index) ? "rotate-180" : ""} invert`}
              alt="Toggle"
            />
          </div>
          <div
            className={`dropdown-content ${
              currentDropDown.includes(index) ? "show max-h-full" : "hidden"
            } ml-2 px-4 p-2`}
          >
            {section.children.map((filter, subIndex) => (
              <div key={subIndex} className="mb-4">
                <h2 className="text-[20px] mb-2 text-black">{filter.title}</h2>
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  handleSave(section.title,formData[section.title][" "])
                  }} className="inputs px-2 shadow-black inset-2 rounded-lg p-2">
                  {filter.children.map((inputField) => (
                    <div key={inputField.title} className="flex justify-between my-2">
                      <label className="mr-2">{inputField.title}</label>
                      {inputField.inputs.map((input, inputIndex) => (
                        <div key={inputIndex}>
                          {input.type === "dropdown" && (
                            <select
                              value={
                                formData[section.title]?.[filter.title]?.[inputField.title] || ""
                              }
                              required
                              onChange={(e) =>
                                handleChange(
                                  section.title,
                                  filter.title,
                                  inputField.title,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg p-2"
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
                              value={
                                formData[section.title]?.[filter.title]?.[inputField.title] || ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  section.title,
                                  filter.title,
                                  inputField.title,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border text-black border-gray-300 text-sm rounded-lg p-2"
                            />
                          )}
                         
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="flex justify-end py-2">
                  <button type="submit"  className="p-1 border-[1px] rounded-lg px-4 text-sm cursor-pointer" onClick={()=>{
                    console.log(formData[section.title][" "])
                    console.log(forminputData)

                  }}>Save&Next</button>
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

export default TechnicalForm2;