import React from 'react';
import Chart from '../../charts/patient/Chart.Component';

export default function RightSidebar() {
  return (
    <div className="right_sidebar_container">
      <div className="right_sidebar">
        <Chart />
      </div>
    </div>
  );
}
