import React from 'react';
import Chart from '../../charts/patient/Chart.Component';

export default function RightSidebar({ graph }) {
  return (
    <div className="right_sidebar_container">
      <div className="right_sidebar">
        <Chart graph={graph} />
      </div>
    </div>
  );
}
