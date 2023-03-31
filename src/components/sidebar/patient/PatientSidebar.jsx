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
    } else if (path === '/patients/:id/messages') {
      setActivityClickedTwo(true);
      setActivityClicked(false);
      setActivityClickedThree(false);
    } else if (path === '/patients/:id/activity') {
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
        {console.log('check', activityClicked)}

        <Completed
          className={
            activityClicked || window.location.pathname === '/patients/:id/addPrescription'
              ? 'iconActivity'
              : ''
          }
        />
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
          // navigate('/patients/:id/messages');
          setActivityClickedTwo(true);
          setActivityClicked(false);
          setActivityClickedThree(false);
        }}
      >
        <Msg
          className={
            activityClickedTwo || window.location.pathname === '/patients/:id/messages'
              ? 'iconActivity'
              : ''
          }
        />
        <p
          className={
            activityClickedTwo || window.location.pathname === '/patients/:id/messages'
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
          // navigate('/patients/:id/activity');
          setActivityClickedThree(true);
          setActivityClicked(false);
          setActivityClickedTwo(false);
        }}
      >
        <Activity
          className={
            activityClickedThree || window.location.pathname === '/patients/:id/activity'
              ? 'iconActivity'
              : ''
          }
        />
        <p
          className={
            activityClickedThree || window.location.pathname === '/patients/:id/activity'
              ? 'clickedActivity'
              : 'activityTxt'
          }
        >
          Activity Log
        </p>
      </div>
      <p className="totalActivity">Total Activity</p>
      <p className="hrsTxt">(129 Hrs)</p>
    </div>
  );
}
