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
ChartJS.defaults.borderColor = 'transparent';
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
      ticks: {
        display: false,
      },
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

const labels = [
  '10/05',
  '11/05',
  '12/05',
  '13/05',
  '14/05',
  '15/05',
  '16/05',
  '17/05',
  '10/05',
  '11/05',
  '12/05',
  '17/05',
];

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [550, 700, 600, 600, 400, 900, 800, 450, 800, 1000, 900, 1000],
      backgroundColor: '#136773B2',
      borderRadius: 5,
      barPercentage: 0.5,
    },
  ],
};

export default function Chart() {
  return (
    <div className="patientListChart">
      <div className="timeChartDiv">
        <span className="chartTime">26:50:32</span>
        <span className="chartSubtxt">Total</span>
        <span className="chartTimeTxt">TRACKED HOURS</span>
      </div>
      <div className="currentTimeStatsDiv">
        <div className="currentTimeSubDiv">
          <span className="chartDayTxt">Today</span>
          <span className="chartCurrentTime">05:00:20</span>
        </div>
        <div>
          <span className="statsPercentage">33.04%</span>
        </div>
      </div>

      <Bar options={options} data={data} className="patientChart" />

      <div className="periodDiv">
        <p className="periodSelect">Last Week</p>
        <p className="periodSelect">Today</p>
        <p className="periodSelect">Last Month</p>
      </div>
    </div>
  );
}
