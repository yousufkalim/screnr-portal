import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// images import
import { ReactComponent as Completed } from '../../../assets/components/Sidebar/Completed.svg';
import { ReactComponent as Activity } from '../../../assets/components/TimeCard/activity.svg';
import { ReactComponent as Msg } from '../../../assets/components/Sidebar/msg.svg';
import PatientSidebarSection from './PatientSidebarSection';

export default function Sidebar({
  patientId,
  patientData,
  selectedClinician,
  openEditpatientModal,
  setOpenEditpatientModal,
}) {
  const [activityClicked, setActivityClicked] = useState(false);
  const [activityClickedTwo, setActivityClickedTwo] = useState(false);
  const [activityClickedThree, setActivityClickedThree] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Set the activityClicked state based on the current URL path
    const path = window.location.pathname;
    if (path === `/patients/${patientId}/addPrescription/${selectedClinician}`) {
      setActivityClicked(true);
      setActivityClickedTwo(false);
      setActivityClickedThree(false);
    } else if (path === `/patients/${patientId}/messages/${selectedClinician}`) {
      setActivityClickedTwo(true);
      setActivityClicked(false);
      setActivityClickedThree(false);
    } else if (path === `/patients/${patientId}/activity`) {
      setActivityClickedThree(true);
      setActivityClicked(false);
      setActivityClickedTwo(false);
    }
  }, [patientId, selectedClinician]);

  return (
    <div className="left_side">
      <PatientSidebarSection
        patientData={patientData}
        openEditpatientModal={openEditpatientModal}
        setOpenEditpatientModal={setOpenEditpatientModal}
      />
      <div
        className="activityLeft"
        role="presentation"
        onClick={() => {
          setActivityClicked(true);
          setActivityClickedTwo(false);
          setActivityClickedThree(false);
          navigate(`/patients/${patientId}/addPrescription/${selectedClinician}`);
        }}
      >
        <div>
          <Completed
            className={
              activityClicked || window.location.pathname === '/patients/:id/addPrescription'
                ? 'iconActivity'
                : 'notActivity'
            }
          />
        </div>
        <p
          className={
            activityClicked || window.location.pathname === '/patients/:id/addPrescription'
              ? 'clickedActivity'
              : 'activityTxt'
          }
        >
          Prescribe Exercise
        </p>
      </div>
      <div
        className="activityLeft"
        role="presentation"
        onClick={() => {
          navigate(`/patients/${patientId}/messages/${selectedClinician}`);
          setActivityClickedTwo(true);
          setActivityClicked(false);
          setActivityClickedThree(false);
        }}
      >
        <div>
          <Msg
            className={
              activityClickedTwo ||
              window.location.pathname === `/patients/${patientId}/messages/${selectedClinician}`
                ? 'iconActivity'
                : 'notActivity'
            }
          />
        </div>
        <p
          className={
            activityClickedTwo ||
            window.location.pathname === `/patients/${patientId}/messages/${selectedClinician}`
              ? 'clickedActivity'
              : 'activityTxt'
          }
        >
          Message
        </p>
      </div>
      <div
        className="activityLeft"
        role="presentation"
        onClick={() => {
          navigate(`/patients/${patientId}/activity/${selectedClinician}`);
          setActivityClickedThree(true);
          setActivityClicked(false);
          setActivityClickedTwo(false);
        }}
      >
        <div>
          <Activity
            className={
              activityClickedThree ||
              window.location.pathname === `/patients/${patientId}/activity/${selectedClinician}`
                ? 'iconActivity'
                : 'notActivity'
            }
          />
        </div>
        <p
          className={
            activityClickedThree ||
            window.location.pathname === `/patients/${patientId}/activity/${selectedClinician}`
              ? 'clickedActivity'
              : 'activityTxt'
          }
        >
          Activity Log
        </p>
      </div>
      {/* <p className="totalActivity">Total Activity</p> */}
      {/* <p className="hrsTxt">(129 Hrs)</p> */}
    </div>
  );
}
