/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/patient/ExerciseSidebar';
import Reports from './Reports';
import PainSurvey from './PainSurvey';
import request from '../../../request';
import ExerciseDetails from './ExerciseDetails';

export default function Index() {
  const params = useParams();
  const { sessionId } = params;
  const [session, setSession] = useState({});
  const [patient, setPatient] = useState({});
  const [exercise, setExercise] = useState({});
  const [prescription, setPrescription] = useState({});
  const [activeTab, setActiveTab] = useState('');

  const handleGetSessionById = async () => {
    await request('get', `/clinicians/sessions/getSessionDetails/${sessionId}`).then((res) => {
      setSession(res?.data?.session);
      setPatient(res?.data?.session?.patient);
      setPrescription(res?.data?.prescription);
      setExercise(res?.data?.session?.exercises[0]);
    });
  };

  const handleGetExerciseById = async (targetExerciseId) => {
    await request('get', `/clinicians/prescribedExercises/getExercise/${targetExerciseId}`).then(
      (res) => {
        setExercise(res?.data?.prescribedExercises);
      },
    );
  };

  useEffect(() => {
    handleGetSessionById();
    setActiveTab('exercise');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gridish">
      <div className="sideBar_div">
        <Sidebar
          activeTab={activeTab}
          session={session}
          patient={patient}
          prescriptionId={prescription?.id}
          setActiveTab={setActiveTab}
          handleGetExerciseById={handleGetExerciseById}
        />
      </div>
      <div style={{ width: '80%', marginLeft: 'auto' }}>
        {activeTab === 'Reports' ? (
          <Reports session={session} />
        ) : activeTab === 'Pain Survey' ? (
          <PainSurvey session={session} prescription={prescription} />
        ) : (
          activeTab === 'exercise' && <ExerciseDetails session={session} exercise={exercise} />
        )}
      </div>
    </div>
  );
}
