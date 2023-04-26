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
  const { sessionId, prescriptionId } = params;
  const [session, setSession] = useState({});
  const [patient, setPatient] = useState({});
  const [exercise, setExercise] = useState({});
  const [prescription, setPrescription] = useState({});
  const [activeTab, setActiveTab] = useState('');

  const handleGetSessionById = async () => {
    await request('get', `/clinicians/sessions/getSession/${sessionId}`).then(async (res) => {
      setSession(res?.data?.session);
      await request('get', `/clinicians/getPatientDetail/${res?.data?.session?.patient?.id}`).then(
        async (res2) => {
          setPatient(res2?.data?.user);
          await request('get', `/clinicians/prescriptions/getPrescription/${prescriptionId}`).then(
            (res3) => {
              setPrescription(res3?.data?.prescription);
            },
          );
        },
      );
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
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar
          activeTab={activeTab}
          session={session}
          patient={patient}
          prescriptionId={prescription?.id}
          setActiveTab={setActiveTab}
          handleGetExerciseById={handleGetExerciseById}
        />
      </Grid>
      <Grid xl={10} lg={9.5}>
        {activeTab === 'Reports' ? (
          <Reports session={session} />
        ) : activeTab === 'Pain Survey' ? (
          <PainSurvey session={session} prescription={prescription} />
        ) : (
          activeTab === 'exercise' && (
            <ExerciseDetails session={session} exercise={exercise ?? session?.exercises[0]} />
          )
        )}
      </Grid>
    </Grid>
  );
}
