import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import dropdown from '../../../assets/icons/downArrow.svg';
import { rest } from '../../../utils/data';

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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    textAlign: 'left',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 6%)',
  },
}));

export default function EditExerciseInfo({
  openPopup,
  setOpenPopup,
  targetExercise,
  handleClosePopup,
  handleEditExerciseBtn,
}) {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [restTime, setRestTime] = useState('');
  const outlinedInputStyles = useOutlinedInputStyles();

  useEffect(() => {
    setSets(targetExercise?.selectExercise?.sets);
    setReps(targetExercise?.selectExercise?.reps);
    setRestTime(targetExercise?.selectExercise?.rest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClosePopup}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
        setOpen={setOpenPopup}
        maxWidth="md"
        PaperProps={{
          style: {
            borderRadius: 20,
            background: '#FFFFFF',
            width: '35%',
            boxShadow: 'none',
          },
        }}
      >
        <div className="loginClearIconCopy">
          <ClearIcon onClick={handleClosePopup} />
        </div>
        <DialogContent>
          <div>
            <Typography gutterBottom>
              <h1 className="clinicianPopupTxt">Edit Exercise Information</h1>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexDirection: 'column',
                }}
              >
                <FormControl
                  sx={{
                    width: '100%',
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
                    value={sets}
                    onChange={(e) => {
                      if (
                        (/^\d{1,2}$/.test(e.target.value) &&
                          parseInt(e.target.value, 10) >= 1 &&
                          parseInt(e.target.value, 10) <= 10) ||
                        e.target.value === ''
                      ) {
                        setSets(e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: '100%',
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
                    value={reps}
                    onChange={(e) => {
                      if (
                        (/^\d{1,2}$/.test(e.target.value) &&
                          parseInt(e.target.value, 10) >= 1 &&
                          parseInt(e.target.value, 10) <= 15) ||
                        e.target.value === ''
                      ) {
                        setReps(e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: '100%',
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
                    value={restTime || 'default'}
                    onChange={(e) => {
                      setRestTime(e.target.value);
                    }}
                  >
                    <MenuItem value="default" disabled>
                      <span className="optColor">Rest between sets</span>
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
            </Typography>
          </div>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button
            onClick={() => {
              handleEditExerciseBtn(sets, reps, restTime);
            }}
            sx={{ boxShadow: '0' }}
            className="savePBtn"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
