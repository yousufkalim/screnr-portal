import React from 'react';
import { CircularProgress } from '@mui/material';

const exercises = [
  { name: 'Push-ups', score: 20, color: '#FABB18' },
  { name: 'Squats', score: 19, color: '#FF5151' },
  { name: 'Planks', score: 40, color: '#25CC7C' },
  { name: 'Lunges', score: 40, color: 'orange' },
  { name: 'Crunches', score: 20, color: 'red' },
  { name: 'Crunches', score: 20, color: '#FABB18' },
];

function MultiCircularProgress() {
  const progressStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div style={{ width: '110px', height: '85px', position: 'relative' }}>
      {exercises.map((exercise, index) => (
        <div
          key={exercise.name}
          style={{ ...progressStyles, transform: `rotate(${(index * 360) / exercises.length}deg)` }}
        >
          <CircularProgress
            variant="determinate"
            thickness="8"
            size={70}
            value={exercise.score}
            style={{ color: exercise.color }}
          />
        </div>
      ))}
    </div>
  );
}

export default MultiCircularProgress;
