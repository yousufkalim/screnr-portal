import { useState } from 'react';

// mui imports
import Grid from '@mui/material/Grid';
import { FormControl, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

// datepicker
import DatePicker from 'react-datepicker';
// assets import
import dropdown from '../../../assets/icons/dropdownOrange.svg';
import { ReactComponent as ExpiryDate } from '../../../assets/icons/expiryDate.svg';
import { ReactComponent as MotionCapture } from '../../../assets/icons/motionCapture.svg';
import { ReactComponent as Program } from '../../../assets/icons/exProgram.svg';
import { ReactComponent as List } from '../../../assets/icons/list.svg';

// child imports
import AddPrescriptionTable from '../../tables/prescription/AddPrescriptionTable';
import useOutlinedInputStyles from '../../../utils/AddFormInput';
import AdjustRange from '../../popups/prescription/AdjustMotionRange';

const weeks = [
  {
    value: 1,
    label: 'Week 1',
  },
  {
    value: 2,
    label: 'Week 2',
  },
  {
    value: 3,
    label: 'Week 3',
  },
  {
    value: 4,
    label: 'Week 4',
  },
  {
    value: 5,
    label: 'Week 5',
  },
  {
    value: 6,
    label: 'Week 6',
  },
];

const frequency = [
  {
    value: 1,
    label: '1 Times',
  },
  {
    value: 2,
    label: '2 Times',
  },
  {
    value: 3,
    label: '3 Times',
  },
  {
    value: 4,
    label: '4 Times',
  },
  {
    value: 5,
    label: '5 Times',
  },
];

const rest = [
  {
    value: '15s',
    label: '15s',
  },
  {
    value: '30s',
    label: '30s',
  },
  {
    value: '45s',
    label: '45s',
  },
  {
    value: '60s',
    label: '60s',
  },
  {
    value: '90s',
    label: '90s',
  },
  {
    value: '120s',
    label: '120s',
  },
];

const bodyParts = [
  {
    value: 'Arms',
    label: 'Arms',
  },
  {
    value: 'Back',
    label: 'Back',
  },
  {
    value: 'Legs',
    label: 'Legs',
  },
  {
    value: 'Sholders',
    label: 'Sholders',
  },
];

export default function AddPrescription({
  prescription,
  exerciseInformation,
  handleAddToList,

  handlePrescriptionDetails,
  handleExerciseInformation,
  dateChange,
}) {
  console.log(exerciseInformation, 'exerciseInformation');
  const outlinedInputStyles = useOutlinedInputStyles();
  const [openAdjustRange, setOpenAdjustRange] = useState(false);
  const validatingListBtn =
    exerciseInformation.name &&
    exerciseInformation.body_part &&
    exerciseInformation.sets &&
    exerciseInformation.reps &&
    exerciseInformation.rest;
  return (
    <Grid container className="addPrescription">
      <Grid xl={6} lg={6}>
        <h3 className="prescriptionHead">Add Prescription Details</h3>
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
                <MenuItem value={week.value}>
                  <span className="optColor">{week.label}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid xl={6} lg={6}>
        <FormControl
          sx={{
            textAlign: 'left',
            width: '100%',
            mt: 7,
          }}
        >
          <div className="dateDivPrescription">
            <DatePicker
              showPopperArrow
              dateFormat="dd/MM/yyyy"
              name="date"
              placeholderText="Start date"
              popperPlacement="bottom-start"
              showYearDropdown
              selected={prescription.start_date}
              onChange={dateChange}
            />
            <ExpiryDate className="calenderIcon" />
          </div>
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%', mb: 6 }} variant="outlined">
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
                <MenuItem value={item.value}>
                  <span className="optColor">{item.label}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid xl={6.6} lg={6}>
        <h3 className="prescriptionHead">Add Exercise Information</h3>
        <div className="prescriptionChoiceSec">
          <div
            className={prescription.type === 'motion' ? 'selctedPresChoice' : 'presChoice'}
            onClick={() => handlePrescriptionDetails('type', 'motion')}
            role="presentation"
          >
            <MotionCapture
              className={prescription.type === 'motion' ? 'iconClicked' : 'choiceIcon'}
            />
            <p className="selectedOpt">Motion capture</p>
          </div>
          <div
            className={prescription.type === 'simple' ? 'selctedPresChoice' : 'presChoice'}
            onClick={() => handlePrescriptionDetails('type', 'simple')}
            role="presentation"
          >
            <Program className={prescription.type === 'simple' ? 'iconClicked' : 'choiceIcon'} />
            <p className="selectedOpt">Exercise Program</p>
          </div>
        </div>
        {prescription.type === 'motion' ? (
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
                name="client"
                placeholder="Title"
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem>
                  <span className="optColor">Select Body Part</span>
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 3, width: '100%', mb: 3 }} variant="outlined">
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
                name="client"
                placeholder="Title"
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem>
                  <span className="optColor"> Select Exercise</span>{' '}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '32%', mr: 1.2 }} variant="outlined">
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
              />
            </FormControl>
            <FormControl sx={{ width: '32%', mr: 1.2 }} variant="outlined">
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
              />
            </FormControl>
            <FormControl sx={{ width: '32%' }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '400',
                  },
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder="Rest Between Sets"
              />
            </FormControl>
            <FormControl sx={{ width: '100%', mt: 3, mb: 3 }} variant="outlined">
              <TextField
                multiline
                rows={5}
                maxRows={5}
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
                placeholder="Special instruction"
              />
            </FormControl>
            <div className="prescriptionBtns">
              <div>
                <Button className="thresholdsBtn" onClick={() => setOpenAdjustRange(true)}>
                  Thresholds{' '}
                </Button>
                <FormControlLabel
                  sx={{
                    color: '#25C8B4',
                    textAlign: 'left',
                    fontSize: '12px',
                    width: 'fit-content',
                  }}
                  control={<Checkbox style={{ color: '#25C8B4' }} />}
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

              <Button className="listBtn">
                <p className="listTxtBtn">Add to List</p>
                <List />
              </Button>
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
                value={exerciseInformation?.body_part || 'default'}
                onChange={(e) => {
                  handleExerciseInformation(e.target.name, e.target.value);
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
                value={exerciseInformation.name}
                onChange={(e) => {
                  handleExerciseInformation(e.target.name, e.target.value);
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
            <FormControl sx={{ width: '32%', mr: 1.2 }} variant="outlined">
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
                value={exerciseInformation.sets}
                onChange={(e) => {
                  if (
                    (/^\d{1,2}$/.test(e.target.value) &&
                      parseInt(e.target.value, 10) >= 1 &&
                      parseInt(e.target.value, 10) <= 10) ||
                    e.target.value === ''
                  ) {
                    handleExerciseInformation(e.target.name, e.target.value);
                  }
                }}
              />
            </FormControl>
            <FormControl sx={{ width: '32%', mr: 1.2 }} variant="outlined">
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
                value={exerciseInformation.reps}
                onChange={(e) => {
                  if (
                    (/^\d{1,2}$/.test(e.target.value) &&
                      parseInt(e.target.value, 15) >= 1 &&
                      parseInt(e.target.value, 15) <= 15) ||
                    e.target.value === ''
                  ) {
                    handleExerciseInformation(e.target.name, e.target.value);
                  }
                }}
              />
            </FormControl>

            <FormControl sx={{ width: '32%' }} variant="outlined">
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
                value={exerciseInformation.rest || 'default'}
                onChange={(e) => {
                  handleExerciseInformation(e.target.name, e.target.value);
                }}
              >
                <MenuItem value="default">
                  <span className="optColor">Rest Between Sets</span>{' '}
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
            <FormControl sx={{ width: '100%', mt: 3, mb: 3 }} variant="outlined">
              <TextField
                multiline
                rows={5}
                maxRows={5}
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
                placeholder="Special instruction"
                name="instructions"
                value={exerciseInformation.instructions}
                onChange={(e) => {
                  handleExerciseInformation(e.target.name, e.target.value);
                }}
              />
            </FormControl>
            <div className="prescriptionBtns2">
              {/* <div>
                <Button className="thresholdsBtn" onClick={() => setOpenAdjustRange(true)}>
                  Thresholds{' '}
                </Button>
                <FormControlLabel
                  sx={{
                    color: '#25C8B4',
                    textAlign: 'left',
                    fontSize: '12px',
                    width: 'fit-content',
                  }}
                  control={<Checkbox style={{ color: '#25C8B4' }} />}
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
              </div> */}

              <Button
                disabled={!validatingListBtn}
                className={validatingListBtn ? 'listBtn' : 'listBtn_disabled'}
                onClick={handleAddToList}
              >
                <span className="listTxtBtn">Add to List</span>
                <List />
              </Button>
            </div>
          </>
        )}
      </Grid>

      <Grid xl={5} lg={6}>
        <AddPrescriptionTable ExercisePrescriptionList={prescription} />
      </Grid>
      {openAdjustRange && (
        <AdjustRange openAdjustRange={openAdjustRange} setOpenAdjustRange={setOpenAdjustRange} />
      )}
    </Grid>
  );
}
