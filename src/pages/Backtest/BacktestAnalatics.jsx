import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatsCard from "../../components/charts/StatsCard";
import Example from "../../components/charts/Example";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import CandleChart from "../../components/charts/CandleChart";
import EquityCurve from "./EquityCurve";
import { EquityTable } from "./EquityTable";
import YearlySummary from "./YearlySummary";
import BackTestAnalytics2 from "./BackTestAnalytics2";

const BacktestAnalatics = () => {
  const { id } = useParams(); // Get the dynamic 'id' from the URL

  const [currentTab, setCurrentTab] = useState("equityCurve");

  const demo_input_summary = [
    {
      title: "Fundamental Filters",
      inputs: [
        {
          title: "trend",
          indicator: "Simple MA",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Momentum",
          indicator: "RSI",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Volatilaty",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Breadth",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
      ],
    },
    {
      title: "Technical Filters",
      inputs: [
        {
          title: "trend",
          indicator: "Simple MA",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Momentum",
          indicator: "RSI",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Volatilaty",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Breadth",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
      ],
    },
    {
      title: "Technical Filters",
      inputs: [
        {
          title: "trend",
          indicator: "Simple MA",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Momentum",
          indicator: "RSI",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Volatilaty",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Breadth",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
      ],
    },
    {
      title: "Fundamental Filters",
      inputs: [
        {
          title: "trend",
          indicator: "Simple MA",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Momentum",
          indicator: "RSI",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Volatilaty",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Breadth",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
      ],
    },
    {
      title: "Technical Filters",
      inputs: [
        {
          title: "trend",
          indicator: "Simple MA",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Momentum",
          indicator: "RSI",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Volatilaty",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Breadth",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
      ],
    },
    {
      title: "Technical Filters",
      inputs: [
        {
          title: "trend",
          indicator: "Simple MA",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Momentum",
          indicator: "RSI",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Volatilaty",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
        {
          title: "Breadth",
          indicator: "ATX",
          duration_unit: "Daily",
          duration_value: "10",
        },
      ],
    },
  ];

  const tabdc={
    equityCurve:<EquityCurve />,
    equitytable:<EquityTable />,
    yearlySummary:<YearlySummary />
  }

  return (
    <div className="my-10 mx-10">
      {/* <div className="flex items-center justify-between py-1 border-b-[1px]">
        <span className="flex items-center ">
          <svg width="8" height="8" className="mr-2">
            <circle cx="4" cy="4" r="4" fill="gray" />
          </svg>
          Report {id}
        </span>
        <span>28 Aug 2024</span>
        <span className="flex items-center w-[100px]">
          <svg width="12" height="12" className="mr-1">
            <circle
              cx="6"
              cy="6"
              r="5"
              fill="none"
              stroke="#56FF3B"
              strokeWidth="2"
            />
          </svg>
          Success
        </span>
      </div>
      <div className="text-sm w-full">
        <h1>Summary :-</h1>
        <div className="flex p-1 justify-between w-full">
          {demo_input_summary.map((item, index) => (
            <div key={index} className="m-1 border-[px] w-[16%]">
              <h1>{item.title} :-</h1>
              <div>
                {item.inputs.map((input, inputIndex) => (
                  <div key={inputIndex}>
                    <span className="border-[1px] rounded-full px-2 py-[2px] shadow-[0_0_2px_1px_rgba(255,255,255,1)] text-[10px]">
                      {input.title} - {input.indicator}, {input.duration_value}{" "}
                      {input.duration_unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="">
        {/* <StatsCard /> */}
        {/* {tabdc[currentTab]} */}
        <BackTestAnalytics2 />
        {/* <BarChart />
        <PieChart /> */}
      </div>

      {/* <CandleChart /> */}

      <div className=" fixed bottom-0 m-1 w-[93.5%]   text-sm flex justify-center font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px ">
          <li className="me-2">
            <a
              className={`${currentTab=="equitytable"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500":""} cursor-pointer inline-block p-2  rounded-t-lg active  dark:border-blue-500`}
            onClick={()=>setCurrentTab("equitytable")}
            >
              Equity Table
            </a>
          </li>
          <li className="me-2">
            <a
              className={`${currentTab=="equityCurve"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500":""} cursor-pointer inline-block p-2  rounded-t-lg active  dark:border-blue-500`}
              onClick={()=>setCurrentTab("equityCurve")}

            >
              Equity Curve
            </a>
          </li>
          <li className="me-2">
            <a
              className={`${currentTab=="yearlySummary"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500":""} cursor-pointer inline-block p-2  rounded-t-lg active  dark:border-blue-500`}
              aria-current="page"
              onClick={()=>setCurrentTab("yearlySummary")}

            >
              Yearly summary
            </a>
          </li>
        </ul>
      </div>
    </div>
    // <BackTestAnalytics2 />
  );
};

export default BacktestAnalatics;
