import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericSidebar from '../../components/sidebar/GenericLeftSidebar';
import PatientSidebar from '../../components/sidebar/patient/PatientSidebar';
import TimeCard from '../../components/cards/TimeCard.Component';
import ActivityTable from '../../components/tables/activityLog/ActivityTable';
import EditClinician from '../../components/popups/clinician/EditClinician.Popup';
import RightSidebar from '../../components/sidebar/patient/PatientListRightSidebar';
import request from '../../request/index';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import { ReactComponent as Clock } from '../../assets/components/TimeCard/clock.svg';
import { ReactComponent as Login } from '../../assets/components/TimeCard/login.svg';
import { ReactComponent as LoginCount } from '../../assets/components/TimeCard/loginCount.svg';
import { ReactComponent as Logoff } from '../../assets/components/TimeCard/logoff.svg';
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';

export default function Activity() {
  const params = useParams();
  const { patientId, clinicianId } = params;
  const [patientData, setPatientData] = useState({});
  const [openEditPatientModal, setOpenEditPatientModal] = useState(false);
  const [openEditClinicianModal, setOpenEditClinicianModal] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState('');
  const [activityLog, setActivityLog] = useState({});
  const [clinician, setClinician] = useState({});

  const memoizedCardsData = useMemo(
    () => [
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
    ],
    [activityLog],
  );

  const handleGetPatientData = async () => {
    await request('get', `/clinicians/getPatientDetail/${patientId}`)
      .then((res) => {
        setPatientData(res?.data?.user);
        setBreadcrumb(`${res?.data?.user?.first_name} ${res?.data?.user?.last_name}`);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  // const handleGetClinicianData = async () => {
  //   await request('get', `/clinics/getClinician/${information?.id}`)
  //     .then((res) => {
  //       setInformation(res?.data?.user);
  //     })
  //     .catch((error) => {
  //       toast.error(error?.response?.data?.message);
  //     });
  // };
  const handleGetActivityLog = async () => {
    if (window.location.pathname === `/clinicians/${clinicianId}/activity`) {
      await request('get', `/logs/${clinicianId}`)
        .then((res) => {
          setActivityLog(res?.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else if (window.location.pathname === `/patients/${patientId}/activity/${clinicianId}`) {
      await request('get', `/logs/${patientId}`)
        .then((res) => {
          setActivityLog(res?.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  const getClinicians = async () => {
    try {
      const { data } = await request('get', `/clinics/getClinician/${clinicianId}`);
      if (data) {
        setClinician(data?.user);
        setBreadcrumb(`${data?.user?.first_name} ${data?.user?.last_name}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
  const EditClinicianPopup = openEditClinicianModal && (
    <EditClinician
      clinicianDetails={clinician}
      openEditClinican={openEditClinicianModal}
      setOpenEditClinican={setOpenEditClinicianModal}
      getClinicians={getClinicians}
    />
  );
  useEffect(() => {
    if (window.location.pathname === `/patients/${patientId}/activity/${clinicianId}`) {
      handleGetPatientData();
    }
    handleGetActivityLog();
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ position: 'fixed' }} className="gridish">
        <div className="sideBar_div">
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
              roleTxt="Clinic"
              setOpen={setOpenEditClinicianModal}
              open={openEditClinicianModal}
              userData={clinician}
            />
          )}
        </div>
        <div className="bgClinicianTable">
          <Breadcrumbs ClinicName={breadcrumb} />
          {/* <div className="breadCrumb">
            Dashboard &gt; Staff &gt; Lifeline Clinic &gt; Doctor &gt; {breadcrumb} &gt;
          </div> */}
          <div className="patientScreenCardsDiv">
            <div className="cards_div_patient_pg">
              {memoizedCardsData?.map((item) => (
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
        </div>
        <div className="rightSide_div">
          <RightSidebar logs={activityLog} />
        </div>
      </div>
      {EditPatientPopup}
      {EditClinicianPopup}
    </>
  );
}
