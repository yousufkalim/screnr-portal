/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const [loading, setLoading] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState('');
  const [sessionID, setSessionId] = useState();

  const handleGetSessionById = async () => {
    setLoading(true);
    await request('get', `/clinicians/sessions/getSessionDetails/${sessionId}`)
      .then((res) => {
        setSessionId(res?.data?.prescription?.patient);
        setLoading(false);
        setSession(res?.data?.session);
        setPatient(res?.data?.session?.patient);
        setBreadCrumb(
          `${res?.data?.session?.patient?.first_name} ${res?.data?.session?.patient?.last_name}`,
        );
        setPrescription(res?.data?.prescription);
        setExercise(res?.data?.session?.exercises[0]);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };
  const handleGetExerciseById = async (targetExerciseId) => {
    setLoading(true);
    await request('get', `/clinicians/prescribedExercises/getExercise/${targetExerciseId}`)
      .then((res) => {
        setLoading(false);

        setExercise(res?.data?.prescribedExercises);
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error?.response?.data?.message);
      });
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
          <Reports session={session} sessionID={sessionID} activeTab={activeTab} />
        ) : activeTab === 'Pain Survey' ? (
          <PainSurvey
            session={session}
            prescription={prescription}
            breadCrumb={breadCrumb}
            sessionID={sessionID}
            activeTab={activeTab}
          />
        ) : (
          activeTab === 'exercise' && (
            <ExerciseDetails
              session={session}
              exercise={exercise}
              loading={loading}
              results={exercise?.results}
              exerciseDetails={exercise?.exercise}
              breadCrumb={breadCrumb}
              sessionID={sessionID}
              activeTab={activeTab}
            />
          )
        )}
      </div>
    </div>
  );
}
