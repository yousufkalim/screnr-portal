import { React, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import request from '../../../request';
import SurveyPain from '../../../components/PainSurvey/PainSurvey.Component';

export default function PainSurvey({ session, prescription }) {
  const [survey, setSurvey] = useState(session?.survey);
  const [surveyText, setSurveyText] = useState('');

  const handleFeedBack = (targetFeedback, targetIndex) => {
    setSurveyText(targetFeedback);
    const newSurvey = survey.map((obj, index) => {
      if (index === targetIndex) {
        return {
          ...obj,
          feedback: targetFeedback,
        };
      }
      return obj;
    });
    setSurvey(newSurvey);
  };

  useEffect(() => {
    setSurvey(session?.survey);
  }, [session]);

  const handlePainSurveySubmit = async () => {
    await request('put', `/clinicians/sessions/getSession/${session.id}`, { survey })
      .then(() => {
        toast.success('Survey added successfully');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <Grid container>
      <Grid className="bgMsg" xl={12} lg={12}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
          Pain Survey &gt;
        </div>
        <div className="bgPainSurvey">
          <SurveyPain
            session={session}
            prescription={prescription}
            survey={survey}
            handleFeedBack={handleFeedBack}
            surveyText={surveyText}
          />
        </div>
      </Grid>
      <div className="addBtn">
        <button className="painSurvey_submit_btn" type="submit" onClick={handlePainSurveySubmit}>
          Submit
        </button>
      </div>
    </Grid>
  );
}
