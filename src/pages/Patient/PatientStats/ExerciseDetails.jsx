/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import MultiCircularProgress from './OverallExcerciseScore';
import { CircularProgress } from '@mui/material';
import Collapse from '@mui/material/Collapse';
// import { ReactComponent as TitleExcerciseIcon } from '../../../assets/icons/titleExcerciseIcon.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import { ReactComponent as LeftArrow } from '../../../assets/icons/ArrowIcon1.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/ArrowIcon2.svg';
// import { ReactComponent as RedDot } from '../../../assets/icons/sessionGraphColorDot1.svg';
// import { ReactComponent as GreenDot } from '../../../assets/icons/sessionGraphColorDot2.svg';
// import { ReactComponent as YellowDot } from '../../../assets/icons/sessionGraphColorDot3.svg';
import { ReactComponent as OpenArrow } from '../../../assets/components/Sidebar/openArrow.svg';
import ScoreCard from '../../../components/ScoreCard/scoreCard';
import ExerciseTable from '../../../components/tables/exerciseDetail/exerciseTable';
import ScreenShotViewer from '../../../components/ScreenShotViewer/index';
import { getMediaUrl } from '../../../config';
import Breadcrumbs from '../../../components/BreadCrumbs/BreadCrumbs';

function ExerciseDetails({
  session,
  exercise,
  results,
  exerciseDetails,
  loading,
  breadCrumb,
  sessionID,
}) {
  const [targetExercise, setTargetExercise] = useState({
    set: [],
    setCount: 1,
    rep: {},
    repCount: 1,
  });
  const [toggleIcon, setToggleIcon] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleExpandClick = () => {
    setToggleIcon(!toggleIcon);
  };

  const handleSetCounterAdd = () => {
    if (targetExercise.setCount < results.length) {
      setTargetExercise((prevExercise) => ({
        ...prevExercise,
        setCount: prevExercise.setCount + 1,
        repCount: 1, // Reset the rep counter to 1 when changing sets
        set: results[prevExercise.setCount], // Get the next set
        rep: results[prevExercise.setCount][0], // Set rep to the first rep in the new set
      }));
    }
  };

  const handleRepCounterAdd = () => {
    if (targetExercise.repCount < targetExercise.set.length) {
      setTargetExercise((prevExercise) => ({
        ...prevExercise,
        repCount: prevExercise.repCount + 1,
        rep: prevExercise.set[prevExercise.repCount], // Get the next rep in the current set
      }));
    } else {
      // If we reach the last rep in the current set, move to the next set
      handleSetCounterAdd();
    }
  };

  const handleSetCounterSubtract = () => {
    if (targetExercise.setCount > 1) {
      setTargetExercise((prevExercise) => ({
        ...prevExercise,
        setCount: prevExercise.setCount - 1,
        repCount: 1, // Reset the rep counter to 1 when changing sets
        set: results[prevExercise.setCount - 2], // Get the previous set
        rep: results[prevExercise.setCount - 2][0], // Set rep to the first rep in the previous set
      }));
    }
  };

  const handleRepCounterSubtract = () => {
    if (targetExercise.repCount > 1) {
      setTargetExercise((prevExercise) => ({
        ...prevExercise,
        repCount: prevExercise.repCount - 1,
        rep: prevExercise.set[prevExercise.repCount - 2], // Get the previous rep in the current set
      }));
    } else {
      // If we are at the first rep of the current set, move to the previous set
      // eslint-disable-next-line no-lonely-if
      if (targetExercise.setCount > 1) {
        setTargetExercise((prevExercise) => ({
          ...prevExercise,
          setCount: prevExercise.setCount - 1,
          repCount: results[prevExercise.setCount - 2].length, // Set rep to the last rep in the previous set
          set: results[prevExercise.setCount - 2], // Get the previous set
          rep: results[prevExercise.setCount - 2][results[prevExercise.setCount - 2].length - 1], // Set rep to the last rep in the previous set
        }));
      }
    }
  };

  const handleGetScore = (bodyPartName) => {
    const mergedArray = [].concat(
      ...Object.values(
        targetExercise?.rep?.rep_packet?.angles.find((item) => {
          return item?.name === bodyPartName;
        }).value,
      ),
    );

    const lowest = Math.min(...mergedArray);
    const highest = Math.max(...mergedArray);
    const minVal = exerciseDetails.angles[bodyPartName.split('_')[0]][bodyPartName]?.min_val;
    const maxVal = exerciseDetails.angles[bodyPartName.split('_')[0]][bodyPartName]?.max_val;
    // if (highest < minVal) {
    //   return 0;
    // }
    // const lowDiff = lowest - minVal > 0 ? lowest - minVal : 0;
    // const highDiff = maxVal - highest > 0 ? maxVal - highest : 0;
    // const temp = ((lowDiff + highDiff) / (maxVal - minVal)) * 100;
    // return Math.round(100 - temp);

    const intersectionMin = Math.max(lowest, minVal);
    const intersectionMax = Math.min(highest, maxVal);
    // Calculate the length of the intersection range
    const intersectionLength = Math.max(0, intersectionMax - intersectionMin);
    // Calculate the length of the coverage range
    const coverageRangeLength = highest - lowest;
    // Calculate the coverage percentage
    const coveragePercentage = (intersectionLength / coverageRangeLength) * 100;
    return Math.round(coveragePercentage);
  };

  const handleSelectedImage = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === exercise?.screenshots?.length - 1
        ? exercise?.screenshots.length - 1
        : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  function capitalizeFirstLetterOfEachWord(inputString) {
    const words = inputString?.split(' ');
    const capitalizedWords = words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords?.join(' ');
  }

  useEffect(() => {
    // Check if the results array exists and is not empty
    if (results && results.length > 0) {
      setTargetExercise((prevExercise) => ({
        ...prevExercise,
        set: results[0],
        rep: results[0][0],
      }));
    }
  }, [results]);

  return selectedImageIndex !== null ? (
    <ScreenShotViewer
      screenshots={exercise?.screenshots}
      selectedImageIndex={selectedImageIndex}
      handleClose={handleClose}
      handleNextImage={handleNextImage}
      handlePrevImage={handlePrevImage}
    />
  ) : (
    <div className="bg_main_div_sessions" style={{ background: '#F6FAFB', paddingBottom: '40px' }}>
      <Breadcrumbs ClinicName={breadCrumb} sessionID={sessionID} />
      {/* <div className="breadCrumb">
        Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescription &gt;
        Session &gt;
      </div> */}
      <div className="bgAddPrescriptionSessions">
        <div className="SessionsHeading">
          <div className="leftside_title">
            <div className="backIcon_button">
              <BackIcon className="arrows" />
            </div>
            <div className="dateTitle">
              <p>Session Date</p>
            </div>
            <div className="dateExcercise">
              <p>{moment(session?.date).format('MM/DD/YYYY')}</p>
            </div>
          </div>
          <div className="excerciseDay">
            <p>{session?.name}</p>
          </div>
        </div>

        <div className="excercise_name_heading">
          <div
            className="excerciseNameIcon"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // gap: '.7rem',
            }}
          >
            {/* <TitleExcerciseIcon /> */}
            <p className="excercise_name_p">{capitalizeFirstLetterOfEachWord(exercise?.name)}</p>
          </div>
        </div>
        <div className="excercise_details">
          <div className="setNumber">
            <div className="text_rep_set">
              <p>Set Number</p>
            </div>
            <div className="set_rep_valueNumber">
              <LeftArrow className="arrows" onClick={handleSetCounterSubtract} />
              <p>{targetExercise?.setCount}</p>
              <RightArrow className="arrows" onClick={handleSetCounterAdd} />
            </div>
          </div>
          <div className="setNumber">
            <div className="text_rep_set">
              <p>Rep Number</p>
            </div>
            <div className="set_rep_valueNumber">
              <LeftArrow className="arrows" onClick={handleRepCounterSubtract} />
              <p>{targetExercise?.repCount}</p>
              <RightArrow className="arrows" onClick={handleRepCounterAdd} />
            </div>
          </div>
        </div>
        <div className="jointScoreHeading">
          <p>Joint Score (Lateral View)</p>
        </div>
        <div className="jointScoreOuterDiv">
          <div className="score_Bar1">
            <div className="overallScoreGraph">
              <div className="overAll_Arrows">
                {/* <LeftArrow className="arrows" /> */}
                <p className="excercises_names">Performance</p>
                {/* <RightArrow className="arrows" /> */}
              </div>
              <CircularProgress
                variant="determinate"
                thickness="8"
                value={targetExercise?.rep?.screnr_compliance || 0}
                size={60}
                sx={{
                  color:
                    // eslint-disable-next-line no-nested-ternary
                    targetExercise?.rep?.screnr_compliance >= 80 &&
                    targetExercise?.rep?.screnr_compliance <= 100
                      ? '#25CC7C'
                      : targetExercise?.rep?.screnr_compliance >= 60 &&
                        targetExercise?.rep?.screnr_compliance <= 80
                      ? '#FABB18'
                      : '#FF5151',
                }}
              />

              <div className="graphData">
                <p className="excercise_percent">
                  {Math.round(targetExercise?.rep?.screnr_compliance) ?? 0}
                </p>
              </div>
              {/* <div className="colorDotsDiv2">
                <div className="colorDots">
                  <RedDot />
                  <p className="colortxt">Low</p>
                </div>
                <div className="colorDots">
                  <GreenDot />
                  <p className="colortxt">Medium</p>
                </div>
                <div className="colorDots">
                  <YellowDot />
                  <p className="colortxt">High</p>
                </div>
              </div> */}
            </div>
          </div>
          {targetExercise?.rep?.rep_packet?.scores?.map((item) => (
            <ScoreCard
              bodyPart={item?.name.replace(/[0-9_]+/g, ' ').trim()}
              scoreValue={handleGetScore(item.name)}
              key={item.name}
            />
          ))}
        </div>
      </div>
      <div
        className="screenShotDiv"
        onClick={handleExpandClick}
        style={{ display: exercise?.type === 'motion' ? 'flex' : 'none' }}
      >
        <div className="screenShotTitleDiv">
          <span>Screen Shots</span>
          {toggleIcon ? (
            <OpenArrow
              style={{
                cursor: 'pointer',
              }}
            />
          ) : (
            <OpenArrow
              style={{
                transform: 'rotateX(180deg)',
                cursor: 'pointer',
              }}
            />
          )}
        </div>
      </div>
      <Collapse in={toggleIcon} timeout="auto" className="screenShotsPhotoCollapse">
        <div className="screenShotImagesDiv">
          {exercise?.screenshots?.length > 0 &&
            exercise?.screenshots?.map((item, index) => {
              return (
                <img
                  src={getMediaUrl(item)}
                  key={item}
                  alt={`screenShotImages${index + 1}`}
                  className="screenShotImages"
                  onClick={() => {
                    handleSelectedImage(index);
                  }}
                />
              );
            })}
        </div>
      </Collapse>

      <div className="performanceGraphDiv">
        <ExerciseTable feedback={targetExercise?.rep?.rep_packet?.feedback} loading={loading} />
      </div>
    </div>
  );
}

export default ExerciseDetails;
