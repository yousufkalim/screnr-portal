/* eslint-disable import/no-unresolved */
import React from 'react';
import ChartJS from 'chart.js/auto';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    y: {
      grid: {
        display: false,
      },
      max: 100,
      min: 10,
      ticks: {
        stepSize: 10,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const data = {
  labels,
  datasets: [
    {
      id: 1,
      label: ' Low',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

    {
      id: 2,
      label: 'Medium',
      data: [
        90, 89, 78, 70, 60, 70, 20, 15, 37, 15, 14, 19, 40, 50, 70, 20, 15, 37, 15, 14, 19, 40, 50,
      ],

      borderColor: '#FABB18',
      backgroundColor: '#FABB18',
    },
    {
      id: 3,
      label: 'High',
      data: [40, 80, 68, 55, 20, 16, 27, 21, 57, 90, 14, 19, 40, 50],
      borderColor: '#25CC7C',
      backgroundColor: '#25CC7C',
    },
  ],
};

function ExcerciseChart() {
  return <Line options={options} data={data} />;
}

export default ExcerciseChart;
