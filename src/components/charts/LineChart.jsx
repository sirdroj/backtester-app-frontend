import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import filled from "@material-tailwind/react/theme/components/timeline/timelineIconColors/filled";

const LineChart = () => {
  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: "Sales",
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
        {
          name: "ef",
          data: [5, 4, 30, 35, 50, 30, 20, 20, 50], 
        },
        {
          name: "xyz",
          data: [51, 41, 201, 452, 242, 401, 112, 101, 552,112, 101, 552,41, 201, 452,], 
        },
      ],
      chart: {
        type: "line",
        height: 440,
        toolbar: {
          show: false,
        },
        colors: ["white","yellow"],
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      // colors: ["white","yellow"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
        
      },
      markers: {
        size: 5,
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
        categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };

    const chart = new ApexCharts(document.querySelector("#line-chart"), chartConfig);
    chart.render();

    return () => {
      chart.destroy(); // Cleanup the chart on component unmount
    };
  }, []);

  return (
    <div className="relative flex flex-col rounded-xl dark:bg-gray-900 bg-gray-600 text-gray-700 shadow-md">
     
      <div className=" px-2 pb-0">
        <div id="line-chart"></div>
      </div>
    </div>
  );
};

export default LineChart;
