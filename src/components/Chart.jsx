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
      data: [550, 100, 200, 300, 400, 500, 600, 450, 200, 300, 400, 500],
      backgroundColor: 'rgb(251, 166, 34)',
    },
  ],
};

export default function Chart() {
  return (
    <>
      <div className="chart_header_div">
        <span style={{ fontWeight: '500' }}>Clinics Addition</span>
        <span className="chart_header_span">
          <div className="chart_header_orange_dot" />
          Clinics Counter
        </span>
      </div>
      <Bar options={options} data={data} />;
    </>
  );
}
