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
    label: '2 Week',
  },
  {
    value: 3,
    label: '3 Week',
  },
  {
    value: 4,
    label: '4 Week',
  },
  {
    value: 5,
    label: '5 Week',
  },
  {
    value: 6,
    label: '6 Week',
  },
];

export const frequency = [
  {
    value: 1,
    label: '1 Time',
  },
  {
    value: 2,
    label: '2 Times',
  },
  {
    value: 3,
    label: '3 Times',
  },
  {
    value: 4,
    label: '4 Times',
  },
  {
    value: 5,
    label: '5 Times',
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
