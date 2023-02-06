import { React, useState, useEffect } from 'react';
// components import
import CardWithIcon from '../components/cards/CardWithIcon';
import Chart from '../components/charts/dashboard/DasboardChart';
// images import
import { ReactComponent as Patients } from '../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinic } from '../assets/components/CardWithIcon/clinicIcon.svg';
import { ReactComponent as Clinician } from '../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as Circle } from '../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as RedCircle } from '../assets/components/CardWithIcon/redCircle.svg';
import { ReactComponent as GreenCircle } from '../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../assets/components/CardWithIcon/blueCircle.svg';
import addBtn from '../assets/icons/addBtn.svg';

// child import
import AddStaffMember from '../components/popups/dashboard/AddStaffMember';
import TableComponent from '../components/tables/dashboard/StaffTable';
import api from '../api';

export default function Dashboard() {
  const [openAddStaffMember, setOpenAddStaffMember] = useState(false);
  const [staffCount, setStaffCount] = useState();
  const [clinicianCount, setClinicianCount] = useState();
  const [clinicsCount, setClinicsCount] = useState();
  const [staffMembers, setStaffMembers] = useState([]);

  const getStaffMembers = async () => {
    const { data } = await api('get', '/admins/staffs/');
    if (data) {
      setStaffMembers(data?.users);
      setStaffCount(data?.users.length);
    }
  };
  const getCliniciansLength = async () => {
    const { data } = await api('get', '/admins/therapist/activecount');
    if (data) {
      setClinicianCount(data?.count);
    }
  };
  const getClinicsLength = async () => {
    const { data } = await api('get', '/admins/clinics/count');
    if (data) {
      setClinicsCount(data?.count);
    }
  };

  useEffect(() => {
    getStaffMembers();
    getCliniciansLength();
    getClinicsLength();
  }, []);

  const cardsData = [
    {
      icon: Patients,
      amount: staffCount < 10 ? `0${staffCount}` : staffCount,
      title: 'Total Staff',
      icon2: Circle,
      className: 'yellow_circle',
      link: '/dashboard',
    },
    {
      icon: Clinic,
      amount: clinicsCount < 10 ? `0${clinicsCount}` : clinicsCount,
      title: 'Total Clinics',
      icon2: RedCircle,
      className: 'red_circle',
      link: '/dashboard/staff',
    },
    {
      icon: Clinician,
      amount: clinicianCount < 10 ? `0${clinicianCount}` : clinicianCount,
      title: 'Total Clinicians',
      icon2: GreenCircle,
      className: 'green_circle',
      link: '/dashboard/staff/clinician',
    },
    {
      icon: Patients2,
      amount: '54',
      title: 'Total Patients',
      icon2: BlueCircle,
      className: 'blue_circle',
      link: '/dashboard/staff/clinician/patient',
    },
  ];

  return (
    <div className="dashboard_main_div">
      <div className="navigation">Dashboard &gt; </div>
      <div className="cards_div">
        {cardsData.map((item) => (
          <CardWithIcon
            Icon={item.icon}
            amount={item.amount}
            title={item.title}
            CircleIcon={item.icon2}
            LeftCircleClassName={item.className}
            cardClassName="card_main_div"
            link={item.link}
          />
        ))}
      </div>
      <div className="dashboard_div_2">
        <div className="dashboard_table_div">
          <TableComponent
            setOpenAddStaffMember={setOpenAddStaffMember}
            staffMembers={staffMembers}
            getStaffMembers={getStaffMembers}
          />
        </div>
        <div className="chart_main_div">
          <Chart />
        </div>
        <div className="addBtn2">
          <img
            src={addBtn}
            className="pointer"
            onClick={() => setOpenAddStaffMember(true)}
            role="presentation"
            alt=""
          />
        </div>
      </div>

      <AddStaffMember
        openAddStaffMember={openAddStaffMember}
        setOpenAddStaffMember={setOpenAddStaffMember}
        getStaffMembers={getStaffMembers}
      />
    </div>
  );
}
