import { React, useState, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as GreenIcon } from '../../assets/components/StatsCard/greenIcon.svg';
import GreenStats from '../../assets/components/StatsCard/greenStats.svg';
import { ReactComponent as YellowIcon } from '../../assets/components/StatsCard/yellowIcon.svg';
import YellowStats from '../../assets/components/StatsCard/yellowStats.svg';
import { ReactComponent as RedIcon } from '../../assets/components/StatsCard/redIcon.svg';
import RedStats from '../../assets/components/StatsCard/redStats.svg';
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import StatsCard from '../../components/cards/StatsCard.Component';
import PatientTable from '../../components/tables/patient/PatientTable';
import AddNewPatient from '../../components/popups/patient/AddPatient.Popup';
import EditClinician from '../../components/popups/clinician/EditClinician.Popup';
import request from '../../request';
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';

export default function Patient() {
  const { id } = useParams();
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [openEditClinician, setOpenEditClinician] = useState(false);
  const [patients, setPatients] = useState({});
  const [clinician, setClinician] = useState({});
  const [activityLog, setActivityLog] = useState({});
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const getPatients = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await request(
        'get',
        `/clinicians/getPatientsByClinicianId/${id}?page=${page}&&active=${checked}`,
      );
      if (data) {
        setPatients(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const activateUser = (userId) => {
    request('patch', `/staffs/activateClinic/${userId}`)
      .then(() => {
        getPatients();
      })
      .catch((err) => {
        console.log(' ~ file: StaffSpecificClinicAdmin.Page.jsx:58 ~ activateUser ~ err:', err);
      });
  };

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  const getClinicians = async () => {
    try {
      const { data } = await request('get', `/clinics/getClinician/${id}`);
      if (data) {
        setClinician(data?.user);
        await request('get', `/logs/${id}`)
          .then((res) => {
            setActivityLog(res?.data);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const memoizedCardsData = useMemo(
    () => [
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
    ],
    [patients],
  );

  useEffect(() => {
    getPatients();
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div style={{ position: 'fixed' }} className="gridish">
      <div className="gridish_child">
        <div className="sideBar_div">
          <Sidebar
            id={id}
            roleTxt="Clinic"
            open={openEditClinician}
            setOpen={setOpenEditClinician}
            activityLog={activityLog}
            userData={clinician}
          />
        </div>

        <Grid sx={{ width: '80%' }} className="bgClinicianTable" xl={7.5} lg={7}>
          <Breadcrumbs ClinicName={`${clinician?.first_name} ${clinician?.last_name}`} />

          <div className="patientScreenCardsDiv">
            <div style={{ marginBottom: '3%' }} className="cards_div_patient_pg">
              {memoizedCardsData?.map((item) => (
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
            checked={checked}
            loading={loading}
            getPatients={getPatients}
            activateUser={activateUser}
            handleChangeCheck={handleChangeCheck}
            setOpenAddPatient={setOpenAddPatient}
          />
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
            info={clinician}
          />
        )}
      </div>

      <EditClinician
        openEditClinican={openEditClinician}
        setOpenEditClinican={setOpenEditClinician}
        clinicianDetails={clinician}
        getClinicians={getClinicians}
      />
    </div>
  );
}
