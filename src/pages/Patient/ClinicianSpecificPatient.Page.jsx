import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as GreenIcon } from '../../assets/components/StatsCard/greenIcon.svg';
import { ReactComponent as GreenStats } from '../../assets/components/StatsCard/greenStats.svg';
import { ReactComponent as YellowIcon } from '../../assets/components/StatsCard/yellowIcon.svg';
import { ReactComponent as YellowStats } from '../../assets/components/StatsCard/yellowStats.svg';
import { ReactComponent as RedIcon } from '../../assets/components/StatsCard/redIcon.svg';
import { ReactComponent as RedStats } from '../../assets/components/StatsCard/redStats.svg';
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import StatsCard from '../../components/cards/StatsCard.Component';
import PatientTable from '../../components/tables/patient/PatientTable';
import AddNewPatient from '../../components/popups/patient/AddPatient.Popup';
import EditClinician from '../../components/popups/clinician/EditClinician.Popup';
import RightSidebar from '../../components/sidebar/patient/PatientListRightSidebar';
import request from '../../request';

export default function Patient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [openEditClinician, setOpenEditClinician] = useState(false);
  const [patients, setPatients] = useState({});
  const [breadcrumb, setBreadcrumb] = useState('');
  const [clinician, setClinician] = useState({});

  const getClinicName = (name) => setBreadcrumb(name);
  const handleDashboardNavClick = () => navigate('/admin/dashboard');
  const handleStaffNavClick = () => window.history.back();
  const handleClinicNavClick = () => window.history.back();

  const getPatients = async (page = 1) => {
    try {
      const { data } = await request(
        'get',
        `/clinicians/getPatientsByClinicianId/${id}?page=${page}`,
      );
      if (data) {
        setPatients(data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getClinicians = async () => {
    try {
      const { data } = await request('get', `/clinics/getClinician/${id}`);
      if (data) {
        setClinician(data?.user);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

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

  useEffect(() => {
    getPatients();
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main_div" style={{ background: 'rgb(246, 250, 251)', height: '100vh' }}>
      <Grid container>
        <Grid xl={2} lg={2.5}>
          <Sidebar
            id={id}
            txt="clinics/getClinician"
            roleTxt="Clinic"
            getClinicName={getClinicName}
            open={openEditClinician}
            setOpen={setOpenEditClinician}
          />
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

      <EditClinician
        openEditClinican={openEditClinician}
        setOpenEditClinican={setOpenEditClinician}
        clinicianDetails={clinician}
        getClinicians={getClinicians}
      />
    </div>
  );
}
