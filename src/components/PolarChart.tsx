'use client';

import { PolarArea } from 'react-chartjs-2';
import {
  ArcElement,
  Chart,
  LineElement,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
} from 'chart.js';

type PolarChartProps<T> = {
  labels: string[];
  data: T[];
  backgroundColor: string[];
  axisDisplay?: boolean;
};

Chart.register(
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
);

function PolarChart<T>({ labels, data, backgroundColor }: PolarChartProps<T>) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: data,
        borderWidth: 1,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    responsive: false,
    scales: {
      r: {
        pointLabels: {
          display: true,
          padding: 1,
          centerPointLabels: true,
          font: {
            size: 16,
            color: '#474C51',
          },
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <PolarArea data={chartData} options={options} width={252} height={252} />;
}

export default PolarChart;
