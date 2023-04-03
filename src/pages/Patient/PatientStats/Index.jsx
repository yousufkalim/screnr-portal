/* eslint-disable no-nested-ternary */
import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from '../../../components/sidebar/patient/ExerciseSidebar';
import Reports from './Reports';
import PainSurvey from './PainSurvey';
import api from '../../../api/index';
import ExcerciseChart from './ExcerciseChart';
import ReportCard from '../../../components/cards/PatientReportCard';
import MultiCircularProgress from './OverallExcerciseScore';
import { ReactComponent as TitleExcerciseIcon } from '../../../assets/icons/titleExcerciseIcon.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import { ReactComponent as LeftArrow } from '../../../assets/icons/ArrowIcon1.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/ArrowIcon2.svg';
import { ReactComponent as RedDot } from '../../../assets/icons/sessionGraphColorDot1.svg';
import { ReactComponent as GreenDot } from '../../../assets/icons/sessionGraphColorDot2.svg';
import { ReactComponent as YellowDot } from '../../../assets/icons/sessionGraphColorDot3.svg';

export default function Index() {
  const params = useParams();
  const [session, setSession] = useState({});
  const [patient, setPatient] = useState({});
  const [exercise, setExercise] = useState({});
  const { sessionId, prescriptionId, exerciseId } = params;
  const [prescription, setPrescription] = useState({});

  const handleGetSessionById = async () => {
    await api('get', `/admins/sessions/${sessionId}`).then(async (res) => {
      setSession(res?.data?.session);
      await api('get', `/admins/patients/${res?.data?.session?.patient?.id}`).then(async (res2) => {
        setPatient(res2?.data?.user);
        await api('get', `/admins/prescriptions/${prescriptionId}`).then((res3) => {
          setPrescription(res3?.data?.prescription);
        });
      });
    });
  };

  const handleGetExerciseById = async () => {
    await api('get', `/admins/prescribedExercises/${exerciseId}`).then((res) => {
      setExercise(res?.data?.prescribedExercises);
    });
  };

  useEffect(() => {
    if (exerciseId) {
      handleGetExerciseById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId]);

  useEffect(() => {
    handleGetSessionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar session={session} patient={patient} />
      </Grid>
      <Grid xl={10} lg={9.5}>
        {/* <Reports /> */}
        {window.location.pathname.includes('/exercise/reports') ? (
          <Reports session={session} />
        ) : window.location.pathname.includes('/exercise/painSurvey') ? (
          <PainSurvey session={session} prescription={prescription} />
        ) : window.location.pathname.includes('/exercise/exerciseDetails') ? (
          <div className="bg_main_div_sessions" style={{ height: '85rem', background: '#F6FAFB' }}>
            <div className="breadCrumb">
              Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription
              &gt; Session &gt;
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
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}
