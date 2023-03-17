import { React } from 'react';
// mui imports
import { Grid } from '@mui/material';

// child components import
import RightSidebar from '../../../components/sidebar/patient/PatientListRightSidebar';
import ReportCard from '../../../components/cards/PatientReportCard';

export default function Reports({ session }) {
  console.log('🚀 ~ file: Reports.jsx:11 ~ Reports ~ session:', session);
  return (
    <Grid container>
      <Grid className="bgReport" xl={9} lg={9}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Reports &gt;
        </div>
        <div className="bgReportCard">
          {session?.exercises?.map((item) => {
            return (
              <ReportCard
                answer={item?.report?.answer}
                answerTime={item?.report?.answer_time}
                exerciseId={item?.id}
                key={item?.id}
                heading="Excercise: "
                title={item.name}
                message={item?.report?.report}
                timeStamp={item?.report?.report_time}
                patientName={`${session?.patient?.first_name} ${session?.patient?.last_name}`}
              />
            );
          })}
        </div>
      </Grid>
      <Grid xl={3} lg={3}>
        <RightSidebar />
      </Grid>
    </Grid>
  );
}
