/* eslint-disable no-nested-ternary */
import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

// child components import
import Sidebar from '../../../components/sidebar/patient/ExerciseSidebar';
// import MessageBox from '../components/MessageBox';
import Reports from './Reports';
import PainSurvey from './PainSurvey';
import api from '../../../api/index';

export default function Index() {
  const params = useParams();
  const { sessionId, prescriptionId } = params;
  const [session, setSession] = useState({});
  const [patient, setPatient] = useState({});
  const [prescription, setPrescription] = useState({});

  const handleGetSessionById = async () => {
    await api('get', `/admins/sessions/${sessionId}`)
      .then(async (res) => {
        setSession(res?.data?.session);
        await api('get', `/admins/patients/${res?.data?.session?.patient?.id}`)
          .then(async (res2) => {
            setPatient(res2?.data?.user);
            await api('get', `/admins/prescriptions/${prescriptionId}`)
              .then((res3) => {
                setPrescription(res3?.data?.prescription);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}
