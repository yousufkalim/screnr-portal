import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import

// import MessageBox from '../components/MessageBox';

export default function PainSurvey() {
  return (
    <Grid container>
      <Grid className="bgMsg" xl={10} lg={9.5}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Pain Survey &gt;
        </div>
        <div className="bgAddPrescription">{/* <MessageBox /> */}</div>
      </Grid>
    </Grid>
  );
}
