import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as GreenIcon } from '../../assets/components/StatsCard/greenIcon.svg';
import { ReactComponent as GreenStats } from '../../assets/components/StatsCard/greenStats.svg';
import { ReactComponent as YellowIcon } from '../../assets/components/StatsCard/yellowIcon.svg';
import { ReactComponent as YellowStats } from '../../assets/components/StatsCard/yellowStats.svg';
import { ReactComponent as RedIcon } from '../../assets/components/StatsCard/redIcon.svg';
import { ReactComponent as RedStats } from '../../assets/components/StatsCard/redStats.svg';
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import StatsCard from '../../components/cards/StatsCard';
import PatientTable from '../../components/tables/patient/PatientTable';
import AddNewPatient from '../../components/popups/patient/AddNewPatient';
import RightSidebar from '../../components/sidebar/patient/PatientListRightSidebar';
import api from '../../api';

export default function Patient() {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patients, setPatients] = useState({});
  const [breadcrumb, setBreadcrumb] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const getPatients = async (page = 1) => {
    const { data } = await api(
      'get',
      `/admins/patients/getPatientsByClinicianId/${id}?page=${page}`,
    );
    if (data) {
      setPatients(data);
    }
  };

  const getClinicName = (name) => {
    setBreadcrumb(name);
  };
  const handleDashboardNavClick = () => {
    navigate('/dashboard');
  };
  const handleStaffNavClick = () => {
    window.history.back();
    window.history.back();
  };
  const handleClinicNavClick = () => {
    window.history.back();
  };

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsData = [
    {
      icon: GreenIcon,
      amount: patients?.count?.completedSession?.count || 0,
      title: 'Completed Exercises',
      icon2: GreenStats,
    },
    {
      icon: RedIcon,
      amount: patients?.count?.erroredActivePatient?.count || 0,
      title: 'Patients with Errors',
      icon2: RedStats,
    },
    {
      icon: YellowIcon,
      amount: patients?.count?.uncheckedSession?.count || 0,
      title: 'Unchecked Exercises',
      icon2: YellowStats,
    },
  ];

  return (
    <div className="main_div" style={{ background: 'rgb(246, 250, 251)', height: '100vh' }}>
      <Grid container>
        <Grid xl={2} lg={2.5}>
          <Sidebar id={id} txt="admins/clinicians" roleTxt="Clinic" getClinicName={getClinicName} />
        </Grid>

        <Grid className="bgClinicianTable" xl={7.5} lg={7}>
          <div className="breadCrumb" style={{ display: 'flex' }}>
            <div
              className="navigationEntities"
              onClick={handleDashboardNavClick}
              aria-hidden="true"
            >
              Dashboard &gt;
            </div>
            <div className="navigationEntities" onClick={handleStaffNavClick} aria-hidden="true">
              Staff &gt;
            </div>
            <div className="navigationEntities" onClick={handleClinicNavClick} aria-hidden="true">
              {breadcrumb} &gt;
            </div>
            <div> Doctor &gt;</div>
          </div>
          <div className="patientScreenCardsDiv">
            <div className="cards_div_patient_pg">
              {cardsData.map((item) => (
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

          <PatientTable
            patients={patients}
            setOpenAddPatient={setOpenAddPatient}
            getPatients={getPatients}
          />
        </Grid>
        <Grid xl={2.5} lg={2.5}>
          <RightSidebar />
        </Grid>
        <div className="addBtn">
          <img
            src={addBtn}
            className="pointer"
            onClick={() => setOpenAddPatient(true)}
            role="presentation"
            alt=""
          />
        </div>
        {openAddPatient && (
          <AddNewPatient
            getPatients={getPatients}
            openAddPatient={openAddPatient}
            setOpenAddPatient={setOpenAddPatient}
          />
        )}
      </Grid>
    </div>
  );
}
