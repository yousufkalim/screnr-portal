import React from 'react';
// components import
import CardWithIcon from '../../components/cardWithIcon';
import TableComponent from '../../components/table';
import Chart from '../../components/chart';
// images import
import { ReactComponent as Patients } from '../../assets/components/cardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinic } from '../../assets/components/cardWithIcon/clinicIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/cardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/cardWithIcon/patients.svg';
import { ReactComponent as Circle } from '../../assets/components/cardWithIcon/yellowIcon.svg';
import { ReactComponent as RedCircle } from '../../assets/components/cardWithIcon/redCircle.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/cardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/cardWithIcon/blueCircle.svg';

export default function Dashboard() {
  const cardsData = [
    {
      icon: Patients,
      amount: '32',
      title: 'Total Staff',
      icon2: Circle,
      className: 'yellow_circle',
    },
    {
      icon: Clinic,
      amount: '65',
      title: 'Total Clinician',
      icon2: RedCircle,
      className: 'red_circle',
    },
    {
      icon: Clinician,
      amount: '65',
      title: 'Total Clinician',
      icon2: GreenCircle,
      className: 'green_circle',
    },
    {
      icon: Patients2,
      amount: '54',
      title: 'Total Patients',
      icon2: BlueCircle,
      className: 'blue_circle',
    },
  ];

  return (
    <div className="dashboard_main_div">
      <div className="navigation">Dashboard </div>
      <div className="cards_div">
        {cardsData.map((item) => (
          <CardWithIcon
            Icon={item.icon}
            amount={item.amount}
            title={item.title}
            CircleIcon={item.icon2}
            LeftCircleClassName={item.className}
          />
        ))}
      </div>
      <div className="dashboard_div_2">
        <div className="dashboard_table_div">
          <TableComponent />
        </div>
        <div className="chart_main_div">
          <Chart />
        </div>
      </div>
    </div>
  );
}
