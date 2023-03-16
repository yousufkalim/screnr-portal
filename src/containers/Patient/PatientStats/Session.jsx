/* eslint-disable import/extensions */
import { React } from 'react';
// import MessageBox from
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import { ReactComponent as TitleExcerciseIcon } from '../../../assets/icons/titleExcerciseIcon.svg';
import ExcerciseChart from './ExcerciseChart';
import ExcerciseSideBar from '../../../components/sidebar/patient/ExerciseSidebar';
import ReportCard from '../../../components/cards/PatientReportCard';
import MultiCircularProgress from './OverallExcerciseScore.jsx';
import { ReactComponent as LeftArrow } from '../../../assets/icons/ArrowIcon1.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/ArrowIcon2.svg';
import { ReactComponent as RedDot } from '../../../assets/icons/sessionGraphColorDot1.svg';
import { ReactComponent as GreenDot } from '../../../assets/icons/sessionGraphColorDot2.svg';
import { ReactComponent as YellowDot } from '../../../assets/icons/sessionGraphColorDot3.svg';

// mui imports

export default function Session() {
  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <div className="sideBar_nadded">
          <ExcerciseSideBar />
        </div>
      </Grid>
      <Grid className="bgMsg" xl={10} lg={9.5}>
        <div className="bg_main_div_sessions" style={{ height: '85rem', background: '#F6FAFB' }}>
          <div className="breadCrumb">
            Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription
            &gt; Session &gt;
          </div>
          <div className="bgAddPrescription">
            <div className="SessionsHeading">
              <div className="leftside_title">
                <div className="backIcon_button">
                  <BackIcon />
                </div>
                <div className="dateTitle">
                  <p>Session Date</p>
                </div>
                <div className="dateExcercise">
                  <p>01/05/2022</p>
                </div>
              </div>
              <div className="excerciseDay">
                <p>Monday Excercise</p>
              </div>
            </div>

            <div className="excercise_name_heading">
              <div className="excerciseNameIcon">
                <TitleExcerciseIcon />
              </div>{' '}
              <p className="excercise_name_p">Supine Bridge</p>
            </div>
            <div className="excercise_details">
              <div className="setNumber">
                <div className="text_rep_set">
                  <p>set Number</p>
                </div>
                <div className="set_rep_valueNumber">
                  <LeftArrow /> <p> 04 </p>
                  <RightArrow />
                </div>
              </div>
              <div className="setNumber">
                <div className="text_rep_set">
                  <p>Rep number</p>
                </div>
                <div className="set_rep_valueNumber">
                  <LeftArrow /> <p> 12 </p>
                  <RightArrow />
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
                    <LeftArrow />
                    <p className="excercises_names">Overall</p>
                    <RightArrow />
                  </div>

                  <MultiCircularProgress />
                  <div className="graphData">
                    <p className="excercise_percent">88</p> <p className="scoreText">Score</p>
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
                    value="77"
                    size={60}
                    sx={{ color: '#FABB18' }}
                  />
                  <div className="graphData">
                    <p className="excercise_percent">77</p> <p className="scoreText">Score</p>
                  </div>
                </div>
              </div>
              <div className="score_Bars">
                <p className="excercises_names">Thigh Angle</p>{' '}
                <div>
                  <CircularProgress
                    variant="determinate"
                    thickness="8"
                    value="45"
                    size={60}
                    sx={{ color: '#FF5151' }}
                  />
                  <div className="graphData">
                    <p className="excercise_percent">45</p> <p className="scoreText">Score</p>
                  </div>
                </div>
              </div>
              <div className="score_Bars">
                <div>
                  {' '}
                  <p className="excercises_names">Spine Angle</p>{' '}
                </div>
                <div>
                  <CircularProgress
                    variant="determinate"
                    thickness="8"
                    value="55"
                    size={60}
                    sx={{ color: '#25CC7C' }}
                  />
                  <div className="graphData">
                    <p className="excercise_percent">55</p> <p className="scoreText">Score</p>
                  </div>
                </div>
              </div>
              <div className="score_Bars">
                <p className="excercises_names">Ankle Flexion</p>{' '}
                <div>
                  <CircularProgress
                    variant="determinate"
                    thickness="8"
                    value="65"
                    size={60}
                    sx={{ color: '#FABB18' }}
                  />
                  <div className="graphData">
                    <p className="excercise_percent">65</p> <p className="scoreText">Score</p>
                  </div>
                </div>
              </div>
              <div className="score_Bars">
                <p className="excercises_names">Shin Angle</p>{' '}
                <div>
                  <CircularProgress
                    variant="determinate"
                    thickness="8"
                    value="25"
                    size={60}
                    sx={{ color: '#FF5151' }}
                  />
                  <div className="graphData">
                    <p className="excercise_percent">25</p> <p className="scoreText">Score</p>
                  </div>
                </div>
              </div>
              <div className="score_Bars">
                <p className="excercises_names">Upper Arm</p>{' '}
                <div>
                  <CircularProgress
                    variant="determinate"
                    thickness="8"
                    value="60"
                    size={60}
                    sx={{ color: '#25CC7C' }}
                  />
                  <div className="graphData">
                    <p className="excercise_percent">60</p> <p className="scoreText">Score</p>
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
      </Grid>
    </Grid>
  );
}
