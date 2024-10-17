import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatsCard from "../../components/charts/StatsCard";
import Example from "../../components/charts/Example";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import CandleChart from "../../components/charts/CandleChart";
import EquityChart from "./EquityChart";
import { EquityTable } from "./EquityTable";
import YearlySummary from "./YearlySummary";
import BackTestAnalytics2 from "./EquityCurve";
import EquityCurve from "./EquityCurve";

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

  const tabdc = {
    equityCurve: <EquityCurve />,
    equitytable: <EquityTable />,
    yearlySummary: <YearlySummary />,
  };

  return (
    <div className="my-10 mt-2 px-[0.5%] w-full flex justify-center">
      <div className="w-full">
        <div className="  m- w-full text-sm flex justify-center font-medium text-center text-gray-500 border-y border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px ">
            <li className="me-2">
              <a
                className={`${
                  currentTab == "equityCurve"
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500"
                    : ""
                } cursor-pointer inline-block p-2  rounded-t-lg active  dark:border-blue-500`}
                onClick={() => setCurrentTab("equityCurve")}
              >
                Equity Curve
              </a>
            </li>
            <li className="me-2">
              <a
                className={`${
                  currentTab == "yearlySummary"
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500"
                    : ""
                } cursor-pointer inline-block p-2  rounded-t-lg active  dark:border-blue-500`}
                aria-current="page"
                onClick={() => setCurrentTab("yearlySummary")}
              >
                Yearly summary
              </a>
            </li>
          </ul>
        </div>

        <div className="">{tabdc[currentTab]}</div>
      </div>
    </div>
  );
};

export default BacktestAnalatics;
