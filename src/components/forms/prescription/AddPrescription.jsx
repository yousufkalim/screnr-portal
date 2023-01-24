import { useState } from 'react';

// mui imports
import Grid from '@mui/material/Grid';
import { FormControl, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
import AddPrescriptionTable from '../../tables/prescription/AddPrescriptionTable';
import AdjustRange from '../../popups/prescription/AdjustMotionRange';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #E1E1E1 ',
        borderRadius: '20px',
        fontSize: 16,
      },
      '&:hover fieldset': {
        borderColor: '#454238',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#454238',
      },
    },
  },
});
export default function AddPrescription() {
  const outlinedInputStyles = useOutlinedInputStyles();
  const [selected, setSelected] = useState('motionCapture');
  const [openAdjustRange, setOpenAdjustRange] = useState(false);

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
            name="clinic_name"
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '98%' }} variant="outlined">
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
            value=""
            placeholder="Title"
            inputProps={{
              sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
            }}
          >
            <MenuItem value="">
              {' '}
              <span className="optColor"> Select Duration</span>
            </MenuItem>
            <MenuItem>
              {' '}
              <span className="optColor"> 1 week</span>
            </MenuItem>
            <MenuItem>
              {' '}
              <span className="optColor"> 2 weeks</span>
            </MenuItem>
            <MenuItem>
              {' '}
              <span className="optColor"> 3 weeks</span>
            </MenuItem>
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
              dateFormat="dd/MMMM/yyyy"
              name="date"
              placeholderText="Start date"
              popperPlacement="bottom-start"
              showYearDropdown
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
            name="client"
            value=""
            placeholder="Title"
            inputProps={{
              sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
            }}
          >
            <MenuItem value="">
              <span className="optColor">Weekly Frequency</span>
            </MenuItem>
            <MenuItem>
              <span className="optColor">1 Time</span>
            </MenuItem>
            <MenuItem>
              <span className="optColor">2 Times </span>
            </MenuItem>
            <MenuItem>
              <span className="optColor">3 Times </span>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid xl={6.6} lg={6}>
        <h3 className="prescriptionHead">Add Exercise Information</h3>
        <div className="prescriptionChoiceSec">
          <div
            className={selected === 'motionCapture' ? 'selctedPresChoice' : 'presChoice'}
            onClick={() => setSelected('motionCapture')}
            role="presentation"
          >
            <MotionCapture
              className={selected === 'motionCapture' ? 'iconClicked' : 'choiceIcon'}
            />{' '}
            <p className="selectedOpt"> Motion capture</p>
          </div>
          <div
            className={selected === 'exProgram' ? 'selctedPresChoice' : 'presChoice'}
            onClick={() => setSelected('exProgram')}
            role="presentation"
          >
            <Program className={selected === 'exProgram' ? 'iconClicked' : 'choiceIcon'} />
            <p className="selectedOpt"> Exercise Program</p>
          </div>
        </div>

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
              <span className="optColor"> Select Body Part</span>
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
      </Grid>

      <Grid xl={5} lg={6}>
        <AddPrescriptionTable />
      </Grid>
      {openAdjustRange && (
        <AdjustRange openAdjustRange={openAdjustRange} setOpenAdjustRange={setOpenAdjustRange} />
      )}
    </Grid>
  );
}
