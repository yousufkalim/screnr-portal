import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import moment from 'moment';
import { ReactComponent as Back } from '../../assets/icons/backBtn.svg';
import { ReactComponent as OpenArrow } from '../../assets/components/Sidebar/openArrow.svg';

export default function SurveyPain({ session, prescription, handleFeedBack, surveyText }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <div id="painSurveyHeader">
        <div className="headerInfo">
          <div className="topSessionSec">
            <Back className="backBtn" />
            <p className="sessionHeader">Session Date</p>
            <p className="sessionDate">{moment(session?.date).format('DD/MM/YYYY')}</p>
          </div>
          <div className="surveyHeaderName">{prescription?.name}</div>
        </div>
      </div>
      <div className="questionaire">
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {session?.survey?.map((item, index) => {
            return (
              <div className="quesDiv">
                <div className="quesSec">
                  <p className="leftTxt">Question 1:</p>
                  <p className="rightTxt">{item?.question}</p>
                </div>
                <div className="quesSec">
                  <p className="leftTxt">Answer</p>
                  <p className="rightTxt">{item?.answer}</p>
                </div>
                <div className="feedbackSec">
                  <p className="feedbackLeftTxt">Feedback</p>
                  <input
                    disabled={item.feedback}
                    type="text"
                    name="feedback"
                    className="feedbackInput"
                    placeholder="Write feedback to send to patient..."
                    value={item.feedback ?? surveyText}
                    onChange={(e) => handleFeedBack(e.target.value, index)}
                  />
                </div>
              </div>
            );
          })}

          {/* <div className="quesDiv">
            <div className="quesSec">
              <p className="leftTxt">Question 2:</p>
              <p className="rightTxt">What is the Lorem Ipsum?</p>
            </div>
            <div className="quesSec">
              <p className="leftTxt">Answer</p>
              <p className="rightTxt">
                <FormControlLabel
                  value="Admin Name"
                  checked
                  control={<Radio style={{ color: '#25C8B4' }} />}
                  label={
                    <Typography
                      style={{
                        color: '#25C8B4',
                        textAlign: 'left',
                        fontWeight: '500',
                        fontSize: '12px',
                      }}
                    >
                      Lorem Ipsum
                    </Typography>
                  }
                />
              </p>
            </div>
            <div className="feedbackSec">
              <p className="feedbackLeftTxt">Feedback</p>
              <input
                type="text"
                className="feedbackInput"
                placeholder="Write feedback to send to patient..."
              />
            </div>
          </div> */}
        </Collapse>

        {expanded ? (
          <OpenArrow
            onClick={() => setExpanded(!expanded)}
            className="painSurveyArrow"
            style={{
              transform: 'rotateX(180deg)',
            }}
          />
        ) : (
          <>
            <p className="arowDownTxt">Not reviewed yet</p>
            <OpenArrow onClick={() => setExpanded(!expanded)} className="painSurveyArrow" />
          </>
        )}
      </div>
    </div>
  );
}
