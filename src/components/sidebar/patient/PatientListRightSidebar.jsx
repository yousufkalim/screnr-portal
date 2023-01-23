import React from 'react';

// assets imports

import { ReactComponent as Clock } from '../../../assets/components/TimeCard/clock.svg';

// child imports
import TimeCard from '../../TimeCard';
import Chart from '../../charts/patient/PatientChart';

export default function RightSidebar() {
  return (
    <div className="right_sidebar_container">
      <div className="right_sidebar">
        <Chart />
        <TimeCard Icon={Clock} time="120 Hr" text="Login Hours" classname="right_sidebar_card" />
      </div>
    </div>
  );
}
