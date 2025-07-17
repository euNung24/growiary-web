/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { CanvasHTMLAttributes } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type BarChartProps<T, V> = CanvasHTMLAttributes<HTMLCanvasElement> & {
  labels: string[];
  data: T[];
  backgroundColor: string[];
  options?: V;
};

Chart.register(BarElement, CategoryScale, LinearScale, ChartDataLabels);
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 'normal';
Chart.defaults.color = '#747F89';
Chart.defaults.borderColor = '#EFEFEF';
function BarChart<T, V>({
  labels,
  data,
  backgroundColor,
  options,
  ...props
}: BarChartProps<T, V>) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        borderWidth: 1,
        backgroundColor: backgroundColor,
        borderRadius: 4,
        // barThickness: 32,
      },
    ],
  };

  // @ts-ignore
  return <Bar data={chartData} options={options} {...props} />;
}

export default BarChart;
