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
          Dashboard &gt; &nbsp;Staff &gt; &nbsp; Clinic Admin &gt; &nbsp; Clinician &gt; &nbsp;
          Patient &gt; &nbsp;Prescription &gt; &nbsp;Pain Survey &gt; &nbsp;
        </div>
        <div className="bgAddPrescription">{/* <MessageBox /> */}</div>
      </Grid>
    </Grid>
  );
}
