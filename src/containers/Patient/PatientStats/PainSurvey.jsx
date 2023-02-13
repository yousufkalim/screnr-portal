import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child imports
import SurveyPain from '../../../components/PainSurvey';

export default function PainSurvey() {
  return (
    <Grid container>
      <Grid className="bgMsg" xl={12} lg={12}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Pain Survey &gt;
        </div>
        <div className="bgPainSurvey">
          <SurveyPain />
        </div>
      </Grid>
    </Grid>
  );
}
