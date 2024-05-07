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
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

type PolarChartProps = {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  axisDisplay?: boolean;
};

Chart.register(
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  ChartDataLabels,
);

function PolarChart({ labels, data, backgroundColor }: PolarChartProps) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        borderWidth: 1,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          // display: true,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        max: Math.max(...data) + 2,
      },
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value: string, context: Context) {
          const total = data.reduce((f, v) => f + v, 0);

          return context.active
            ? Math.floor((+value / total) * 100) + '%'
            : labels[context.dataIndex];
        },
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <PolarArea data={chartData} options={options} />;
}

export default PolarChart;
