'use client';

import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { CanvasHTMLAttributes } from 'react';

type BarChartProps<T> = CanvasHTMLAttributes<HTMLCanvasElement> & {
  labels: string[];
  data: T[];
  backgroundColor: string[];
  axisDisplay?: boolean;
};

Chart.register(BarElement, CategoryScale, LinearScale);
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 'normal';

function BarChart<T>({
  labels,
  data,
  backgroundColor,
  axisDisplay = true,
  ...props
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

  return <Bar data={chartData} options={options} {...props} />;
}

export default BarChart;
