'use client';

import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

type BarChartProps<T> = {
  labels: string[];
  data: T[];
  backgroundColor: string[];
  axisDisplay?: boolean;
};

Chart.register(BarElement, CategoryScale, LinearScale);

function BarChart<T>({
  labels,
  data,
  backgroundColor,
  axisDisplay = true,
}: BarChartProps<T>) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: data,
        borderWidth: 1,
        backgroundColor: backgroundColor,
        borderRadius: 4,
        // barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        border: {
          display: axisDisplay,
        },
        grid: {
          display: axisDisplay,
        },
      },
      y: {
        display: axisDisplay,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
