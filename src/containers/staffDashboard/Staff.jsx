import { React, useState } from 'react';
// components import
import CardWithIcon from '../../components/CardWithIcon';
import Chart from '../../components/Chart';
// images import
import { ReactComponent as Patients } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinic } from '../../assets/components/CardWithIcon/clinicIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as RedCircle } from '../../assets/components/CardWithIcon/redCircle.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/CardWithIcon/blueCircle.svg';
import addBtn from '../../assets/icons/addBtn.svg';
// child import
import AddStaffMember from './AddStaffMember';
import TableComponent from './StaffTable';

export default function Dashboard() {
  const [openAddStaffMember, setOpenAddStaffMember] = useState(false);

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
        <div className="addBtn">
          <img
            src={addBtn}
            style={{ cursor: 'pointer' }}
            onClick={() => setOpenAddStaffMember(true)}
            role="presentation"
            alt=""
          />
        </div>
      </div>
      {openAddStaffMember && (
        <AddStaffMember
          openAddStaffMember={openAddStaffMember}
          setOpenAddStaffMember={setOpenAddStaffMember}
        />
      )}
    </div>
  );
}
