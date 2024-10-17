import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const BarChart = ({data,title}) => {
  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: "N 500",
          data: [
            -0.72, 3.84, 35.91, -3.38, 7.66, 16.67, 30.19, 3.02, 25.76, 8.62,
          ],
        },
        {
          name: "Equity",
          data: [
            20, 13.2, 50.66, -6.7, 17.43, 28.08, 48.79, 8.56, 66.12, 29.23,
          ],
        },
        {
          name: "Churn",
          data: [11.5, 12, 12, 12, 12, 12, 12, 12, 12, 5],
        },
      ],
      chart: {
        type: "bar",
        height: 380,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "true",
      },
      dataLabels: {
        enabled: false,
      },
      // colors: ["white"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
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
        categories: [
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
      },
      yaxis: {
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
        borderColor: "white",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#bar-chart"),
      chartConfig
    );
    chart.render();

    // Cleanup the chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="relative max-h-min flex flex-col rounded-xl  dark:bg-gray-900 bg-white bg-opacity-5  bg-clip-border text-gray-100 shadow-sm">
      <h1 className="p-2 font-semibold">{title}</h1>

      <div className="">
        <div id="bar-chart"></div>
      </div>
    </div>
  );
};

export default BarChart;
