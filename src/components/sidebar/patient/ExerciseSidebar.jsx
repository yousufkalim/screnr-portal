/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { ReactComponent as Msg } from '../../../assets/components/Sidebar/msg.svg';
import { ReactComponent as Survey } from '../../../assets/components/Sidebar/painSurvey.svg';
import { ReactComponent as Exercise } from '../../../assets/components/Sidebar/exercise.svg';
import { ReactComponent as Dropdown } from '../../../assets/components/Sidebar/dropdownEx.svg';
import { ReactComponent as Divider } from '../../../assets/components/Sidebar/divider.svg';
import PatientSidebarSection from './PatientSidebarSection';

export default function Sidebar({
  session,
  patient,
  setActiveTab,
  activeTab,
  handleGetExerciseById,
}) {
  const [expanded, setExpanded] = useState(true);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setToggleIcon(!toggleIcon);
  };
  const handleActiveTab = (targetTab) => {
    setActiveTab(targetTab);
  };

  return (
    <div className="left_side">
      <PatientSidebarSection patientData={patient} />
      <div className="activityLeft" role="presentation">
        <Exercise className={expanded ? 'iconActivity' : ''} />
        <div
          className="dropdownIcons"
          onClick={() => {
            handleExpandClick();
          }}
        >
          <p className={expanded ? 'clickedActivity' : 'activityTxt'}>Exercise</p>
          {expanded ? (
            <Dropdown
              style={{
                cursor: 'pointer',
              }}
              className={expanded ? 'divider' : ''}
            />
          ) : (
            <Dropdown
              style={{
                transform: 'rotateX(180deg)',
                cursor: 'pointer',
              }}
              className={expanded ? 'divider' : ''}
            />
          )}
        </div>
      </div>
      <div className="listDiv">
        <Collapse in={expanded} timeout="auto">
          <div className="exerciseList">
            <Divider className={window.location.pathname.includes('session') ? 'divider' : ''} />
            <div>
              {session?.exercises?.map((exercise) => (
                <div
                  className={exercise.name === activeItem ? 'selectedItemExercise' : 'itemExercise'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleGetExerciseById(exercise?.id);
                    handleActiveTab('exercise');
                    setActiveItem(exercise.name);
                  }}
                >
                  {exercise.name}
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
      <div
        onClick={() => handleActiveTab('Pain Survey')}
        className={activeTab === 'Pain Survey' ? 'selectedExActivity' : 'activityEx'}
      >
        <Survey className="exIcon" />
        <p className="exTxt">Pain Survey</p>
      </div>
      <div
        onClick={() => handleActiveTab('Reports')}
        className={activeTab === 'Reports' ? 'selectedExActivity' : 'activityEx'}
      >
        <Msg className="exIcon" />
        <p className="exTxt">Reports</p>
      </div>
    </div>
  );
}
