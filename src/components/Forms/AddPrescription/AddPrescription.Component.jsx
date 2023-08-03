import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { FormControl, TextareaAutosize, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import DatePicker from 'react-datepicker';
import dropdown from '../../../assets/icons/dropdownOrange.svg';
import { ReactComponent as ExpiryDate } from '../../../assets/icons/expiryDate.svg';
import { ReactComponent as MotionCapture } from '../../../assets/icons/motionCapture.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import { ReactComponent as Program } from '../../../assets/icons/exProgram.svg';
import { ReactComponent as List } from '../../../assets/icons/list.svg';
import AddPrescriptionTable from '../../tables/prescription/AddPrescriptionTable';
import AdjustRange from '../../popups/prescription/AdjustRange.Popup';
import { weeks, frequency, rest, bodyParts } from '../../../utils/data';

const useOutlinedInputStyles = makeStyles({
  textarea: {
    border: '1px solid #E1E1E1',
    borderRadius: '20px',
    width: '100%',
    resize: 'none',
    height: '132px',
    padding: '13px 30px',
    boxSizing: 'border-box',
    '&:focus': {
      outline: '2px solid black',
    },
    '&::placeholder': {
      fontWeight: 500,
      fontSize: '14px',
      color: '#919B9B',
    },
  },
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #E1E1E1 ',
        borderRadius: '20px',
        fontSize: 16,
        // height: 55,
      },
      '&:hover fieldset': {
        borderColor: '#454238',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#454238',
      },
    },
  },
});

