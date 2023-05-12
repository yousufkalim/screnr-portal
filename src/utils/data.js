/* eslint-disable import/prefer-default-export */
import { ReactComponent as Clock } from '../assets/components/TimeCard/clock.svg';
import { ReactComponent as Login } from '../assets/components/TimeCard/login.svg';
import { ReactComponent as LoginCount } from '../assets/components/TimeCard/loginCount.svg';
import { ReactComponent as Logoff } from '../assets/components/TimeCard/logoff.svg';

export const labels = [
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

export const options = {
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

export const cardsData = [
  {
    icon: Login,
    time: '1 Hr Ago',
    text: 'Last Login',
  },
  {
    icon: LoginCount,
    time: '22',
    text: 'Login count',
  },
  {
    icon: Clock,
    time: '120 Hr',
    text: 'Login Hours',
  },
  {
    icon: Logoff,
    time: '30 Min Ago',
    text: 'Last Logoff',
  },
];
