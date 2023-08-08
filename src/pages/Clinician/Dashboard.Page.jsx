import { React, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as YellowCircle } from '../../assets/components/patientDetailCards/yellowCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/patientDetailCards/blueCircle.svg';
import { ReactComponent as ActivePatients } from '../../assets/components/patientDetailCards/activePatients.svg';
import { ReactComponent as TotalPatients } from '../../assets/components/patientDetailCards/totalPatients.svg';
import { ReactComponent as GreenIcon } from '../../assets/components/StatsCard/greenIcon.svg';
import GreenStats from '../../assets/components/StatsCard/greenStats.svg';
import { ReactComponent as YellowIcon } from '../../assets/components/StatsCard/yellowIcon.svg';
import YellowStats from '../../assets/components/StatsCard/yellowStats.svg';
import { ReactComponent as RedIcon } from '../../assets/components/StatsCard/redIcon.svg';
import RedStats from '../../assets/components/StatsCard/redStats.svg';
import { ReactComponent as GrayIcon } from '../../assets/components/StatsCard/grayIcon.svg';
import GrayStats from '../../assets/components/StatsCard/grayStats.svg';
import request from '../../request';
import PatientsTable from '../../components/tables/clinician/PatientsByCliniciansTable';
import StatsCard from '../../components/cards/StatsCard.Component';
import AddNewPatient from '../../components/popups/patient/AddPatient.Popup';

export default function ClinicianDashboard() {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientsByClinician, setPatientsByClinician] = useState({});
  const [loading, setLoading] = useState(false);
  // const openAddPatientModal = () => setOpenAddPatient(true);

  const getPatients = async () => {
    try {
      setLoading(true);

      const { data } = await request('get', '/clinicians/dashboard');
      if (data) {
        setPatientsByClinician(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const cardsData = [
    {
      icon: GreenIcon,
      amount: patientsByClinician?.count?.totalSession?.count || 0,
      title: 'Total no.  Exercises',
      icon2: GreenStats,
    },
    {
      icon: YellowIcon,
      amount: patientsByClinician?.count?.uncheckedSession?.count || 0,
      title: 'Unchecked Exercises',
      icon2: YellowStats,
    },
    {
      icon: GrayIcon,
      amount: patientsByClinician?.count?.completedSession?.count || 0,
      title: 'Completed Exercises',
      icon2: GrayStats,
    },

    {
      icon: RedIcon,
      amount: patientsByClinician?.count?.erroredActivePatient?.count || 0,
      title: 'Patients with Errors',
      icon2: RedStats,
    },
  ];

  const addNewPatientPopup = openAddPatient && (
    <AddNewPatient
      getPatients={getPatients}
      openAddPatient={openAddPatient}
      setOpenAddPatient={setOpenAddPatient}
    />
  );

  useEffect(() => {
    getPatients();
  }, [openAddPatient]);

  return (
    <div className="clinician_dashboard_main_div">
      <div className="clinician_dashboard_left_div">
        <div className="vertical_patient_info_card_div">
          <div className="vertical_patient_info_card">
            <div style={{ marginLeft: '4%', display: 'flex', gap: '1rem' }}>
              <ActivePatients />
              <div className="active_patients_details_div">
                <span className="total_active_patients">
                  {patientsByClinician?.count?.activePatient?.count || 0}
                </span>
                <span className="active_patients_title">Active Patients</span>
              </div>
            </div>
            <YellowCircle className="stats_circle" style={{ color: 'rgba(250, 187, 24, 0.12)' }} />
          </div>
          <div className="vertical_patient_info_card">
            <div style={{ marginLeft: '4%', display: 'flex', gap: '1rem' }}>
              <TotalPatients />
              <div className="active_patients_details_div">
                <span className="total_active_patients">
                  {patientsByClinician?.count?.totalPatient?.count || 0}
                </span>
                <span className="active_patients_title">Total Patients</span>
              </div>
            </div>
            <BlueCircle className="stats_circle" style={{ color: 'rgba(13, 170, 220, 0.12)' }} />
          </div>
        </div>
        <PatientsTable
          patients={patientsByClinician}
          getPatients={getPatients}
          loading={loading}
          setLoading={setLoading}
          openAddPatient={openAddPatient}
          setOpenAddPatient={setOpenAddPatient}
        />
      </div>
      <div className="clinician_dashboard_right_div">
        <div className="clinician_statsCards_div">
          {cardsData.map((item) => (
            <StatsCard
              key={item?.title}
              Icon={item?.icon}
              amount={item?.amount}
              title={item?.title}
              BottomStats={item?.icon2}
              statsCardClassName="stats_card_main_div2"
            />
          ))}
        </div>
      </div>
      {/* <div className="addBtn2">
        <img
          src={addBtn}
          className="pointer"
          role="presentation"
          alt=""
          onClick={openAddPatientModal}
        />
      </div> */}
      {addNewPatientPopup}
    </div>
  );
}
