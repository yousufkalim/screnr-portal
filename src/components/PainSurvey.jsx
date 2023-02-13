// mui imports
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

// assets import
import { ReactComponent as Back } from '../assets/icons/backBtn.svg';

export default function SurveyPain() {
  return (
    <div>
      <div id="painSurveyHeader">
        <div className="headerInfo">
          <div className="topSessionSec">
            <Back className="backBtn" />
            <p className="sessionHeader">Session Date</p>
            <p className="sessionDate">01/05/2022</p>
          </div>
          <div className="surveyHeaderName"> Prescription Name</div>
        </div>
      </div>
      <div className="questionaire">
        <div className="quesDiv">
          <div className="quesSec">
            <p className="leftTxt">Question 1:</p>
            <p className="rightTxt">What is the Lorem Ipsum?</p>
          </div>
          <div className="quesSec">
            <p className="leftTxt">Answer</p>
            <p className="rightTxt">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
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
        </div>
        <div className="quesDiv">
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
        </div>
      </div>
    </div>
  );
}
