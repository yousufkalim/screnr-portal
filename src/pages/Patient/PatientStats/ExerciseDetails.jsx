import React from 'react';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import ExcerciseChart from './ExcerciseChart';
import ReportCard from '../../../components/cards/ReportCard.Component';
import MultiCircularProgress from './OverallExcerciseScore';
import { ReactComponent as TitleExcerciseIcon } from '../../../assets/icons/titleExcerciseIcon.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import { ReactComponent as LeftArrow } from '../../../assets/icons/ArrowIcon1.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/ArrowIcon2.svg';
import { ReactComponent as RedDot } from '../../../assets/icons/sessionGraphColorDot1.svg';
import { ReactComponent as GreenDot } from '../../../assets/icons/sessionGraphColorDot2.svg';
import { ReactComponent as YellowDot } from '../../../assets/icons/sessionGraphColorDot3.svg';

function ExerciseDetails({ session, exercise }) {
  return (
    <div className="bg_main_div_sessions" style={{ height: '85rem', background: '#F6FAFB' }}>
      <div className="breadCrumb">
        Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
        Session &gt;
      </div>
      <div className="bgAddPrescriptionSessions">
        <div className="SessionsHeading">
          <div className="leftside_title">
            <div className="backIcon_button">
              <BackIcon className="arrows" />
            </div>
            <div className="dateTitle">
              <p>Session Date</p>
            </div>
            <div className="dateExcercise">
              <p>{moment(session?.date).format('DD/MM/YYYY')}</p>
            </div>
          </div>
          <div className="excerciseDay">
            <p>{session?.name}</p>
          </div>
        </div>

        <div className="excercise_name_heading">
          <div className="excerciseNameIcon">
            <TitleExcerciseIcon />
          </div>
          <p className="excercise_name_p">{exercise?.name}</p>
        </div>
        <div className="excercise_details">
          <div className="setNumber">
            <div className="text_rep_set">
              <p>set Number</p>
            </div>
            <div className="set_rep_valueNumber">
              <LeftArrow className="arrows" />
              <p>{exercise?.sets}</p>
              <RightArrow className="arrows" />
            </div>
          </div>
          <div className="setNumber">
            <div className="text_rep_set">
              <p>Rep number</p>
            </div>
            <div className="set_rep_valueNumber">
              <LeftArrow className="arrows" /> <p>{exercise?.reps}</p>
              <RightArrow className="arrows" />
            </div>
          </div>
        </div>
        <div className="jointScoreHeading">
          <p>Joint Score (Lateral View)</p>
        </div>
        <div className="jointScoreOuterDiv">
          <div className="score_Bar1">
            <div className="overallScoreGraph">
              <div className="overAll_Arrows">
                <LeftArrow className="arrows" />
                <p className="excercises_names">Overall</p>
                <RightArrow className="arrows" />
              </div>
              <MultiCircularProgress />
              <div className="graphData">
                <p className="excercise_percent">00</p> <p className="scoreText">Score</p>
              </div>
              <div className="colorDotsDiv2">
                <div className="colorDots">
                  <RedDot /> <p className="colortxt">Low</p>
                </div>
                <div className="colorDots">
                  <GreenDot />
                  <p className="colortxt">Medium</p>
                </div>
                <div className="colorDots">
                  <YellowDot />
                  <p className="colortxt">High</p>
                </div>
              </div>
            </div>
          </div>
          <div className="score_Bars">
            <p className="excercises_names">Super Arm</p>{' '}
            <div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={0}
                size={60}
                sx={{ color: '#FABB18' }}
              />
              <div className="graphData">
                <p className="excercise_percent">00</p> <p className="scoreText">Score</p>
              </div>
            </div>
          </div>
          <div className="score_Bars">
            <p className="excercises_names">Thigh Angle</p>{' '}
            <div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={0}
                size={60}
                sx={{ color: '#FF5151' }}
              />
              <div className="graphData">
                <p className="excercise_percent">0</p> <p className="scoreText">Score</p>
              </div>
            </div>
          </div>
          <div className="score_Bars">
            <div>
              <p className="excercises_names">Spine Angle</p>{' '}
            </div>
            <div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={0}
                size={60}
                sx={{ color: '#25CC7C' }}
              />
              <div className="graphData">
                <p className="excercise_percent">0</p> <p className="scoreText">Score</p>
              </div>
            </div>
          </div>
          <div className="score_Bars">
            <p className="excercises_names">Ankle Flexion</p>{' '}
            <div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={0}
                size={60}
                sx={{ color: '#FABB18' }}
              />
              <div className="graphData">
                <p className="excercise_percent">0</p> <p className="scoreText">Score</p>
              </div>
            </div>
          </div>
          <div className="score_Bars">
            <p className="excercises_names">Shin Angle</p>{' '}
            <div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={0}
                size={60}
                sx={{ color: '#FF5151' }}
              />
              <div className="graphData">
                <p className="excercise_percent">0</p> <p className="scoreText">Score</p>
              </div>
            </div>
          </div>
          <div className="score_Bars">
            <p className="excercises_names">Upper Arm</p>{' '}
            <div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={0}
                size={60}
                sx={{ color: '#25CC7C' }}
              />
              <div className="graphData">
                <p className="excercise_percent">0</p> <p className="scoreText">Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="performanceGraphDiv">
        <div className="performanceName_colors" style={{ display: 'flex' }}>
          <div className="performanceTitle">
            <p>Performance Graph</p>
          </div>
          <div className="colorDotsDiv">
            <div className="colorDots">
              <GreenDot />
              <p className="colortxt">Low</p>
            </div>
            <div className="colorDots">
              <YellowDot />
              <p className="colortxt">Medium</p>
            </div>
            <div className="colorDots">
              <RedDot />
              <p className="colortxt">High</p>
            </div>
          </div>
        </div>
        <div style={{ width: '90%', height: '80%', marginLeft: '3%' }}>
          <ExcerciseChart />
        </div>
      </div>
      <div
        className="reportCardMsgDiv"
        style={{
          marginTop: '45px',
          width: '74vw',
          marginLeft: '30px',
          marginBottom: '40px',
        }}
      >
        <ReportCard title="Comments" />
      </div>
    </div>
  );
}

export default ExerciseDetails;
