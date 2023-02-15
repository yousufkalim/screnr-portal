import React from 'react';

// child imports
import Chart from '../../charts/patient/PatientChart';

export default function RightSidebar() {
  return (
    <div className="right_sidebar_container">
      <div className="right_sidebar">
        <Chart />
      </div>
    </div>
  );
}