export default function AddPrescription({
  prescription,
  setPrescription,
  simpleExerciseInfo,
  handleAddToList,
  handlePrescriptionDetails,
  handleSimpleExerciseInfo,
  dateChange,
  allMotionExercise,
  exerciseType,
  setExerciseType,
  handleMotionExerciseInfo,
  motionExerciseInfo,
  setMotionExerciseInfo,
  validatingGeneratePrescription,
  handleGeneratePrescription,
  disableBtn,
}) {
  const outlinedInputStyles = useOutlinedInputStyles();
  const [openAdjustRange, setOpenAdjustRange] = useState(false);
  const validatingListBtn =
    simpleExerciseInfo.name &&
    simpleExerciseInfo.body_part &&
    simpleExerciseInfo.sets &&
    simpleExerciseInfo.reps &&
    simpleExerciseInfo.rest;

  const validatingMotionListBtn =
    motionExerciseInfo.name &&
    motionExerciseInfo.body_part &&
    motionExerciseInfo.sets &&
    motionExerciseInfo.reps &&
    motionExerciseInfo.rest &&
    motionExerciseInfo.exercise;

  const today = new Date().toISOString();

  return (
    <div className="addPrescription">
      <h3
        className="prescriptionHead"
        style={{ display: 'flex', alignItem: 'center', justifyContent: 'flex-start', gap: '1rem' }}
      >
        <BackIcon
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            window.history.back();
          }}
        />{' '}
        Add Prescription Details
      </h3>
      <div className="prescDetailsDiv">
        <div className="leftDetails">
          <FormControl sx={{ mt: 3, width: '98%', mr: 2 }} variant="outlined">
            <TextField
              sx={{
                borderRadius: '20px',
                input: {
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '500',
                  ml: 1,
                },
              }}
              id="outlined-fname"
              classes={outlinedInputStyles}
              placeholder="Prescription Name"
              size="normal"
              name="name"
              value={prescription.name}
              onChange={(e) => {
                handlePrescriptionDetails(e.target.name, e.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={{ mt: 2, width: '98%' }} variant="outlined">
            <Select
              // eslint-disable-next-line react/no-unstable-nested-components
              IconComponent={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
              )}
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E1E1E1',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: ' #454238',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: ' #454238',
                },
                borderRadius: '20px',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="duration"
              value={prescription?.duration || 'default'}
              onChange={(e) => {
                handlePrescriptionDetails(e.target.name, e.target.value);
              }}
              inputProps={{
                sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
              }}
            >
              <MenuItem value="default">
                <span className="optColor">Select Duration</span>
              </MenuItem>
              {weeks?.map((week) => {
                return (
                  <MenuItem value={week?.value}>
                    <span className="optColor">{week?.label}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="leftDetails">
          <FormControl
            sx={{
              textAlign: 'left',
              width: '100%',
            }}
          >
            <div className="dateDivPrescription">
              <DatePicker
                showPopperArrow
                dateFormat="MM/dd/yyyy"
                name="date"
                placeholderText="Start date"
                popperPlacement="bottom-start"
                showYearDropdown
                selected={prescription.start_date}
                onChange={dateChange}
                minDate={today}
                disablePast
              />
              <ExpiryDate className="calenderIcon" />
            </div>
          </FormControl>
          <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
            <Select
              // eslint-disable-next-line react/no-unstable-nested-components
              IconComponent={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
              )}
              displayEmpty
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E1E1E1',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: ' #454238',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: ' #454238',
                },
                borderRadius: '20px',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="frequency"
              value={prescription.frequency || 'default'}
              onChange={(e) => {
                handlePrescriptionDetails(e.target.name, e.target.value);
              }}
              placeholder="Title"
              inputProps={{
                sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
              }}
            >
              <MenuItem value="default">
                <span className="optColor">Weekly Frequency</span>
              </MenuItem>
              {frequency.map((item) => {
                return (
                  <MenuItem value={item?.value}>
                    <span className="optColor">{item?.label}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="Exersice_main_div">
        <div className="left_exercise">
          <h3 className="prescriptionHead">Add Exercise Information</h3>
          <div className="prescriptionChoiceSec">
            <div
              className={exerciseType === 'motion' ? 'selctedPresChoice' : 'presChoice'}
              onClick={() => setExerciseType('motion')}
              role="presentation"
            >
              <div className="image_div">
                <MotionCapture
                  className={exerciseType === 'motion' ? 'iconClicked' : 'choiceIcon'}
                />
              </div>
              <p className="selectedOpt">Motion capture</p>
            </div>
            <div
              className={exerciseType === 'simple' ? 'selctedPresChoice' : 'presChoice'}
              onClick={() => setExerciseType('simple')}
              role="presentation"
            >
              <div className="image_div">
                <Program className={exerciseType === 'simple' ? 'iconClicked' : 'choiceIcon'} />
              </div>
              <p className="selectedOpt">Exercise Program</p>
            </div>
          </div>
          {exerciseType === 'motion' ? (
            <>
              <FormControl sx={{ mt: 2.5, width: '100%' }} variant="outlined">
                <Select
                  // eslint-disable-next-line react/no-unstable-nested-components
                  IconComponent={(props) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                  )}
                  displayEmpty
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E1E1E1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: ' #454238',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: ' #454238',
                    },
                    borderRadius: '20px',
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="body_part"
                  placeholder="Title"
                  value={motionExerciseInfo?.body_part || 'default'}
                  onChange={(e) => {
                    handleMotionExerciseInfo(e.target.name, e.target.value);
                  }}
                  inputProps={{
                    sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                  }}
                >
                  <MenuItem value="default">
                    <span className="optColor">Select Body Part</span>
                  </MenuItem>
                  {bodyParts?.map((item) => {
                    return (
                      <MenuItem value={item.value}>
                        <span className="optColor">{item.label}</span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 3, width: '100%', mb: 3 }} variant="outlined">
                <Select
                  // eslint-disable-next-line react/no-unstable-nested-components
                  IconComponent={(props) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                  )}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E1E1E1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: ' #454238',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: ' #454238',
                    },
                    borderRadius: '20px',
                  }}
                  inputProps={{
                    sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                  }}
                  name="exercise"
                  value={motionExerciseInfo?.exercise || 'default'}
                  onChange={(e) => {
                    const selectedExercise = e.target.value;
                    setMotionExerciseInfo({
                      ...motionExerciseInfo,
                      name: selectedExercise?.name,
                      exercise: selectedExercise,
                    });
                  }}
                >
                  <MenuItem value="default">
                    <span className="optColor">Select Exercise</span>
                  </MenuItem>
                  {allMotionExercise?.map((item) => (
                    <MenuItem value={item}>
                      <span className="optColor">{item?.name}</span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="sets_div">
                <FormControl
                  sx={{
                    width: '32%',
                    mr: 1.4,
                    '@media (max-width: 1366px)': {
                      width: '100%',
                      marginBottom: '24px',
                    },
                  }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      borderRadius: '20px',
                      input: {
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '400',
                        ml: 1,
                      },
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    placeholder="Number of sets"
                    name="sets"
                    value={motionExerciseInfo.sets}
                    onChange={(e) => {
                      if (
                        (/^\d{1,2}$/.test(e.target.value) &&
                          parseInt(e.target.value, 10) >= 1 &&
                          parseInt(e.target.value, 10) <= 10) ||
                        e.target.value === ''
                      ) {
                        handleMotionExerciseInfo(e.target.name, e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: '32%',
                    mr: 1.4,
                    '@media (max-width: 1366px)': {
                      width: '100%',
                      marginBottom: '24px',
                    },
                  }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      borderRadius: '20px',
                      input: {
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '400',
                        ml: 1,
                      },
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    placeholder="Number of reps"
                    name="reps"
                    value={motionExerciseInfo?.reps}
                    onChange={(e) => {
                      if (
                        (/^\d{1,2}$/.test(e.target.value) &&
                          parseInt(e.target.value, 10) >= 1 &&
                          parseInt(e.target.value, 10) <= 15) ||
                        e.target.value === ''
                      ) {
                        handleMotionExerciseInfo(e.target.name, e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: '32%',
                    mr: 1.4,
                    '@media (max-width: 1366px)': {
                      width: '100%',
                    },
                  }}
                  variant="outlined"
                >
                  <Select
                    // eslint-disable-next-line react/no-unstable-nested-components
                    IconComponent={(props) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                    )}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E1E1E1',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: ' #454238',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: ' #454238',
                      },
                      borderRadius: '20px',
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    inputProps={{
                      sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                    }}
                    name="rest"
                    value={motionExerciseInfo.rest || 'default'}
                    onChange={(e) => {
                      handleMotionExerciseInfo(e.target.name, e.target.value);
                    }}
                  >
                    <MenuItem value="default">
                      <span className="optColor">Rest Between Sets</span>
                    </MenuItem>
                    {rest?.map((item) => {
                      return (
                        <MenuItem value={item?.value}>
                          <span className="optColor">{item?.label}</span>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <FormControl sx={{ width: '100%', mt: 3, mb: 0 }} variant="outlined">
                <TextareaAutosize
                  style={{
                    height: '132px',
                  }}
                  maxRows={5}
                  id="outlined-fname"
                  className={outlinedInputStyles.textarea}
                  placeholder="Special instruction"
                  name="instructions"
                  value={motionExerciseInfo?.instructions}
                  onChange={(e) => {
                    handleMotionExerciseInfo(e.target.name, e.target.value);
                  }}
                />
              </FormControl>
              <div className="prescriptionBtns" style={{ marginTop: '1rem' }}>
                <div className="prescriptions_btns">
                  {/* <Button className="thresholdsBtn" onClick={() => setOpenAdjustRange(true)}>
                  Thresholds{' '}
                </Button> */}
                  <FormControlLabel
                    sx={{
                      color: '#25C8B4',
                      textAlign: 'left',
                      fontSize: '12px',
                      width: 'fit-content',
                    }}
                    control={
                      <Checkbox
                        style={{ color: '#25C8B4' }}
                        checked={motionExerciseInfo?.screenshot}
                        onChange={(e) => {
                          handleMotionExerciseInfo('screenshot', e.target.checked);
                        }}
                      />
                    }
                    label={
                      <Typography
                        style={{
                          color: '#25C8B4',
                          textAlign: 'left',
                          fontWeight: '500',
                          fontSize: '12px',
                        }}
                      >
                        Screen Shots
                      </Typography>
                    }
                  />
                </div>
                <div className="btn_div">
                  <Button
                    sx={{ width: '100%' }}
                    disabled={!validatingMotionListBtn}
                    className={validatingMotionListBtn ? 'listBtn' : 'listBtn_disabled'}
                    onClick={handleAddToList}
                  >
                    <span className="listTxtBtn">Add to List</span>
                    <div className="image_div">
                      <List />
                    </div>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <FormControl sx={{ mt: 2.5, width: '100%' }} variant="outlined">
                <div />
                <Select
                  // eslint-disable-next-line react/no-unstable-nested-components
                  IconComponent={(props) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                  )}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E1E1E1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: ' #454238',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: ' #454238',
                    },
                    borderRadius: '20px',
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  inputProps={{
                    sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                  }}
                  name="body_part"
                  value={simpleExerciseInfo?.body_part || 'default'}
                  onChange={(e) => {
                    handleSimpleExerciseInfo(e.target.name, e.target.value);
                  }}
                >
                  <MenuItem value="default" selected disabled>
                    <span className="optColor">Select Body Part</span>
                  </MenuItem>

                  {bodyParts?.map((item) => {
                    return (
                      <MenuItem value={item.value}>
                        <span className="optColor">{item.label}</span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 3, width: '100%', mb: 3 }} variant="outlined">
                <TextField
                  sx={{
                    borderRadius: '20px',
                    input: {
                      color: 'black',
                      fontSize: '14px',
                      fontWeight: '500',
                      ml: 1,
                    },
                  }}
                  id="outlined-fname"
                  classes={outlinedInputStyles}
                  placeholder="Exercise Name"
                  size="normal"
                  name="name"
                  value={simpleExerciseInfo.name}
                  onChange={(e) => {
                    handleSimpleExerciseInfo(e.target.name, e.target.value);
                  }}
                />
                {/* <Select
                // eslint-disable-next-line react/no-unstable-nested-components
                IconComponent={(props) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                )}
                displayEmpty
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E1E1E1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #454238',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #454238',
                  },
                  borderRadius: '20px',
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="name"
                placeholder="Title"
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value={0}>
                  <span className="optColor">Select Exercise</span>{' '}
                </MenuItem>
                <MenuItem value="Quad Stretch">
                  <span className="optColor">Quad Stretch</span>{' '}
                </MenuItem>
              </Select> */}
              </FormControl>
              <div className="sets_div">
                <FormControl
                  sx={{
                    width: '32%',
                    mr: 1.4,
                    '@media (max-width: 1366px)': {
                      width: '100%',
                      marginBottom: '24px',
                    },
                  }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      // borderRadius: '20px',
                      input: {
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '400',
                        ml: 1,
                      },
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    placeholder="Number of sets"
                    name="sets"
                    value={simpleExerciseInfo.sets}
                    onChange={(e) => {
                      if (
                        (/^\d{1,2}$/.test(e.target.value) &&
                          parseInt(e.target.value, 10) >= 1 &&
                          parseInt(e.target.value, 10) <= 10) ||
                        e.target.value === ''
                      ) {
                        handleSimpleExerciseInfo(e.target.name, e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: '32%',
                    mr: 1.4,
                    '@media (max-width: 1366px)': {
                      width: '100%',
                      marginBottom: '24px',
                    },
                  }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      borderRadius: '20px',
                      input: {
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '400',
                        ml: 1,
                      },
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    placeholder="Number of reps"
                    name="reps"
                    value={simpleExerciseInfo.reps}
                    onChange={(e) => {
                      if (
                        (/^\d{1,2}$/.test(e.target.value) &&
                          parseInt(e.target.value, 10) >= 1 &&
                          parseInt(e.target.value, 10) <= 15) ||
                        e.target.value === ''
                      ) {
                        handleSimpleExerciseInfo(e.target.name, e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: '32%',
                    mr: 1.4,
                    '@media (max-width: 1366px)': {
                      width: '100%',
                    },
                  }}
                  variant="outlined"
                >
                  <Select
                    // eslint-disable-next-line react/no-unstable-nested-components
                    IconComponent={(props) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                    )}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E1E1E1',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: ' #454238',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: ' #454238',
                      },
                      borderRadius: '20px',
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    inputProps={{
                      sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                    }}
                    name="rest"
                    value={simpleExerciseInfo.rest || 'default'}
                    onChange={(e) => {
                      handleSimpleExerciseInfo(e.target.name, e.target.value);
                    }}
                  >
                    <MenuItem value="default">
                      <span className="optColor">Rest Between Sets</span>
                    </MenuItem>
                    {rest?.map((item) => {
                      return (
                        <MenuItem value={item.value}>
                          <span className="optColor">{item.label}</span>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <FormControl sx={{ width: '100%', mt: 3, mb: 0 }} variant="outlined">
                <TextareaAutosize
                  style={{
                    height: '132px',
                  }}
                  maxRows={5}
                  id="outlined-fname"
                  className={outlinedInputStyles.textarea}
                  placeholder="Special instruction"
                  name="instructions"
                  value={motionExerciseInfo?.instructions}
                  onChange={(e) => {
                    handleMotionExerciseInfo(e.target.name, e.target.value);
                  }}
                />
              </FormControl>
              <div className="prescriptionBtns2">
                <div className="btn_div">
                  <Button
                    disabled={!validatingListBtn}
                    className={validatingListBtn ? 'listBtn' : 'listBtn_disabled'}
                    onClick={handleAddToList}
                  >
                    <span className="listTxtBtn">Add to List</span>
                    <div className="image_div">
                      <List />
                    </div>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="prescTable">
          <AddPrescriptionTable
            ExercisePrescriptionList={prescription}
            setExercisePrescriptionList={setPrescription}
          />
          <div className="addPrescriptionBtn">
            <Button
              variant="contained"
              disabled={disableBtn}
              className={validatingGeneratePrescription}
              onClick={() => handleGeneratePrescription()}
            >
              Generate Prescription
            </Button>
          </div>
        </div>
      </div>

      {openAdjustRange && (
        <AdjustRange openAdjustRange={openAdjustRange} setOpenAdjustRange={setOpenAdjustRange} />
      )}
    </div>
  );
}
