import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { Pie } from 'react-chartjs-2';

function PieChartComponent({ before, after }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
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
        ticks: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: ['before', 'after'],
    datasets: [
      {
        data: [before, after],
        backgroundColor: ['rgba(37, 204, 124, 1)', 'rgba(250, 187, 24, 1)'],
        borderColor: ['rgba(37, 204, 124, 1)', 'rgba(250, 187, 24, 1)'],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div
      style={{
        height: '4rem',
        width: '4rem',
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChartComponent;
