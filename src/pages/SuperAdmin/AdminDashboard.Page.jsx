/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CardWithIcon from '../../components/cards/InfoCard.Component';
import Chart from '../../components/charts/dashboard/Chart.Component';
import { ReactComponent as Patients } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinic } from '../../assets/components/CardWithIcon/clinicIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as RedCircle } from '../../assets/components/CardWithIcon/redCircle.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/CardWithIcon/blueCircle.svg';
import addBtn from '../../assets/icons/addBtn.svg';
import AddStaffMember from '../../components/popups/dashboard/AddStaff.Popup';
import TableComponent from '../../components/tables/dashboard/StaffTable';
import request from '../../request';

export default function Dashboard() {
  const [openAddStaffMember, setOpenAddStaffMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState({
    staffCount: 0,
    clinicianCount: 0,
    clinicsCount: 0,
    patientsCount: 0,
  });

  const [staffMembers, setStaffMembers] = useState({});
  const [clinicsPerMonth, setClinicsPerMonth] = useState([]);

  const getStaffMembers = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await request('get', `/admins/dashboard?page=${page}`);
      if (data) {
        setStaffMembers(data);
        setCount({
          ...count,
          staffCount: data?.count.staffCount.count,
          clinicianCount: data?.count.clinicianCount.count,
          clinicsCount: data?.count.clinicCount.count,
          patientsCount: data?.count.patientCount.count,
        });
        setClinicsPerMonth(data?.clinicsPerMonth);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getStaffMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsData = [
    {
      icon: Patients,
      amount:
        count.staffCount < 10 && count.staffCount > 0
          ? `0${count.staffCount}`
          : count.staffCount || 0,
      title: 'Total Staff',
      icon2: Circle,
      className: 'yellow_circle',
      link: '/admin/dashboard',
    },
    {
      icon: Clinic,
      amount:
        count.clinicsCount < 10 && count.clinicsCount > 0
          ? `0${count.clinicsCount}`
          : count.clinicsCount || 0,
      title: 'Total Clinics',
      icon2: RedCircle,
      className: 'red_circle',
      link: '/clinics',
    },
    {
      icon: Clinician,
      amount:
        count.clinicianCount < 10 && count.clinicianCount > 0
          ? `0${count.clinicianCount}`
          : count.clinicianCount || 0,
      title: 'Total Clinicians',
      icon2: GreenCircle,
      className: 'green_circle',
      link: '/clinicians',
    },
    {
      icon: Patients2,
      amount:
        count.patientsCount < 10 && count.patientsCount > 0
          ? `0${count.patientsCount}`
          : count.patientsCount || 0,
      title: 'Total Patients',
      icon2: BlueCircle,
      className: 'blue_circle',
      link: '/patients',
    },
  ];

  return (
    <div className="dashboard_main_div">
      {/* <div className="navigation">.</div> */}
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
            loading={isLoading}
            setOpenAddStaffMember={setOpenAddStaffMember}
            staffMembers={staffMembers}
            getStaffMembers={getStaffMembers}
            sx={{ boxShadow: '0' }}
          />
        </div>
        <div className="chart_main_div">
          <Chart clinicsPerMonth={clinicsPerMonth} />
        </div>
      </div>
      <div className="addBtn2" onClick={() => setOpenAddStaffMember(true)}>
        <img src={addBtn} className="pointer" role="presentation" alt="" />
      </div>

      <AddStaffMember
        openAddStaffMember={openAddStaffMember}
        setOpenAddStaffMember={setOpenAddStaffMember}
        getStaffMembers={getStaffMembers}
      />
    </div>
  );
}
