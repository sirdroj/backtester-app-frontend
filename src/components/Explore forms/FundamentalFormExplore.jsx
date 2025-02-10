import React, { useState, useEffect } from "react";
import useStore from "../../stores/useStore";

const inputsData = [
  {
    title: "QUARTERLY RESULTS",
    key: "quaterly_results",
    children: [
      {
        title: "Sales",
        key: "sales",
        inputs: [
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Expense",
        key: "expense",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "Material Cost", "Employee Cost"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Operating Profit",
        key: "operating_profit",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Profit before tax",
        key: "profit_before_tax",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "Tax %"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Net Profit",
        key: "net_profit",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Profit after tax",
              "Reported Net Profit",
              "Minority share",
              "Profit for EPS",
              "Exceptional items AT",
              "Profit for PE",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "EPS in Rs",
        key: "eps_in_rs",
        inputs: [
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
    ],
  },

  {
    title: "PROFIT & LOSS",
    key: "profit_and_loss",
    children: [
      {
        title: "Sales",
        key: "sales",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Sale Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Expense",
        key: "expense",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Material Cost",
              "Manufacturing Cost",
              "Employee Cost",
              "Other Cost %",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Operating Profit",
        key: "operating_profit",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Tax %",
        key: "tax_percentage",
        inputs: [
          {
            title: "Input",
            key: "input",
            type: "dropdown",
            options: ["None", 1, 2, 3],
          },
        ],
      },
    ],
  },

  {
    title: "BALANCE SHEET",
    key: "balance_sheet",
    children: [
      {
        title: "Equity Capital",
        key: "equity_capital",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Reserves",
        key: "reserves",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Borrowings",
        key: "borrowings",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Long term Borrowings",
              "Short term Borrowings",
              "Lease Liabilities",
              "Preference Capital",
              "Other Borrowings",
              "Depreciation",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Other Liabilities",
        key: "other_liabilities",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Non controlling int",
              "Trade Payables",
              "Other liability items",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Fixed Assets",
        key: "fixed_assets",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Land",
              "Building",
              "Plant Machinery",
              "Equipments",
              "Furniture n fittings",
              "Vehicles",
              "Intangible Assets",
              "Other fixed assets",
              "Accumulated Depreciation",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "CWIP",
        key: "cwip",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Period",
            key: "period",
            type: "number",
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Investments",
        key: "investments",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Other Assets",
        key: "other_assets",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Inventories",
              "Cash Equivalents",
              "Short term loans",
              "Other asset items",
            ],
          },
          {
            title: "Trade Receivables",
            key: "trade_receivables",
            type: "dropdown",
            options: [
              "None",
              "Receivables over 6m",
              "Receivables under 6m",
              "Prov for Doubtful",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "CASH FLOWS",
    key: "cash_flows",
    children: [
      {
        title: "Cash from Operating Activity",
        key: "cash_from_operating_activity",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: ["None", "OPM %", "Interest", "Depreciation"],
          },
          {
            title: "Profit from operations",
            key: "profit_from_operations",
            type: "dropdown",
            options: [
              "None",
              "Receivables",
              "Inventory",
              "Payables",
              "Other WC items",
            ],
          },
          {
            title: "Working capital changes",
            key: "working_capital_changes",
            type: "dropdown",
            options: ["None", "Interest paid", "Direct taxes"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Cash from Investing Activity",
        key: "cash_from_investing_activity",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Fixed assets purchased",
              "Fixed assets sold",
              "Investments purchased",
              "Investments sold",
              "Interest received",
              "Dividends received",
              "Redemp n Canc of Shares",
              "Acquisition of companies",
              "Other investing items",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Cash from Financing Activity",
        key: "cash_from_financing_activity",
        inputs: [
          {
            title: "Matric",
            key: "matric",
            type: "dropdown",
            options: [
              "None",
              "Proceeds from shares",
              "Proceeds from borrowings",
              "Repayment of borrowings",
              "Interest paid fin",
              "Dividends paid",
              "Dividends received",
              "Financial liabilities",
              "Share application money",
              "Application money refund",
              "Other financing items",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
    ],
  },

  {
    title: "RATIOS",
    key: "ratios",
    children: [
      {
        title: "Ratios",
        key: "ratios_section",
        inputs: [
          {
            title: "metric",
            key: "metric",
            type: "dropdown",
            options: ["None", "Debtor Days", "Inventory Days", "Days Payable"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Cash Conversion Cycle",
        key: "cash_conversion_cycle",
        inputs: [
          {
            title: "metric",
            key: "metric",
            type: "dropdown",
            options: ["None", "Working Capital Days", "ROCE %"],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
    ],
  },

  {
    title: "SHAREHOLDING PATTERN",
    key: "shareholding_pattern",
    children: [
      {
        title: "Promoters",
        key: "promoters",
        inputs: [
          {
            title: "metric",
            key: "metric",
            type: "dropdown",
            options: [
              "None",
              "Tata Sons Private Limited",
              "Tata Investment Corporation Limited",
              "Ewart Investments Limited",
              "Af-Taab Investment Company Limited",
              "Panatone Finvest Limited",
              "Titan Company Limited",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "FIIs",
        key: "fiis",
        inputs: [
          {
            title: "metric",
            key: "metric",
            type: "dropdown",
            options: [
              "None",
              "Dodona Holdings Limited",
              "Arisaig India Fund Limited",
              "St. James's Place Emerging Markets Equity Unit Tru",
              "Amansa Holdings Private Limited",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "DIIs",
        key: "diis",
        inputs: [
          {
            title: "metric",
            key: "metric",
            type: "dropdown",
            options: [
              "None",
              "Sbi Life Insurance Co Ltd",
              "Axis Mutual Fund Trustee Limited A/C Axis Mutual Fund",
              "HDFC Life Insurance Co Ltd",
              "Nippon Life India Trustee Ltd-A/C Nippon India Growth Fund",
              "UTI Flexi Cap Fund",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
      {
        title: "Public",
        key: "public",
        inputs: [
          {
            title: "metric",
            key: "metric",
            type: "dropdown",
            options: [
              "None",
              "Derive Trading And Resorts Private Limited",
              "Prazim Trading And Investment Co. Pvt. Ltd.",
            ],
          },
          {
            title: "Period Type",
            key: "period_type",
            type: "dropdown",
            options: [
              "None",
              "Yearly",
              "Quaterly",
              "Monthly",
              "Weekly",
              "Daily",
            ],
          },
          {
            title: "Calculation Method",
            key: "calculation_method",
            type: "dropdown",
            options: [
              "None",
              "YOY-Growth",
              "QTR-Growth",
              "Rate of Change",
              "CAGR",
            ],
          },
        ],
      },
    ],
  },
];

const initializeFormData = (inputsData) => {
  let initialData = {}; // Initialize initialData once

  const traverseInputs = (inputsData) => {
    inputsData.map((section) => {
      initialData[section.key] = {};
      section.children.map((subSection) => {
        initialData[section.key][subSection.key] = {};
        subSection.inputs.map((input) => {
          if (input.type === "dropdown") {
            initialData[section.key][subSection.key][input.key] = null;
          } else if (input.type === "number") {
            initialData[section.key][subSection.key][input.key] = 0;
          }
        });
      });
    });
  };

  traverseInputs(inputsData);
  // console.log("fundamental initial data", initialData);
  // return {};
  return initialData;
};

const FundamentalFormExplore = () => {
  const { handle_full_save_explore } = useStore();
  const { explore_inputs_Data,set_explore_inputs_Data } = useStore();
  // initializeFormData(inputsData);
  const [formData, setFormData] = useState(initializeFormData(inputsData));
  console.log({ formData });

  const handleChange = (secName, filterName, inputName, value) => {
    console.log({ secName, filterName, inputName, value });
    if (inputName == "period" && value < 0) {
      value = 0;
    }
    console.log(
      "formData[secName][filterName][inputName]",
      formData[secName][filterName]
    );
    
    setFormData((prevFormData) => {
      if (!prevFormData[secName]) {
        prevFormData[secName] = {};
      }
      if (!prevFormData[secName][filterName]) {
        prevFormData[secName][filterName] = {};
      }
      prevFormData[secName][filterName][inputName] = value;
      return prevFormData;
    });
    console.log("formdata", formData);
  };

  function removeNoneValues(data) {
    const cleanedData = {};

    Object.keys(data).forEach((key) => {
      const filteredSubObject = {};
      let x = true;
      Object.keys(data[key]).forEach((subKey) => {
        if (data[key][subKey] == "None" || data[key][subKey] == null) {
          x = false;
        }
      });

      if (x) {
        cleanedData[key] = data[key];
      }
    });

    return cleanedData;
  }

  function handlesaveandnext(subinput) {
    console.log("subinput", subinput);
    let prevData = explore_inputs_Data;
    if(!prevData["fundamental_filters"]){
      prevData["fundamental_filters"] = {};
    }
    let clean_data=removeNoneValues(formData[subinput]);
    prevData["fundamental_filters"][subinput]=clean_data;
    set_explore_inputs_Data(prevData);
    // handleDropdownClick(subinput);
    console.log("prevData", prevData);

  }

  
  const [currentDropDown, setCurrentDropDown] = useState([0]);

  const handleDropdownClick = (id) => {
    if (currentDropDown.includes(id)) {
      setCurrentDropDown(currentDropDown.filter((item) => item !== id));
    } else {
      // setCurrentDropDown([...currentDropDown, id]);
      setCurrentDropDown([id]);
    }
  };
  // useEffect(() => {
  //   handle_full_save_explore("fundamental_filters", formData);
  // }, [formData]);

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
              currentDropDown.includes(index) ? "show max-h-[" + +"]" : ""
            } ml-2 px-4 p-2`}
          >
            {item.children.map((subinput, subIndex) => (
              <div key={subIndex} className="my-4">
                {/* <h2 className="flex border-b-[0px] border-b-gray-500 h-[40px] items-center text-[20px] ">
                  <span
                    className={`relative top-[20px] dark:bg-[#0D111E]  bg-[#281F2E] border-r-[px] px-4 pb-2 rounded-md pr-10 ${
                      currentDropDown.includes(index) ? "" : "shadow-none"
                    }`}
                    style={{
                      boxShadow: "0px -8px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                    }}
                  >
                    {subinput.title} -
                  </span>
                </h2> */}
                <form
                  className="inputs px-2 shadow-black inset-2 rounded-lg p-2"
                  onSubmit={
                    (e) => e.preventDefault()
                    // handleFullSave()
                  }
                  style={{
                    boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.5)", // Adjust shadow as needed
                  }}
                >
                  <h1 className="font-semibold">{subinput.title}</h1>
                  <p className="text-center pt-1 pb-4 text-[12px]">
                    {subinput.info}
                  </p>
                  {subinput.inputs &&
                    subinput.inputs.map((field, fieldIndex) => {
                      if (field.type == "dropdown") {
                        return (
                          <div
                            key={fieldIndex}
                            className="flex justify-between items-center my-1"
                          >
                            <label>{field.title}</label>
                            <select
                              id="states"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                              onChange={(e) => {
                                handleChange(
                                  item.key,
                                  subinput.key,
                                  field.key,
                                  e.target.value
                                );
                              }}
                            >
                              {field.options.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      }
                      if (field.type == "number") {
                        return (
                          <div
                            key={fieldIndex}
                            className="flex justify-between items-center my-1"
                          >
                            <label>{field.title}</label>
                            <input
                              onChange={(e) => {
                                handleChange(
                                  item.key,
                                  subinput.key,
                                  field.key,
                                  e.target.value
                                );
                              }}
                              type="number"
                              className=" border text-black border-gray-800 text-sm rounded-lg p-2"
                            />{" "}
                          </div>
                        );
                      }

                      // if (field.type == "Period Type") {
                      //   return (
                      //     <div className="flex justify-between items-center my-2 ">
                      //       <label>Period Type</label>
                      //       <select
                      //         id="states"
                      //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-[#111F29] focus:border-[#111F29] block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#111F29] dark:focus:border-[#111F29]"
                      //         // value={formData[item.title][subinput.title][field.title]?formData[item.title][subinput.title][field.title]:""}
                      //         onChange={() =>
                      //           handleChange(
                      //             item.title,
                      //             subinput.title,
                      //             field.title
                      //           )
                      //         }
                      //       >
                      //         {field.options.map((option) => (
                      //           <option value="SA">{option}</option>
                      //         ))}
                      //       </select>
                      //       <div class="relative flex items-center max-w-[8rem]">
                      //         <button
                      //           // onClick={()=>count>0?setCount(count-1):""}
                      //           // onClick={()=>handleChange(item.name,"quantity",formData[item.name].quantity-1)}
                      //           type="button"
                      //           id="decrement-button"
                      //           data-input-counter-decrement="quantity-input"
                      //           class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      //         >
                      //           <svg
                      //             class="w-3 h-3 text-gray-900 dark:text-white"
                      //             aria-hidden="true"
                      //             xmlns="http://www.w3.org/2000/svg"
                      //             fill="none"
                      //             viewBox="0 0 18 2"
                      //           >
                      //             <path
                      //               stroke="currentColor"
                      //               stroke-linecap="round"
                      //               stroke-linejoin="round"
                      //               stroke-width="2"
                      //               d="M1 1h16"
                      //             />
                      //           </svg>
                      //         </button>
                      //         <input
                      //           type="text"
                      //           id="quantity-input"
                      //           data-input-counter
                      //           aria-describedby="helper-text-explanation"
                      //           class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      //           placeholder="999"
                      //           value={item["name"] == "Trend" ? { count } : ""}
                      //           //   value={item.name === "Trend" ? count : ""}
                      //           // value={formData[item.name].quantity}

                      //           required
                      //         />
                      //         <button
                      //           type="button"
                      //           id="increment-button"
                      //           onClick={() =>
                      //             handleChange(
                      //               item.name,
                      //               "quantity",
                      //               formData[item.name].quantity + 1
                      //             )
                      //           }
                      //           data-input-counter-increment="quantity-input"
                      //           class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      //         >
                      //           <svg
                      //             class="w-3 h-3 text-gray-900 dark:text-white"
                      //             aria-hidden="true"
                      //             xmlns="http://www.w3.org/2000/svg"
                      //             fill="none"
                      //             viewBox="0 0 18 18"
                      //           >
                      //             <path
                      //               stroke="currentColor"
                      //               stroke-linecap="round"
                      //               stroke-linejoin="round"
                      //               stroke-width="2"
                      //               d="M9 1v16M1 9h16"
                      //             />
                      //           </svg>
                      //         </button>
                      //       </div>
                      //     </div>
                      //   );
                      // }
                    })}
                </form>
              </div>
            ))}
            <div className="flex justify-end mt-">
              <button
                // type="submit"
                onClick={()=>handlesaveandnext(item.key)}
                className="p-1 border-[1px] rounded-lg px-4 text-sm"
              >
                Save&Next
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FundamentalFormExplore;
