/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable eqeqeq */
import React from 'react';
import moment from 'moment';
import { ReactComponent as Back } from '../../assets/icons/backBtn.svg';
import PainSurveyIcon from '../../assets/icons/painSurveyIcon.svg';

export default function SurveyPain({ session, prescription }) {
  const painScaleBoxColors = [
    'rgba(81, 170, 132, 1)',
    'rgba(100, 200, 97, 1)',
    'rgba(191, 201, 55, 1)',
    'rgba(241, 227, 50, 1)',
    'rgba(253, 216, 49, 1)',
    'rgba(253, 187, 44, 1)',
    'rgba(253, 144, 37, 1)',
    'rgba(252, 102, 34, 1)',
    'rgba(219, 44, 24, 1)',
    'rgba(184, 54, 51, 1)',
  ];
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
        {session?.survey?.map((item, Isurvey) => {
          return (
            <div className="quesDiv">
              <div className="quesSec">
                <p className="leftTxt">{item?.question}</p>
              </div>
              <div
                className="ansSec"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: Isurvey == session?.survey.length - 1 ? 'center' : 'flex-end',
                }}
              >
                {Isurvey == session?.survey.length - 1 ? (
                  <div>
                    <p className="rightTxt">{item?.answer}</p>
                  </div>
                ) : (
                  <div className="painScale">
                    {painScaleBoxColors?.map((color, index) => {
                      return (
                        <div style={{ width: '100%' }}>
                          <div
                            className="painScaleColorDiv"
                            style={{
                              backgroundColor: color,
                              height: '85%',
                              borderTopLeftRadius: index === 0 ? '10px' : '',
                              borderBottomLeftRadius: index === 0 ? '10px' : '',
                              borderTopRightRadius:
                                index === painScaleBoxColors.length - 1 ? '10px' : '',
                              borderBottomRightRadius:
                                index === painScaleBoxColors.length - 1 ? '10px' : '',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            key={color}
                          >
                            <img
                              src={PainSurveyIcon}
                              style={{
                                display: item?.answer == index ? 'inline-block' : 'none',
                                paddingInline: '3px',
                                width: '95%',
                              }}
                              alt=""
                            />
                          </div>
                          <div
                            style={{
                              textAlign: 'center',
                              color: item?.answer == index ? '#25C8B4' : '',
                            }}
                          >
                            {index}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
