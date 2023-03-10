import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import MessageBox from '../../components/MessageBox';

export default function PatientMessageBox() {
  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>
      <Grid className="bgMsg" xl={10} lg={9.5}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Messages &gt;
        </div>
        <div className="bgAddPrescription">
          <MessageBox />
        </div>
      </Grid>
    </Grid>
  );
}
