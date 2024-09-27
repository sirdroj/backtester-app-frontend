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

const RiskManagement = () => {
  const inputsData = [
    {
      title: "TECHNICAL FILTERS",
      children: [
        {
          title: "Trend",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: [
                    "Simple MA",
                    "Exponential MA",
                    "Wilder's MA",
                    "Custom MAs",
                  ],
                },
                {
                  type: "dropdown",
                  options: [
                    "Simple MA",
                    "Exponential MA",
                    "Wilder's MA",
                    "Custom MAs",
                  ],
                },
              ],
            },
            {
              title: "period",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Days", "Year"],
                },
                {
                  type: "number",
                },
              ],
            },
            {
              title: "priceField",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Price A", "Price B"],
                },
              ],
            },
          ],
        },
        {
          title: "Momentum",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["RSI", "CMO", "Stochastic"],
                },
              ],
            },
            {
              title: "period",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Days", "Year"],
                },
                {
                  type: "number",
                },
              ],
            },
            {
              title: "priceField",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Price A", "Price B"],
                },
              ],
            },
          ],
        },
        {
          title: "Volatility",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["ATR", "VIX"],
                },
              ],
            },
            {
              title: "period",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Days", "Year"],
                },
                {
                  type: "number",
                },
              ],
            },
            {
              title: "priceField",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Price A", "Price B"],
                },
              ],
            },
          ],
        },
        {
          title: "Breadth",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["OPT1", "OPT2"],
                },
              ],
            },
            {
              title: "period",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Days", "Year"],
                },
                {
                  type: "number",
                },
              ],
            },
            {
              title: "priceField",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Price A", "Price B"],
                },
              ],
            },
          ],
        },
        {
          title: "Volume",
          children: [
            {
              title: "Indicator",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Volume Accunulation", "Volume weighted MA"],
                },
              ],
            },
            {
              title: "period",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Days", "Year"],
                },
                {
                  type: "number",
                },
              ],
            },
            {
              title: "priceField",
              inputs: [
                {
                  type: "dropdown",
                  options: ["Price A", "Price B"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "FUNDAMENTAL FILTERS",
      children: [
        {
          title: "QUARTERLY RESULTS",
          children: [
            {
              title: "Sales",
              // info: "Some info about trends and what is QUARTERLY RESULTS",
              children: [
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
    
            {
              title: "Expense",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["Material Cost", "Employee Cost"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Operating Profit",
              // info: "Some info about trends and what is Operating Profit",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Profit before tax	",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["Tax %"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Net Profit +",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Profit after tax	",
                    "Reported Net Profit	",
                    "Minority share	",
                    "Profit for EPS	",
                    "Exceptional items AT	",
                    "Profit for PE	",
                    // "EPS in Rs	",
                  ],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "EPS in Rs	",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
          ],
        },
        {
          title: "PROFIT & LOSS",
          children: [
            {
              title: "Sales",
              // info: "Some info about trends and what is QUARTERLY RESULTS",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["Sale Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Expense",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Material Cost",
                    "Manufacturing Cost",
                    "Employee Cost",
                    "Other Cost %	",
                  ],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Operating Profit",
              // info: "Some info about trends and what is Operating Profit",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
    
            {
              title: "Tax %	",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "input",
                  type: "dropdown",
                  options: [1, 2, 3],
                },
              ],
            },
          ],
        },
    
        {
          title: "BALANCE SHEET",
          children: [
            {
              title: "Equity Capital	",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Reserves",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Borrowings ",
              // info: "Some info about trends and what is",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Long term Borrowings	",
                    "Short term Borrowings	",
                    "Lease Liabilities	",
                    "Preference Capital	",
                    "Other Borrowings	",
                    "Depreciation",
                  ],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Other Liabilities ",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Non controlling int	",
                    "Trade Payables",
                    "Other liability items",
                  ],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            // {
            //   title: "Total Liabilities ",
            //   // info: "Some info about trends and what is ",
            //   children: [
            //     {
            //       title: "Matric",
            //       type: "dropdown",
            //       options: ["Sale Growth", "QTR-Growth", "Rate of Change", "CAGR"],
            //     },
            //     {
            //       title: "Period",
            //       type: "dropdown",
            //       options: [1, 2, 3],
            //     },
            //     {
            //       title: "Calculation Method",
            //       type: "dropdown",
            //       options: [1, 2, 3],
            //     },
            //   ],
            // },
            {
              title: "Fixed Assets",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Land",
                    "Building",
                    "Plant Machinery",
                    "Equipments",
                    "Furniture n fittings",
                    "Vehicles",
                    "Intangible Assets",
                    "Other fixed assets	",
                    "Accumulated Depreciation",
                  ],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "CWIP",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Investments",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Other Assets",
              // info: "Some info about trends and what is ",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Inventories",
                    "Cash Equivalents",
                    "Short term loans	",
                    "Other asset items	",
                  ],
                },
                {
                  title: "trade receivables",
                  type: "dropdown",
                  options: [
                    "Receivables over 6m	",
                    "Receivables under 6m	",
                    "Prov for Doubtful	",
                  ],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
          ],
        },
        {
          title: "CASH FLOWS",
          children: [
            {
              title: "Cash from Operating Activity",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: ["OPM %", "Interest", "Depreciation"],
                },
                {
                  title: "Profit from operations",
                  type: "dropdown",
                  options: [
                    "Receivables	",
                    "Inventory",
                    "Payables",
                    "Other WC items	",
                  ],
                },
                {
                  title: "Working capital changes	",
                  type: "dropdown",
                  options: ["Interest paid", "Direct taxes"],
                },
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Cash from Investing Activity",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Fixed assets purchased	",
                    "Fixed assets sold	",
                    "Investments purchased	",
                    "Investments sold	",
                    "Interest received	",
                    "Dividends received	",
                    "Redemp n Canc of Shares	",
                    "Acquisition of companies	",
                    "Other investing items",
                  ],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Cash from Investing Activity",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "Matric",
                  type: "dropdown",
                  options: [
                    "Proceeds from shares	",
                    "Proceeds from borrowings	",
                    "Repayment of borrowings	",
                    "Interest paid fin	",
                    "Dividends paid	",
                    "Dividends received	",
                    "Financial liabilities	",
                    "Share application money	",
                    "Application money refund	",
                    "Other financing items	",
                  ],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            // {
            //   title: "Net Cash Flow	",
            //   // info: "Some info about trends and what is Sales",
            //   children: [],
            // },
          ],
        },
        {
          title: "RATIOS",
          children: [
            {
              title: "Ratios",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "metric",
                  type: "dropdown",
                  options: ["Debtor Days	", "Inventory Days	", "Days Payable	"],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Cash Conversion Cycle	",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "metric",
                  type: "dropdown",
                  options: ["Working Capital Days	", "ROCE %"],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
          ],
        },
        {
          title: "SHAREHOLDING PATTERN",
          children: [
            {
              title: "Promoters",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "metric",
                  type: "dropdown",
                  options: [
                    "Tata Sons Private Limited",
                    "Tata Investment Corporation Limited",
                    "Ewart Investments Limited",
                    "Af-Taab Investment Company Limited",
                    "Panatone Finvest Limited",
                    "Titan Company Limited",
                  ],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "FIIs",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "metric",
                  type: "dropdown",
                  options: [
                    "Dodona Holdings Limited",
                    "Arisaig India Fund Limited",
                    "St. James's Place Emerging Markets Equity Unit Tru",
                    "Amansa Holdings Private Limited",
                  ],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "DIIs",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "metric",
                  type: "dropdown",
                  options: [
                    "Sbi Life Insurance Co Ltd",
                    "Axis Mutual Fund Trustee Limited A/C Axis Mutual Fund",
                    "HDFC Life Insurance Co Ltd",
                    "Nippon Life India Trustee Ltd-A/C Nippon India Growth Fund",
                    "UTI Flexi Cap Fund",
                  ],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
            {
              title: "Public",
              // info: "Some info about trends and what is Sales",
              children: [
                {
                  title: "metric",
                  type: "dropdown",
                  options: [
                    "Derive Trading And Resorts Private Limited",
                    "Prazim Trading And Investment Co. Pvt. Ltd.",
                  ],
                },
    
                {
                  title: "Period",
                  type: "period",
                  options: ["days", "week", "year"],
                },
                {
                  title: "Calculation Method",
                  type: "dropdown",
                  options: ["YOY-Growth", "QTR-Growth", "Rate of Change", "CAGR"],
                },
              ],
            },
          ],
        },
      ]
    },
  ];

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
      setCurrentDropDown([...currentDropDown, id]);
    }
  };

  return (
    <div>
      {inputsData.map((item, index) => (
        <div key={index} className="px-">
          <div
            onClick={() => handleDropdownClick(index)}
            className="flex justify-between border-b-[px] h-[40px] items-center text-[20px] px-4 cursor-pointer"
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
              currentDropDown.includes(index) ? "show max-h-[]" : ""
            } ml-2 pt- px-4 p-1`}
          >
            {item.title === "TECHNICAL FILTERS" && (
              <div>
                {item.children.map((subinput, subIndex) => (
                  <div key={subIndex} className="mb-4">
                    <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[20px] ">
                      <span
                        className={`relative top-[20px] bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                          currentDropDown.includes(index) ? "" : "shadow-none"
                        }`}
                        style={{
                          boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                        }}
                      >
                        {/* <img className="h-[25px] mx-0" alt="Icon" /> */}
                        {subinput.title} -
                      </span>
                    </h2>
                    <form
                      className="inputs px-2 pt-5 shadow-black inset-2 rounded-lg p-2"
                      style={{
                        boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                      }}
                    >
                      {subinput.children.map((item, index) => (
                        <div className="flex justify-between ">
                          <label>{item.title}</label>
                          <div className="flex space-x-2">
                            {item.inputs &&
                              item.inputs.map((field, fieldIndex) => {
                                if (field.type == "dropdown") {
                                  return (
                                    <div
                                      key={fieldIndex}
                                      className="flex justify-between items-center my-1"
                                    >
                                      <select
                                        id="states"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                                      >
                                        {field.options.map(
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
                                    </div>
                                  );
                                }

                                if (field.type == "period") {
                                  return (
                                    <div className="flex justify-between items-center my-2 ">
                                      <label>Period</label>
                                      <select
                                        id="states"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                                        // value={formData[item.title][subinput.title][field.title]?formData[item.title][subinput.title][field.title]:""}
                                        onChange={() =>
                                          handleChange(
                                            item.title,
                                            subinput.title,
                                            field.title
                                          )
                                        }
                                      >
                                        {field.options.map((option) => (
                                          <option value="SA">{option}</option>
                                        ))}
                                      </select>
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
                                          value={
                                            item["name"] == "Trend"
                                              ? { count }
                                              : ""
                                          }
                                          //   value={item.name === "Trend" ? count : ""}
                                          // value={formData[item.name].quantity}

                                          required
                                        />
                                        <button
                                          type="button"
                                          id="increment-button"
                                          onClick={() =>
                                            handleChange(
                                              item.name,
                                              "quantity",
                                              formData[item.name].quantity + 1
                                            )
                                          }
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
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      ))}
                    </form>
                  </div>
                ))}{" "}
              </div>
            )}
            {item.title === "FUNDAMENTAL FILTERS" && (
              <div className="ml-[-10px]">
                {item.children.map((subinput, subIndex) => (
                  <div key={subIndex} className="mb-4">
                    
                    <div
                      className=" justify-between my-5 border-[px] shadow-black inset-2 border-b-[1px] border-b-gray-500 rounded-lg p-2"
                      style={{
                        boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                      }}
                    >
                      <h1 className="text-[17px] font-semibold border-b-[1px] border-gray-700"> {subinput.title} -</h1>
                      {/* <label>{item.title}</label> */}
                      <div className="flex space-x-2">
                        <form className="inputs px-2 pt- shadow-black inset-2 rounded-lg p-2 w-full">
                          {subinput.children.map((item, index) => (
                            <div className="  my-2 w-full ">
                              <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[20px] ">
                                <span
                                  className={`relative top-[10px] bg-[#281F2E] bg-opacity-90 border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                                    currentDropDown.includes(index)
                                      ? ""
                                      : "shadow-none"
                                  }`}
                                  style={{
                                    boxShadow:
                                      "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                                  }}
                                >
                                  <label>{item.title}</label>
                                </span>
                              </h2>
                              <div
                                className=" justify-between border-[px] shadow-black inset-2 rounded-lg p-2"
                                style={{
                                  boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                                }}
                              >
                                {item.children &&
                                  item.children.map((field, fieldIndex) => {
                                    if (field.type == "dropdown") {
                                      return (
                                        <div
                                          key={fieldIndex}
                                          className="flex justify-between items-center my-2"
                                        >
                                          <label>{field.title}</label>
                                          <select
                                            id="states"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                                          >
                                            {field.options.map(
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
                                        </div>
                                      );
                                    }

                                    if (field.type == "period") {
                                      return (
                                        <div className="flex justify-between items-center my-2 ">
                                          <label>Period</label>
                                          <select
                                            id="states"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                                            // value={formData[item.title][subinput.title][field.title]?formData[item.title][subinput.title][field.title]:""}
                                            onChange={() =>
                                              handleChange(
                                                item.title,
                                                subinput.title,
                                                field.title
                                              )
                                            }
                                          >
                                            {field.options.map((option) => (
                                              <option value="SA">
                                                {option}
                                              </option>
                                            ))}
                                          </select>
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
                                              value={
                                                item["name"] == "Trend"
                                                  ? { count }
                                                  : ""
                                              }
                                              //   value={item.name === "Trend" ? count : ""}
                                              // value={formData[item.name].quantity}

                                              required
                                            />
                                            <button
                                              type="button"
                                              id="increment-button"
                                              onClick={() =>
                                                handleChange(
                                                  item.name,
                                                  "quantity",
                                                  formData[item.name].quantity +
                                                    1
                                                )
                                              }
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
                                        </div>
                                      );
                                    }
                                  })}
                              </div>
                            </div>
                          ))}
                        </form>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskManagement;
