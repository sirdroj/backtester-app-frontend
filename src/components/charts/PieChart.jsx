import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const PieChart = () => {
  useEffect(() => {
    const chartConfig = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'pie',
        width: 280,
        height: 280,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#020617', '#ff8f00', '#00897b', '#1e88e5', '#d81b60'],
      legend: {
        show: false,
      },
    };

    const chart = new ApexCharts(document.querySelector('#pie-chart'), chartConfig);
    chart.render();

    // Clean up the chart on unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="h-min relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
     
      <div className="py-6 mt-4 grid place-items-center px-2">
        <div id="pie-chart"></div>
      </div>
    </div>
  );
};

export default PieChart;
