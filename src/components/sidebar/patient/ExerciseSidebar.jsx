/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import { ReactComponent as Msg } from '../../../assets/components/Sidebar/msg.svg';
import { ReactComponent as Survey } from '../../../assets/components/Sidebar/painSurvey.svg';
import { ReactComponent as Exercise } from '../../../assets/components/Sidebar/exercise.svg';
import { ReactComponent as Dropdown } from '../../../assets/components/Sidebar/dropdownEx.svg';
import { ReactComponent as Divider } from '../../../assets/components/Sidebar/divider.svg';
import PatientSidebarSection from './PatientSidebarSection';

export default function Sidebar({ session, patient, prescriptionId }) {
  const [expanded, setExpanded] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setToggleIcon(!toggleIcon);
  };

  return (
    <div className="left_side">
      <PatientSidebarSection patientData={patient} />
      <div className="activityLeft" role="presentation">
        <Exercise className={window.location.pathname.includes('session') ? 'iconActivity' : ''} />
        <div
          className="dropdownIcons"
          onClick={() => {
            handleExpandClick();
          }}
        >
          <p
            className={
              window.location.pathname.includes('session') ? 'clickedActivity' : 'activityTxt'
            }
          >
            Exercise
          </p>
          {expanded ? (
            <Dropdown
              style={{
                cursor: 'pointer',
              }}
              className={window.location.pathname.includes('session') ? 'divider' : ''}
            />
          ) : (
            <Dropdown
              style={{
                transform: 'rotateX(180deg)',
                cursor: 'pointer',
              }}
              className={window.location.pathname.includes('session') ? 'divider' : ''}
            />
          )}
        </div>
      </div>
      <div className="listDiv">
        <Collapse in={expanded} timeout="auto">
          <div className="exerciseList">
            <Divider className={window.location.pathname.includes('session') ? 'divider' : ''} />
            <div>
              {session?.exercises?.map((row) => (
                <NavLink
                  key={row.id}
                  to={`/patients/${session?.id}/exercise/exerciseDetails/${row.id}`}
                  className={({ isActive }) => (isActive ? 'selectedItemExercise' : 'itemExercise')}
                >
                  <div className="actionDiv" style={{ cursor: 'pointer' }}>
                    {row.name}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
      <NavLink
        to={`/patients/${session?.id}/exercise/painSurvey/${prescriptionId}`}
        className={({ isActive }) => (isActive ? 'selectedExActivity' : 'activityEx')}
      >
        <Survey className="exIcon" />
        <p className="exTxt">Pain Survey</p>
      </NavLink>
      <NavLink
        to={`/patients/${session?.id}/exercise/reports`}
        className={({ isActive }) => (isActive ? 'selectedExActivity' : 'activityEx')}
      >
        <Msg className="exIcon" />
        <p className="exTxt">Reports</p>
      </NavLink>
    </div>
  );
}
