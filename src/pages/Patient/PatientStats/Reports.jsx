import { React } from 'react';
import RightSidebar from '../../../components/sidebar/patient/PatientListRightSidebar';
import ReportCard from '../../../components/cards/ReportCard.Component';
import Breadcrumbs from '../../../components/BreadCrumbs/BreadCrumbs';

export default function Reports({ session, sessionID }) {
  const breadCrumb = `${session?.patient?.first_name} ${session?.patient?.last_name}`;
  return (
    <div style={{ display: 'flex' }}>
      <div className="bgReport">
        <Breadcrumbs ClinicName={breadCrumb} sessionID={sessionID} />
        {/* <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Reports &gt;
        </div> */}
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
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
}
