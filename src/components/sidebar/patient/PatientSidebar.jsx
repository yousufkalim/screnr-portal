import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// images import
import { ReactComponent as Completed } from '../../../assets/components/Sidebar/Completed.svg';
import { ReactComponent as Activity } from '../../../assets/components/TimeCard/activity.svg';
import { ReactComponent as Msg } from '../../../assets/components/Sidebar/msg.svg';
import PatientSidebarSection from './PatientSidebarSection';

export default function Sidebar() {
  const [activityClicked, setActivityClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="left_side">
      <PatientSidebarSection />
      <div
        className="activityLeft"
        role="presentation"
        onClick={() => {
          navigate('/dashboard/staff/clinician/patient/addPrescription');
          setActivityClicked(true);
        }}
      >
        <Completed
          className={
            activityClicked || window.location.pathname.split('/')[5] === 'addPrescription'
              ? 'iconActivity'
              : ''
          }
        />

        <p
          className={
            activityClicked || window.location.pathname.split('/')[5] === 'addPrescription'
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
          navigate('/dashboard/staff/clinician/patient/messages');
          setActivityClicked(true);
        }}
      >
        <Msg
          className={
            activityClicked || window.location.pathname.split('/')[5] === 'messages'
              ? 'iconActivity'
              : ''
          }
        />

        <p
          className={
            activityClicked || window.location.pathname.split('/')[5] === 'messages'
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
          navigate('/dashboard/staff/clinician/patient/activity');
          setActivityClicked(true);
        }}
      >
        <Activity
          className={
            activityClicked || window.location.pathname.split('/')[5] === 'activity'
              ? 'iconActivity'
              : ''
          }
        />

        <p
          className={
            activityClicked || window.location.pathname.split('/')[5] === 'activity'
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
