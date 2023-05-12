import React, { useEffect, useState } from 'react';
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

export default function Chart({ clinicsPerMonth }) {
  const [chartArray, setChartArray] = useState([]);
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
        ticks: {
          stepSize: 1,
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
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const chartData = () => {
    const tempArray = [];
    labels?.forEach((item) => {
      const found = clinicsPerMonth?.find((count) => count?.month?.toUpperCase() === item);
      if (found) {
        tempArray.push(found?.count);
      } else {
        tempArray.push(0);
      }
    });
    setChartArray(tempArray);
  };

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: chartArray,
        backgroundColor: 'rgb(251, 166, 34)',
        barPercentage: 0.2,
      },
    ],
  };

  useEffect(() => {
    chartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicsPerMonth]);

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
