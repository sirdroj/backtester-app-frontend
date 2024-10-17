import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const transformToColumnLists = (data) => {
  const result = {};

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item[key]);
    });
  });

  let ans = [];
  for (const key in result) {
    if (key === "Equity" || key === "Nifty 500") {
      ans.push({
        name: key,
        data: result[key],
      });
    }
  }

  return { series: ans, dates: result["Date"] };
};

const chartConfig = (transformedData) => ({
  series: transformedData["series"],
  chart: {
    type: "line",
    height: 450,
    toolbar: {
      show: false,
    },
  },
  title: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    lineCap: "round",
    curve: "smooth",
  },
  markers: {
    size: 1,
    colors: "white",
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "white",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
    categories: transformedData.dates,
  },
  yaxis: {
    tickAmount: 20,
    labels: {
      style: {
        colors: "white",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "rgba(255, 255, 255, 0.1)",
    strokeDashArray: 0,
    opacity: 0.1,
    xaxis: {
      lines: {
        show: true,
        opacity: 0.2,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    theme: "dark",
  },
});

const EquityChart = ({ equity_Table_data }) => {
  const transformedData = transformToColumnLists(equity_Table_data.slice(0, 40));

  useEffect(() => {
    const chart = new ApexCharts(
      document.querySelector("#line-chart"),
      chartConfig(transformedData)
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [transformedData]);

  return (
    <div
      style={{ width: "100%" }}
      className="relative flex flex-col rounded-xl dark:bg-gray-900 bg-opacity-5bg-gray-700 shadow-md"
    >
      <div className="px-2 pb-0 h-full">
        <div id="line-chart" style={{ width: "100%" }}></div>
      </div>
    </div>
  );
};

export default EquityChart;
