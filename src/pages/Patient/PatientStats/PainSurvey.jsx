import { React, useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SurveyPain from '../../../components/PainSurvey/PainSurvey.Component';

export default function PainSurvey({ session, prescription, breadCrumb, sessionID }) {
  const [survey, setSurvey] = useState(session?.survey);

  // const handlePainSurveySubmit = async () => {
  //   await request('put', `/clinicians/sessions/getSession/${session.id}`, { survey })
  //     .then(() => {
  //       toast.success('Survey added successfully');
  //     })
  //     .catch((error) => {
  //       toast.error(error?.response?.data?.message);
  //     });
  // };

  useEffect(() => {
    setSurvey(session?.survey);
  }, [session]);

  return (
    <div style={{ marginLeft: 'auto', width: '100%' }}>
      <div className="bgMsg" style={{ marginLeft: 'unset', width: '100%' }}>
        <Breadcrumbs ClinicName={breadCrumb} sessionID={sessionID} />
        {/* <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Pain Survey &gt;
        </div> */}
        <div className="bgPainSurvey">
          <SurveyPain session={session} prescription={prescription} survey={survey} />
        </div>
      </div>
    </div>
  );
}
