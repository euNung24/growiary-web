import { CategoryScale, Chart, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 'normal';
Chart.defaults.color = '#747F89';
Chart.defaults.borderColor = '#EFEFEF';
const AvgPostChart = ({ data }: { data: { [key: string]: number } }) => {
  const chartData = {
    labels: [...Object.keys(data).map(v => +v.slice(-2) + '월')],
    datasets: [
      {
        data: Object.values(data),
        borderColor: '#58B90E',
        backgroundColor: '#D5EFC1',
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 4,
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: '평균 작성수',
          font: {
            size: 12,
          },
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AvgPostChart;
