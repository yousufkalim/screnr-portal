import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

export default function Session() {
  return (
    <Grid container>
      <Grid xl={2} lg={2.5} />

      <Grid className="bgMsg" xl={10} lg={9.5}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Session &gt;
        </div>
        <div className="bgAddPrescription">{/* <MessageBox /> */}</div>
      </Grid>
    </Grid>
  );
}
