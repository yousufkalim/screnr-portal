import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import
import RightSidebar from '../../components/sidebar/patient/PatientListRightSidebar';
import ReportCard from '../../components/cards/PatientReportCard';

export default function Reports() {
  return (
    <Grid container>
      <Grid className="bgReport" xl={9} lg={9}>
        <div className="breadCrumb">
          Dashboard &gt; &nbsp;Staff &gt; &nbsp; Clinic Admin &gt; &nbsp; Clinician &gt; &nbsp;
          Patient &gt; &nbsp;Prescription &gt; &nbsp;Reports &gt; &nbsp;
        </div>
        <div className="bgReportCard">
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>
      </Grid>

      <Grid xl={3} lg={3}>
        <RightSidebar />
      </Grid>
    </Grid>
  );
}
