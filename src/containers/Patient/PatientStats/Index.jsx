/* eslint-disable no-nested-ternary */
import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import
import Sidebar from '../../../components/sidebar/patient/ExerciseSidebar';
// import MessageBox from '../components/MessageBox';
import Reports from './Reports';
import PainSurvey from './PainSurvey';

export default function Index() {
  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>
      <Grid xl={10} lg={9.5}>
        {/* <Reports /> */}
        {window.location.pathname.includes('/exercise/reports') ? (
          <Reports />
        ) : window.location.pathname.includes('/exercise/painSurvey') ? (
          <PainSurvey />
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}
