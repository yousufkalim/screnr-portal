import React from 'react';

// assets imports
import { ReactComponent as Login } from '../../../assets/components/TimeCard/login.svg';
import { ReactComponent as Logoff } from '../../../assets/components/TimeCard/logoff.svg';
import { ReactComponent as Clock } from '../../../assets/components/TimeCard/clock.svg';
import { ReactComponent as LoginCount } from '../../../assets/components/TimeCard/loginCount.svg';

// child imports
import TimeCard from '../../TimeCard';
import Chart from '../../charts/patient/PatientChart';

export default function RightSidebar() {
  return (
    <div className="right_sidebar_container">
      <div className="right_sidebar">
        <TimeCard Icon={Login} time="1 Hr Ago" text="Last Login" />
        <TimeCard Icon={Logoff} time="30 Min Ago" text="Last Logoff" />
        <Chart />
        <TimeCard Icon={LoginCount} time="22" text="Login count" />
        <TimeCard Icon={Clock} time="120 Hr" text="Login Hours" />
      </div>
    </div>
  );
}
