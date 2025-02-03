import React, { useEffect, useState } from "react";
import useStore from "../../stores/useStore";
import currentAPI from "../../apiendpoint";

const initializeFormData = (inputsData) => {
  let initialData = {};

  const traverseInputs = (sections) => {
    sections.forEach((section) => {
      initialData[section.key] = {}; // Initialize section key

      section.children.forEach((child) => {
        if (child.inputs) {
          child.inputs.forEach((input) => {
            if (input.type === "dropdown") {
              initialData[section.key][child.key] = "None"; // Default value for dropdown
            } else if (input.type === "number") {
              initialData[section.key][child.key] = 0; // Default value for number
            } else if (input.type === "checkbox") {
              initialData[section.key][child.key] = false; // Default value for checkbox
            } else if (input.type === "file") {
              initialData[section.key][child.key] = null; // Initialize file inputs as null
            }
          });
        }
      });
    });
  };
  traverseInputs(inputsData);
  return initialData;
};

const UniversalFilters = () => {
  const [customMcap, setCustomMcap] = useState(false);

  const inputsData = [
    {
      title: "Market Cap",
      key: "market_cap",
      children: customMcap
        ? [
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
          ]
        : [
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
    // {
    //   title: "Market Cap",
    //   key: "market_cap",
    //   children: [
    //     {
    //       title: "Market Cap",
    //       key: "market_cap",
    //       inputs: [
    //         {
    //           type: "toggle",
    //           children: [
    //             [
    //               {
    //                 type: "number",
    //                 options: ["None", "Large Cap", "Mid Cap", "Small Cap"],
    //               },
    //             ],
    //             [
    //               {
    //                 title: "Large Cap",
    //                 key: "large_cap",
    //                 inputs: [
    //                   {
    //                     type: "checkbox",
    //                   },
    //                 ],
    //               },
    //               {
    //                 title: "Mid Cap",
    //                 key: "mid_cap",
    //                 inputs: [
    //                   {
    //                     type: "checkbox",
    //                   },
    //                 ],
    //               },
    //               {
    //                 title: "Small Cap",
    //                 key: "small_cap",
    //                 inputs: [
    //                   {
    //                     type: "checkbox",
    //                   },
    //                 ],
    //               },
    //             ],
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
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
              options: [
                "None",
                "NIFTY50",
                "NIFTY100",
                "NIFTY200",
                "NIFTY500",
                "NIFTY Mid Cap",
                "NIFTY Small Cap",
                "NIFTY Midcap 100",
                "NIFTY Midcap 50",
                "NIFTY Midcap 150",
                "NIFTY Midcap 400",
                "NIFTY Midcap 450",
                "NIFTY Midcap 100",
                "NIFTY Midcap 50",
                "NIFTY Midcap 150",
                "NIFTY Midcap 400",
                "NIFTY Midcap 450",
              ],
            },
          ],
        },
        {
          title: "Sectoral Indices",
          key: "sectoral_indices",
          inputs: [
            {
              type: "dropdown",
              options: [
                "None",
                "Nifty Auto Index",
                "Nifty Bank Index",
                "Nifty Financial Services Index",
                "Nifty Financial Services 25/50 Index",
                "Nifty Financial Services Ex-Bank Index",
                "Nifty FMCG Index",
                "Nifty Healthcare Index",
                "Nifty IT Index",
                "Nifty Media Index",
                "Nifty Metal Index",
                "Nifty Pharma Index",
                "Nifty Private Bank Index",
                "Nifty PSU Bank Index",
                "Nifty Realty Index",
                "Nifty Consumer Durables Index",
                "Nifty Oil and Gas Index",
                "Nifty MidSmall Financial Services Index",
                "Nifty MidSmall Healthcare Index",
                "Nifty MidSmall IT & Telecom Index",
              ],
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
              options: ["None", "opt1"],
            },
          ],
        },
        {
          title: "Propriatory index",
          key: "propriatory_index",
          inputs: [
            {
              type: "dropdown",
              options: ["None", "opt1"],
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
    },
  ];
  // const [inputsData, setinputdata] = useState(inputsDataU);

  const {
    explore_inputs_Data,
    set_explore_inputs_Data,
    handle_full_save_explore,
  } = useStore();

  function clean_data(formData) {
    const cleanedData = {};
    Object.keys(formData).forEach((sectionKey) => {
      const section = formData[sectionKey];
      // If any value in this section is null, we skip the section.
      const hasNull = Object.values(section).some(
        (value) =>
          value === null || value === "" || value === "None" || value === 0
      );
      if (!hasNull) {
        cleanedData[sectionKey] = section;
      }
    });
    return cleanedData;
  }

  function handle_full_save(data) {
    const cleanedData = clean_data(data);
    console.log("sent", { data });
    console.log({ cleanedData });
    handle_full_save_explore("universe_filters", { ...cleanedData });
  }

  const [formData, setFormData] = useState(initializeFormData(inputsData));

  useEffect(() => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        market_cap: {
          market_cap_type: customMcap ? "custom" : "default",
        },
      };
    });
  }, [customMcap]);


  const handleChange = (section, inputType, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [inputType]: value,
      },
    }));

    console.log({ formData });
  };

  const handleCheckboxChange = (section, inputType, checked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [inputType]: checked,
      },
    }));
  };

  // New function to handle file input changes

  const handleFileChange = (section, inputType, file) => {
    // Get the file name from file.name using split and pop (or [-1])
    const fileName = file.name.split("/").pop(); // file.name is generally just the file name in browsers

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      // Simple CSV parsing: assumes the first line contains headers
      const rows = text.split("\n").filter((row) => row.trim() !== "");
      if (rows.length === 0) return;
      const headers = rows[0].split(",").map((header) => header.trim());
      const jsonData = rows.slice(1).map((row) => {
        const values = row.split(",");
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] ? values[index].trim() : "";
        });
        return obj;
      });
      // Update the formData state with the JSON data and the extracted file name
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [inputType]: { filename: fileName, content: jsonData },
        },
      }));
      console.log({ formData });
    };
    reader.readAsText(file);
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
      }}
      className="relative"
    >
      <div>
        {inputsData.map((section, index) => {
          if (section.title === "Market Cap") {
            return (
              <div key={index}>
                <div
                  onClick={() => handleDropdownClick(index)}
                  className="flex justify-between px-2 mb-4 h-[40px] w-full items-center text-[20px] cursor-pointer"
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
                    currentDropDown.includes(index)
                      ? "show max-h-full"
                      : "hidden"
                  } ml-2 px-4 p-4`}
                >
                  <div className="flex justify-end px-2">
                    <div className=" flex justify-between inputs_wrapper">
                      <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                        <li class="w-full focus-within:z-10">
                          <a
                            onClick={() => {
                              setCustomMcap(true);
                            }}
                            href="#"
                            class={`${
                              customMcap
                                ? "bg-gray-500 text-gray-100 border-[1px] border-gray-700 scale-[1]"
                                : "bg-gray-700"
                            }  inline-block w-max px-2 p-[1px] bg-opacity-80   border-r-0   rounded-s-lg    `}
                            aria-current="page"
                          >
                            Custom
                          </a>
                        </li>

                        <li class="w-full focus-within:z-10">
                          <a
                            onClick={() => {
                              setCustomMcap(false);
                            }}
                            href="#"
                            class={`${
                              !customMcap
                                ? "bg-gray-500 text-gray-100 border-[1px] border-gray-700 scale-[1]"
                                : "bg-gray-700"
                            }  inline-block w-max px-2 p-[1px]   bg-opacity-80  border-gray-700   rounded-e-lg    `}
                          >
                            Default
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {section.children.map((inputField) => (
                    <div
                      key={inputField.title}
                      className="flex justify-between my-2"
                    >
                      <label className="mr-2">{inputField.title}</label>
                      {inputField.inputs.map((input, inputIndex) => (
                        <div key={inputIndex}>
                          {input.type === "dropdown" && (
                            <select
                              value={
                                formData[section.key]?.[inputField.key] || ""
                              }
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
                              type="number"
                              value={
                                formData[section.key]?.[inputField.key] || ""
                              }
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
                              type="checkbox"
                              className="w-4 h-4 mx-2 text-gray-600 bg-gray-500 rounded-sm"
                              checked={
                                formData[section.key]?.[inputField.key] || false
                              }
                              onChange={(e) =>
                                handleCheckboxChange(
                                  section.key,
                                  inputField.key,
                                  e.target.checked
                                )
                              }
                            />
                          )}
                          {input.type === "file" && (
                            <input
                              type="file"
                              accept=".csv"
                              className="rounded-lg text-black"
                              onChange={(e) =>
                                e.target.files[0] &&
                                handleFileChange(
                                  section.key,
                                  inputField.key,
                                  e.target.files[0]
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <div key={index}>
                <div
                  onClick={() => handleDropdownClick(index)}
                  className="flex justify-between px-2 mb-4 h-[40px] w-full items-center text-[20px] cursor-pointer"
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
                    currentDropDown.includes(index)
                      ? "show max-h-full"
                      : "hidden"
                  } ml-2 px-4 p-4`}
                >
                  {section.children.map((inputField) => (
                    <div
                      key={inputField.title}
                      className="flex justify-between my-2"
                    >
                      <label className="mr-2">{inputField.title}</label>
                      {inputField.inputs.map((input, inputIndex) => (
                        <div key={inputIndex}>
                          {input.type === "dropdown" && (
                            <select
                              value={
                                formData[section.key]?.[inputField.key] || ""
                              }
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
                              type="number"
                              value={
                                formData[section.key]?.[inputField.key] || ""
                              }
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
                              type="checkbox"
                              className="w-4 h-4 mx-2 text-gray-600 bg-gray-500 rounded-sm"
                              checked={
                                formData[section.key]?.[inputField.key] || false
                              }
                              onChange={(e) =>
                                handleCheckboxChange(
                                  section.key,
                                  inputField.key,
                                  e.target.checked
                                )
                              }
                            />
                          )}
                          {input.type === "file" && (
                            <input
                              type="file"
                              accept=".csv"
                              onChange={(e) =>
                                e.target.files[0] &&
                                handleFileChange(
                                  section.key,
                                  inputField.key,
                                  e.target.files[0]
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="flex justify-end py-2">
                    {/* Additional button or functionality can be added here */}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="w-full flex justify-end p-2 pt-10 bottom-0">
        <button
          className="p-1 border-[1px] rounded-lg px-4 text-sm cursor-pointer"
          onClick={() => {
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
