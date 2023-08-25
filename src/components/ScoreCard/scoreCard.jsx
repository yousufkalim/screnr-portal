/* eslint-disable no-nested-ternary */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function ScoreCard({ bodyPart, scoreValue }) {
  const percentageOfGraph =
    scoreValue > 0 && scoreValue <= 10
      ? '#FF5151'
      : scoreValue > 10 && scoreValue <= 30
      ? '#C2623B'
      : scoreValue > 30 && scoreValue <= 40
      ? '#D0A34D'
      : scoreValue > 40 && scoreValue <= 50
      ? '#E7D270'
      : scoreValue > 50 && scoreValue <= 55
      ? '#F0E570'
      : scoreValue > 55 && scoreValue <= 65
      ? '#E0EE66'
      : scoreValue > 65 && scoreValue <= 70
      ? '#CAE662'
      : scoreValue > 70 && scoreValue <= 75
      ? '#A9D55D'
      : scoreValue > 75 && scoreValue <= 80
      ? '#AED05D'
      : scoreValue > 80 && scoreValue <= 85
      ? '#97C755'
      : scoreValue > 85 && scoreValue <= 90
      ? '#7EB252'
      : scoreValue > 90 && scoreValue <= 95
      ? '#7EB45A'
      : '#669851';
  return (
    <div className="score_Bars">
      <p className="excercises_names">{bodyPart}</p>{' '}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress
          variant="determinate"
          thickness="6"
          value={scoreValue || 0}
          size={70}
          sx={{
            color: percentageOfGraph,
          }}
        />
        <div className="graphData">
          <p className="excercise_percent">{scoreValue || 0}%</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
