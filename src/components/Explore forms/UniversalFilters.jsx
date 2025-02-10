import React, { useState } from "react";
import useStore from "../../stores/useStore";
import currentAPI from "../../apiendpoint";

const inputsData = [
  {
    title: "Market Cap",
    key: "market_cap",
    children: [
      {
        title: "Market Cap",
        key: "market_cap",
        inputs: [
          {
            type: "number",
            options: ["None", "Large Cap", "Mid Cap", "Small Cap"],
          },
        ],
      },
      {
        title: "Large Cap",
        key: "large_cap",
        inputs: [
          {
            type: "checkbox",
          },
        ],
      },
      {
        title: "Mid Cap",
        key: "mid_cap",
        inputs: [
          {
            type: "checkbox",
          },
        ],
      },
      {
        title: "Small Cap",
        key: "small_cap",
        inputs: [
          {
            type: "checkbox",
          },
        ],
      },
    ],
  },
  {
    title: "Liquidity",
    key: "liquidity",
    children: [
      {
        title: "Liquidity Type",
        key: "liquidity_type",
        inputs: [
          {
            type: "dropdown",
            options: ["None", "High", "Low", "Medium"],
          },
        ],
      },
    
    ],
  },
  {
    title: "Index",
    key: "index",
    children: [
      {
        title: "Index",
        key: "index",
        inputs: [
          {
            type: "dropdown",
            options: ["None", "NIFTY50", "NIFTY100", "NIFTY200","NIFTY500","NIFTY Mid Cap","NIFTY Small Cap","NIFTY Midcap 100","NIFTY Midcap 50","NIFTY Midcap 150","NIFTY Midcap 400","NIFTY Midcap 450","NIFTY Midcap 100 TRI","NIFTY Midcap 50 TRI","NIFTY Midcap 150 TRI","NIFTY Midcap 400 TRI","NIFTY Midcap 450 TRI","NIFTY Midcap 100 PR","NIFTY Midcap 50 PR","NIFTY Midcap 150 PR","NIFTY Midcap 400 PR","NIFTY Midcap 450 PR","NIFTY Midcap 100","NIFTY Midcap 50","NIFTY Midcap 150","NIFTY Midcap 400","NIFTY Midcap 450","NIFTY Midcap 100 TRI","NIFTY Midcap 50 TRI","NIFTY Midcap 150 TRI","NIFTY Midcap 400 TRI","NIFTY Midcap 450 TRI","NIFTY Midcap 100 PR","NIFTY Midcap 50 PR","NIFTY Midcap 150 PR","NIFTY Midcap 400 PR","NIFTY Midcap 450 PR"],
          },
        ],
      },
      {
        title: "Sectoral Indices",
        key: "index",
        inputs: [
          {
            type: "dropdown",
            options: ["None", ],
          },
        ],
      },
    
    ],
  },
  {
    title: "Custom Watchlist",
    key: "custom_watchlist",
    children: [
      {
        title: "Custom index",
        key: "custom_index",
        inputs: [
          {
            type: "dropdown",
            options: ["None"],
          },
        ],
      },
      {
        title: "Propriatory index",
        key: "propriatory_index",
        inputs: [
          {
            type: "dropdown",
            options: ["None"],
          },
        ],
      },
      {
        title: "Watchlist",
        key: "watchlist",
        inputs: [
          {
            type: "file",
          },
        ],
      },
      {
        title: "Portfolio",
        key: "portfolio",
        inputs: [
          {
            type: "file",
          },
        ],
      },
    ],
  }
  

];

const initializeFormData = (inputsData) => {
  let initialData = {};

  const traverseInputs = (sections) => {
    sections.forEach((section) => {
      initialData[section.key] = {}; // Initialize section key

      section.children.forEach((child) => {
        if (child.inputs) {
          child.inputs.forEach((input) => {
            if (input.type === "dropdown") {
              initialData[section.key][child.key] = null; // Default value for dropdown
            } else if (input.type === "number") {
              initialData[section.key][child.key] = 0; // Default value for number
            } else if (input.type === "checkbox") {
              initialData[section.key][child.key] = false; // Default value for checkbox
            }
          });
        }
      });
    });
  };

  traverseInputs(inputsData);
  console.log("universe initial data:", initialData);
  return initialData;
};



const UniversalFilters = () => {
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
    handle_full_save_explore("universe_filters",cleanedData);

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
      // setCurrentDropDown([...currentDropDown, id]);
      setCurrentDropDown([id]);
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
        <div key={index} className="-">
          <div
            onClick={() => handleDropdownClick(index)}
            className="flex justify-between  px-2 mb-4 h-[40px] w-full items-center text-[20px] cursor-pointer"
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
            } ml-2 px-4 p-4 `}
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
                    {input.type === "checkbox" && (
                      <input
                        required
                        type="checkbox"
                        class="w-4 h-4 mx-2 text-gray-600 bg-gray-500 rounded-none"

                        value={formData[section.key]?.[inputField.key] || ""}
                        onChange={(e) =>
                          handleChange(
                            section.key,
                            inputField.key,
                            e.target.value
                          )
                        }
                        className="bg-gray-500 border text-gray-400 border-gray-800 text-sm p-2"
                      />
                    )}
                    {input.type === "file" && (
                      <input
                        required
                        type="file"
                        // class="w-4 h-4 mx-2 text-gray-600 bg-gray-500 rounded-none"

                        value={formData[section.key]?.[inputField.key] || ""}
                        onChange={(e) =>
                          handleChange(
                            section.key,
                            inputField.key,
                            e.target.value
                          )
                        }
                        // className="bg-gray-500 border text-black border-gray-800 text-sm rounded-lg p-2"
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

export default UniversalFilters;
