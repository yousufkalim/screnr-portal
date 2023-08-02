/* eslint-disable import/prefer-default-export */
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
      border: {
        display: true,
        color: '#655B96',
      },
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      border: {
        display: true,
        color: '#655B96',
      },
      grid: {
        display: false,
      },
    },
  },
};

export const weeks = [
  {
    value: 1,
    label: '1 Week',
  },
  {
    value: 2,
    label: '2 Weeks',
  },
  {
    value: 3,
    label: '3 Weeks',
  },
  {
    value: 4,
    label: '4 Weeks',
  },
  {
    value: 5,
    label: '5 Weeks',
  },
  {
    value: 6,
    label: '6 Weeks',
  },
];

export const frequency = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 11,
    label: '11',
  },
  {
    value: 12,
    label: '12',
  },
  {
    value: 13,
    label: '13',
  },
  {
    value: 14,
    label: '14',
  },
];

export const rest = [
  {
    value: '15s',
    label: '15s',
  },
  {
    value: '30s',
    label: '30s',
  },
  {
    value: '45s',
    label: '45s',
  },
  {
    value: '60s',
    label: '60s',
  },
  {
    value: '90s',
    label: '90s',
  },
  {
    value: '120s',
    label: '120s',
  },
];

export const bodyParts = [
  {
    value: 'Neck/Upper Spine',
    label: 'Neck/Upper Spine',
  },
  {
    value: 'Shoulder',
    label: 'Shoulder',
  },
  {
    value: 'Rotator Cuff',
    label: 'Rotator Cuff',
  },
  {
    value: 'Elbow',
    label: 'Elbow',
  },
  {
    value: 'Wrist',
    label: 'Wrist',
  },
  {
    value: 'Hand',
    label: 'Hand',
  },
  {
    value: 'Core',
    label: 'Core',
  },
  {
    value: 'Hip',
    label: 'Hip',
  },
  {
    value: 'Knee',
    label: 'Knee',
  },
  {
    value: 'Ankle',
    label: 'Ankle',
  },
  {
    value: 'Foot',
    label: 'Foot',
  },
];
