import { React, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as Patients } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle2 } from '../../assets/components/CardWithIcon/blueCircle.svg';
import { ReactComponent as RedCircle } from '../../assets/components/CardWithIcon/redCircle.svg';
import { ReactComponent as Clinic } from '../../assets/components/CardWithIcon/clinicIcon.svg';
import ClinicAdminTable from '../../components/tables/staff/clinicAdminsForStaffTable';
import AddNewClinicAdmin from '../../components/popups/clinicAdmin/AddClinicAdmin.Popup';
import CardWithIcon from '../../components/cards/InfoCard.Component';
import addBtn from '../../assets/icons/addBtn.svg';
import { Store } from '../../StoreContext';
import request from '../../request';

export default function Dashboard() {
  const { user } = Store();
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);
  const [clinicAdmins, setClinicAdmins] = useState({});
  const [loading, setLoading] = useState(false);

  const getClinicAdmins = async () => {
    try {
      setLoading(true);
      const { data } = await request('get', `/staff/dashboard`);
      if (data) {
        setClinicAdmins(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const openAddPatientModal = () => {
    setOpenAddClinicAdmin(true);
  };

  useEffect(() => {
    getClinicAdmins();
  }, [openAddClinicAdmin]);

  const cardsData = [
    {
      icon: Clinic,
      amount:
        clinicAdmins?.count?.totalClinic?.count < 10 && clinicAdmins?.count?.totalClinic?.count > 0
          ? `0${clinicAdmins?.count?.totalClinic?.count}`
          : clinicAdmins?.count?.totalClinic?.count || 0,
      title: 'Total Clinics',
      icon2: RedCircle,
      className: 'red_circle',
      link: '/clinics',
    },
    {
      icon: Clinician,
      amount:
        clinicAdmins?.count?.totalClinician?.count < 10 &&
        clinicAdmins?.count?.totalClinician?.count > 0
          ? `0${clinicAdmins?.count?.totalClinician?.count}`
          : clinicAdmins?.count?.totalClinician?.count || 0,
      title: 'Total Clinicians',
      icon2: GreenCircle,
      className: 'green_circle',
      link: '/clinicians',
    },
    {
      icon: Patients2,
      amount:
        clinicAdmins?.count?.totalPatient?.count < 10 &&
        clinicAdmins?.count?.totalPatient?.count > 0
          ? `0${clinicAdmins?.count?.totalPatient?.count}`
          : clinicAdmins?.count?.totalPatient?.count || 0,
      title: 'Total Patients',
      icon2: BlueCircle2,
      className: 'blue_circle',
      link: '/patients',
    },
    {
      icon: Patients,
      amount:
        clinicAdmins?.count?.activePatient?.count < 10 &&
        clinicAdmins?.count?.activePatient?.count > 0
          ? `0${clinicAdmins?.count?.activePatient?.count}`
          : clinicAdmins?.count?.activePatient?.count || 0,
      title: 'Active Patients',
      icon2: Circle,
      className: 'yellow_circle',
      link: '/staff/dashboard',
    },
  ];

  return (
    <div className="clinician_dashboard_main_div">
      <div className="staff_dashboard_div">
        <div className="vertical_patient_info_card_div">
          {cardsData?.map((item) => (
            <CardWithIcon
              Icon={item.icon}
              amount={item.amount}
              title={item.title}
              CircleIcon={item.icon2}
              LeftCircleClassName={item.className}
              cardClassName="detail_card_staff_dashboard"
              link={item.link}
            />
          ))}
        </div>
        <ClinicAdminTable
          clinicAdmins={clinicAdmins}
          getClinicAdmins={getClinicAdmins}
          loading={loading}
        />
      </div>
      <div className="addBtn2">
        <img
          src={addBtn}
          className="pointer"
          role="presentation"
          onClick={openAddPatientModal}
          alt=""
        />
      </div>
      {openAddClinicAdmin && (
        <AddNewClinicAdmin
          staffAdminId={user?.id}
          getClinicAdmins={getClinicAdmins}
          openAddClinicAdmin={openAddClinicAdmin}
          setOpenAddClinicAdmin={setOpenAddClinicAdmin}
        />
      )}
    </div>
  );
}
