import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

export default function Session() {
  return (
    <Grid container>
      <Grid xl={2} lg={2.5} />

      <Grid className="bgMsg" xl={10} lg={9.5}>
        <div className="breadCrumb">
          Dashboard &gt; &nbsp;Staff &gt; &nbsp; Clinic Admin &gt; &nbsp; Clinician &gt; &nbsp;
          Patient &gt; &nbsp;Prescription &gt; &nbsp;Session &gt; &nbsp;
        </div>
        <div className="bgAddPrescription">{/* <MessageBox /> */}</div>
      </Grid>
    </Grid>
  );
}
