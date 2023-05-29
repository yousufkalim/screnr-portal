import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import GenericSidebar from '../../components/sidebar/GenericLeftSidebar';
import PatientSidebar from '../../components/sidebar/patient/PatientSidebar';
import TimeCard from '../../components/cards/TimeCard.Component';
import ActivityTable from '../../components/tables/activityLog/ActivityTable';
import RightSidebar from '../../components/sidebar/patient/PatientListRightSidebar';
import request from '../../request/index';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import { ReactComponent as Clock } from '../../assets/components/TimeCard/clock.svg';
import { ReactComponent as Login } from '../../assets/components/TimeCard/login.svg';
import { ReactComponent as LoginCount } from '../../assets/components/TimeCard/loginCount.svg';
import { ReactComponent as Logoff } from '../../assets/components/TimeCard/logoff.svg';

export default function Activity() {
  const params = useParams();
  const { patientId, clinicianId } = params;
  const [patientData, setPatientData] = useState({});
  const [openEditPatientModal, setOpenEditPatientModal] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState('');
  const [activityLog, setActivityLog] = useState({});

  const cardsData = [
    {
      icon: Login,
      time: activityLog?.lastLogin,
      text: 'Last Login',
    },
    {
      icon: LoginCount,
      time: activityLog?.userSigninCount,
      text: 'Login count',
    },
    {
      icon: Clock,
      time: activityLog?.loginHours,
      text: 'Login Hours',
    },
    {
      icon: Logoff,
      time: activityLog?.lastLogout,
      text: 'Last Logoff',
    },
  ];

  const handleGetPatientData = async () => {
    await request('get', `/clinicians/getPatientDetail/${patientId}`)
      .then((res) => {
        setPatientData(res?.data?.user);
      })
      .catch((error) => {
        console.log('-->', error);
      });
  };

  const handleGetActivityLog = async () => {
    if (window.location.pathname === `/clinicians/${clinicianId}/activity`) {
      await request('get', `/logs/${clinicianId}`)
        .then((res) => {
          setActivityLog(res?.data);
        })
        .catch((error) => {
          console.log('-->', error);
        });
    } else if (window.location.pathname === `/patients/${patientId}/activity/${clinicianId}`) {
      await request('get', `/logs/${patientId}`)
        .then((res) => {
          setActivityLog(res?.data);
        })
        .catch((error) => {
          console.log('-->', error);
        });
    }
  };

  const EditPatientPopup = openEditPatientModal && (
    <EditPatient
      openEditPatient={openEditPatientModal}
      setOpenEditPatient={setOpenEditPatientModal}
      patientDetails={patientData}
      getPatients={handleGetPatientData}
    />
  );

  useEffect(() => {
    if (window.location.pathname === `/patients/${patientId}/activity/${clinicianId}`) {
      handleGetPatientData();
    }
    handleGetActivityLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClinicName = (name) => {
    setBreadcrumb(name);
  };
  return (
    <>
      <Grid container>
        <Grid xl={2} lg={2.5}>
          {window.location.pathname === `/patients/${patientId}/activity/${clinicianId}` ? (
            <PatientSidebar
              patientId={patientId}
              patientData={patientData}
              selectedClinician={clinicianId}
              openEditpatientModal={openEditPatientModal}
              setOpenEditpatientModal={setOpenEditPatientModal}
            />
          ) : (
            <GenericSidebar
              id={clinicianId}
              txt="clinics/getClinician"
              roleTxt="Clinic"
              getClinicName={getClinicName}
            />
          )}
        </Grid>
        <Grid className="bgClinicianTable" xl={7.5} lg={7}>
          <div className="breadCrumb">
            Dashboard &gt; Staff &gt; Lifeline Clinic &gt; Doctor &gt; {breadcrumb} &gt;
          </div>
          <div className="patientScreenCardsDiv">
            <div className="cards_div_patient_pg">
              {cardsData?.map((item) => (
                <TimeCard
                  Icon={item.icon}
                  time={item.time}
                  text={item.text}
                  classname="top_activity_cards"
                />
              ))}
            </div>
          </div>
          <ActivityTable activityLog={activityLog?.logs} />
        </Grid>
        <Grid xl={2.5} lg={2.5}>
          <RightSidebar graph={activityLog?.graph} />
        </Grid>
      </Grid>
      {EditPatientPopup}
    </>
  );
}
