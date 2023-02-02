import { React, useState } from 'react';

// navigator
import { NavLink } from 'react-router-dom';

// mui imports
import Collapse from '@mui/material/Collapse';

// images import;
import { ReactComponent as Msg } from '../../../assets/components/Sidebar/msg.svg';
import { ReactComponent as Survey } from '../../../assets/components/Sidebar/painSurvey.svg';
import { ReactComponent as Exercise } from '../../../assets/components/Sidebar/exercise.svg';
import { ReactComponent as Dropdown } from '../../../assets/components/Sidebar/dropdownEx.svg';
import { ReactComponent as Divider } from '../../../assets/components/Sidebar/divider.svg';
import { ReactComponent as MotionCapture } from '../../../assets/icons/motionCapture.svg';
import { ReactComponent as Program } from '../../../assets/icons/exProgram.svg';
import PatientSidebarSection from './PatientSidebarSection';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);

  function createData(name, action) {
    return { name, action };
  }
  const data = [
    createData('Supine Bridge', 'motionCapture'),
    createData('Bird Dog', 'motionCapture'),
    createData('Cat Camel', 'exerciseProgram'),
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setToggleIcon(!toggleIcon);
  };
  return (
    <div className="left_side">
      <PatientSidebarSection />
      <div className="activityLeft" role="presentation">
        <Exercise
          className={window.location.pathname.split('/')[6] === 'session' ? 'iconActivity' : ''}
        />
        <div className="dropdownIcons">
          <p
            className={
              window.location.pathname.split('/')[6] === 'session'
                ? 'clickedActivity'
                : 'activityTxt'
            }
          >
            Exercise{' '}
          </p>
          {expanded ? (
            <Dropdown
              onClick={handleExpandClick}
              style={{
                cursor: 'pointer',
              }}
              className={window.location.pathname.split('/')[6] === 'session' ? 'divider' : ''}
            />
          ) : (
            <Dropdown
              onClick={handleExpandClick}
              style={{
                transform: 'rotateX(180deg)',
                cursor: 'pointer',
              }}
              className={window.location.pathname.split('/')[6] === 'session' ? 'divider' : ''}
            />
          )}
        </div>
      </div>
      <div className="listDiv">
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className="exerciseList">
            <Divider
              className={window.location.pathname.split('/')[6] === 'session' ? 'divider' : ''}
            />
            <div>
              {data.map((row) => (
                <NavLink
                  key={row.name}
                  to={`/dashboard/staff/clinician/patient/prescription/session/${row.name}`}
                  className={({ isActive }) => (isActive ? 'selectedItemExercise' : 'itemExercise')}
                >
                  <div className="actionDiv" style={{ cursor: 'pointer' }}>
                    {row.action === 'motionCapture' ? (
                      <MotionCapture className="actionListIcon" />
                    ) : (
                      <Program className="actionListIcon" />
                    )}
                    {row.name}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </Collapse>
      </div>

      <NavLink
        to="/dashboard/staff/clinician/patient/prescription/exercise/painSurvey"
        className={({ isActive }) => (isActive ? 'selectedExActivity' : 'activityEx')}
      >
        <Survey className="exIcon" />
        <p className="exTxt">Pain Survey</p>
      </NavLink>

      <NavLink
        to="/dashboard/staff/clinician/patient/prescription/exercise/reports"
        className={({ isActive }) => (isActive ? 'selectedExActivity' : 'activityEx')}
      >
        <Msg className="exIcon" />
        <p className="exTxt">Reports</p>
      </NavLink>
    </div>
  );
}
