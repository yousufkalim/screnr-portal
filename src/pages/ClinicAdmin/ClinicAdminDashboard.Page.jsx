import { React, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as GreenIcon } from '../../assets/components/StatsCard/greenIcon.svg';
import { ReactComponent as GreenStats } from '../../assets/components/StatsCard/greenStats.svg';
import { ReactComponent as YellowIcon } from '../../assets/components/StatsCard/yellowIcon.svg';
import { ReactComponent as YellowStats } from '../../assets/components/StatsCard/yellowStats.svg';
import { ReactComponent as RedIcon } from '../../assets/components/StatsCard/redIcon.svg';
import { ReactComponent as RedStats } from '../../assets/components/StatsCard/redStats.svg';
import { ReactComponent as GrayIcon } from '../../assets/components/StatsCard/grayIcon.svg';
import { ReactComponent as GrayStats } from '../../assets/components/StatsCard/grayStats.svg';
import { ReactComponent as Patients } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle2 } from '../../assets/components/CardWithIcon/blueCircle.svg';
import request from '../../request';
import ClinicianTable from '../../components/tables/clinicAdmin/ClinicianByClinic';
import StatsCard from '../../components/cards/StatsCard.Component';
import AddNewClinician from '../../components/popups/clinician/AddClinician.Popup';
import CardWithIcon from '../../components/cards/InfoCard.Component';
import { Store } from '../../StoreContext';

export default function ClinicAdminDashboard() {
  const { user } = Store();
  const [loading, setLoading] = useState(false);
  const [openAddClinican, setOpenAddClinican] = useState(false);
  const [clinicianByClinic, setClinicianByClinic] = useState({});

  const getClinicians = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request('get', `/clinics/dashboard`);
      if (data) {
        setClinicianByClinic(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  const openAddPatientModal = () => {
    setOpenAddClinican(true);
    getClinicians();
  };

  const cardsData = [
    {
      icon: GreenIcon,
      amount:
        clinicianByClinic?.count?.totalSessions?.count < 10 &&
        clinicianByClinic?.count?.totalSessions?.count > 0
          ? `0${clinicianByClinic?.count?.totalSessions?.count}`
          : clinicianByClinic?.count?.totalSessions?.count || 0,
      title: 'Total no. Exercises',
      icon2: GreenStats,
    },
    {
      icon: YellowIcon,
      amount:
        clinicianByClinic?.count?.uncheckedSession?.count < 10 &&
        clinicianByClinic?.count?.uncheckedSession?.count > 0
          ? `0${clinicianByClinic?.count?.uncheckedSession?.count}`
          : clinicianByClinic?.count?.uncheckedSession?.count || 0,
      title: 'Unchecked Exercises',
      icon2: YellowStats,
    },
    {
      icon: GrayIcon,
      amount:
        clinicianByClinic?.count?.completedSession?.count < 10 &&
        clinicianByClinic?.count?.completedSession?.count > 0
          ? `0${clinicianByClinic?.count?.completedSession?.count}`
          : clinicianByClinic?.count?.completedSession?.count || 0,
      title: 'Completed Exercises',
      icon2: GrayStats,
    },
    {
      icon: RedIcon,
      amount:
        clinicianByClinic?.count?.erroredActivePatient?.count < 10 &&
        clinicianByClinic?.count?.erroredActivePatient?.count > 0
          ? `0${clinicianByClinic?.count?.erroredActivePatient?.count}`
          : clinicianByClinic?.count?.erroredActivePatient?.count || 0,
      title: 'Patients with Errors',
      icon2: RedStats,
    },
  ];

  const cardsData1 = [
    {
      icon: Patients,
      amount:
        clinicianByClinic?.count?.activePatientCount?.count < 10 &&
        clinicianByClinic?.count?.activePatientCount?.count > 0
          ? `0${clinicianByClinic?.count?.activePatientCount?.count}`
          : clinicianByClinic?.count?.activePatientCount?.count || 0,
      title: 'Active Patients',
      icon2: Circle,
      className: 'yellow_circle',
      link: '/clinic/dashboard',
    },
    {
      icon: Clinician,
      amount:
        clinicianByClinic?.count?.clinicianCount?.count < 10 &&
        clinicianByClinic?.count?.clinicianCount?.count > 0
          ? `0${clinicianByClinic?.count?.clinicianCount?.count}`
          : clinicianByClinic?.count?.clinicianCount?.count || 0,
      title: 'Total Clinicians',
      icon2: GreenCircle,
      className: 'green_circle',
      link: '/clinicians',
    },
    {
      icon: Patients2,
      amount:
        clinicianByClinic?.count?.totalPatientCount?.count < 10 &&
        clinicianByClinic?.count?.totalPatientCount?.count > 0
          ? `0${clinicianByClinic?.count?.totalPatientCount?.count}`
          : clinicianByClinic?.count?.totalPatientCount?.count || 0,
      title: 'Total Patients',
      icon2: BlueCircle2,
      className: 'blue_circle',
      link: '/patients',
    },
  ];
  useEffect(() => {
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="clinician_dashboard_main_div">
      <div className="clinician_dashboard_left_div">
        <div className="vertical_patient_info_card_div">
          {cardsData1?.map((item) => (
            <CardWithIcon
              Icon={item.icon}
              amount={item.amount}
              title={item.title}
              CircleIcon={item.icon2}
              LeftCircleClassName={item.className}
              cardClassName="detail_card_main_div"
              link={item.link}
            />
          ))}
        </div>
        <ClinicianTable
          clinicians={clinicianByClinic}
          getClinicians={getClinicians}
          loading={loading}
        />
      </div>
      <div className="clinician_dashboard_right_div">
        <div className="clinician_statsCards_div">
          {cardsData?.map((item) => (
            <StatsCard
              key={item?.title}
              Icon={item?.icon}
              amount={item?.amount}
              title={item?.title}
              BottomStats={item?.icon2}
              statsCardClassName="stats_card_main_div"
            />
          ))}
        </div>
      </div>
      <div className="addBtn2">
        <img
          src={addBtn}
          className="pointer"
          role="presentation"
          alt=""
          onClick={openAddPatientModal}
        />
      </div>
      {openAddClinican && (
        <AddNewClinician
          clinicAdminId={user?.id}
          getClinicians={getClinicians}
          openAddClinican={openAddClinican}
          setOpenAddClinican={setOpenAddClinican}
        />
      )}
    </div>
  );
}
