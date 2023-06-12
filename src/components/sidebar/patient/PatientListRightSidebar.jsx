import React from 'react';
import Chart from '../../charts/patient/Chart.Component';

export default function RightSidebar({ logs }) {
  return (
    <div className="right_sidebar_container">
      <div className="right_sidebar">
        <Chart logs={logs} />
      </div>
    </div>
  );
}
