import { React, useState } from 'react';

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
  const navigate = useNavigate();

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
          navigate(`/patients/${patientId}/addPrescription/${selectedClinician}`);
          setActivityClicked(true);
        }}
      >
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
          setActivityClicked(true);
        }}
      >
        <Msg
          className={
            activityClicked || window.location.pathname === '/patients/:id/messages'
              ? 'iconActivity'
              : ''
          }
        />
        <p
          className={
            activityClicked || window.location.pathname === '/patients/:id/messages'
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
          setActivityClicked(true);
        }}
      >
        <Activity
          className={
            activityClicked || window.location.pathname === '/patients/:id/activity'
              ? 'iconActivity'
              : ''
          }
        />
        <p
          className={
            activityClicked || window.location.pathname === '/patients/:id/activity'
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
