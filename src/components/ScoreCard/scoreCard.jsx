/* eslint-disable no-nested-ternary */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function ScoreCard({ bodyPart, scoreValue }) {
  return (
    <div className="score_Bars">
      <p className="excercises_names">{bodyPart}</p>{' '}
      <div>
        <CircularProgress
          variant="determinate"
          thickness="8"
          value={scoreValue || 0}
          size={60}
          sx={{
            color:
              scoreValue >= 80 && scoreValue <= 100
                ? '#25CC7C'
                : scoreValue >= 60 && scoreValue <= 80
                ? '#FABB18'
                : '#FF5151',
          }}
        />
        <div className="graphData">
          <p className="excercise_percent">{scoreValue || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
