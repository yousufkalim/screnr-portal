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

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Chart({ graph }) {
  const array = daysOfWeek.map((day) => graph?.data[day]);

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: array,
        backgroundColor: '#136773B2',
        borderRadius: 5,
        barPercentage: 0.29,
      },
    ],
  };
  return (
    <div className="patientListChart">
      <div className="timeChartDiv">
        <span className="chartTime">{graph?.totalTracked}</span>
        <span className="chartSubtxt">Total</span>
        <span className="chartTimeTxt">TRACKED HOURS</span>
      </div>
      <div className="currentTimeStatsDiv">
        <div className="currentTimeSubDiv">
          <span className="chartDayTxt">Today</span>
          <span className="chartCurrentTime">05:00:20</span>
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
