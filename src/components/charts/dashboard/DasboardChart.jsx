import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.borderColor = '#655B96';
const options = {
  elements: {
    bar: {
      barPercentage: 0.4,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      max: 1000,
      min: 200,
      ticks: {
        stepSize: 200,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [550, 700, 600, 600, 400, 900, 800, 450, 800, 1000, 900, 1000],
      backgroundColor: 'rgb(251, 166, 34)',
      barPercentage: 0.2,
    },
  ],
};

export default function Chart() {
  return (
    <>
      <div className="chart_header_div">
        <span className="dashboardChartTxt">Clinics Addition</span>
        <span className="chart_header_span">
          <div className="chart_header_orange_dot" />
          Clinics Counter
        </span>
      </div>
      <Bar options={options} data={data} />
    </>
  );
}
