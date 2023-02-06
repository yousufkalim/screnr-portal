import { React, useState } from 'react';

// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';

// react-toastify import
import { toast } from 'react-toastify';

// react-datepicker import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// assets import
import add from '../../../assets/icons/add.svg';
import edit from '../../../assets/icons/edit.svg';
import dropdown from '../../../assets/icons/downArrow.svg';

// child component imports
import useOutlinedInputStyles from '../../../utils/EditFormInput';
import AvatarComponent from '../../Avatar';
import ReactSelect from '../../ReactSelect';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

export default function EditPatient({ openEditPatient, setOpenEditPatient }) {
  const [checked, setChecked] = useState(false);
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenEditPatient(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('Patient added successfully');
    handleClose();
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditPatient}
        setOpen={setOpenEditPatient}
        fullWidth
        width="40.8%"
        minWidth="90%"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="clinicianPopupTxt">Edit Patient</h1>
            <p className="clinicianSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div>
              <div className="imgDivPopup">
                <label htmlFor="profilePic">
                  <input name="profile_pic" type="file" id="profilePic" accept="image/*" />{' '}
                  <AvatarComponent alt="Arooj Ishfaq" className="popups_avatar" />
                  <img src={edit} className="addImgIcon" alt="" />
                </label>
              </div>
            </div>
            <FormControl sx={{ mt: 3, width: '100%' }} variant="outlined">
              <Select
                // eslint-disable-next-line react/no-unstable-nested-components
                IconComponent={(props) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <img src={dropdown} style={{ margin: '1% 2%' }} {...props} alt="" />
                )}
                displayEmpty
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#454238',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FBA622',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FBA622',
                  },
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 2,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="client"
                placeholder="Title"
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value="">Sameer</MenuItem>
                <MenuItem>Uxaine</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
              <ReactSelect />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 2, width: '100%' }} variant="outlined">
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
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="MRN (customized unique id)"
                size="normal"
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%', mr: 2 }} variant="outlined">
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
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="First Name"
                size="normal"
                name="first_name"
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
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
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="Last Name"
                size="normal"
                name="Last_name"
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%', mr: 2 }} variant="outlined">
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
                id="outlined-email"
                classes={outlinedInputStyles}
                placeholder="Email"
                size="normal"
                type="email"
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
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
                id="outlined-phone"
                classes={outlinedInputStyles}
                placeholder="Phone Number"
                size="normal"
                type="text"
                inputProps={{
                  maxLength: 10,
                }}
              />
            </FormControl>

            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
                mb: 2,
              }}
            >
              <div className="date-div2">
                <DatePicker
                  showPopperArrow
                  dateFormat="dd/MMMM/yyyy"
                  name="date"
                  placeholderText="Date of birth"
                  popperPlacement="bottom-start"
                  showYearDropdown
                />
              </div>
            </FormControl>

            <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
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
                  input: {
                    color: 'red',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 2,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="client"
                placeholder="Title"
                value=""
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value="">
                  <span style={{ color: '#949494' }}>Select Diagnosis</span>
                </MenuItem>
                <MenuItem> Cancer</MenuItem>
                <MenuItem> Typhoid</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 1, width: '100%' }} variant="outlined">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                  'aria-label': 'Without label',
                }}
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
                  input: {
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 2,
                  },
                }}
                name="location"
                value=""
              >
                <MenuItem disabled selected value="">
                  <span style={{ color: '#949494' }}>Location</span>{' '}
                </MenuItem>
                <MenuItem value="Left">
                  {' '}
                  <span style={{ color: '#949494' }}>Left</span>{' '}
                </MenuItem>
                <MenuItem value="Right">
                  {' '}
                  <span style={{ color: '#949494' }}>Right</span>{' '}
                </MenuItem>
                <MenuItem value="Posterior">
                  {' '}
                  <span style={{ color: '#949494' }}>Posterior</span>{' '}
                </MenuItem>
                <MenuItem value="Anterior">
                  {' '}
                  <span style={{ color: '#949494' }}>Anterior</span>{' '}
                </MenuItem>
                <MenuItem value="Medial">
                  {' '}
                  <span style={{ color: '#949494' }}>Medial</span>{' '}
                </MenuItem>
                <MenuItem value="Lateral">
                  {' '}
                  <span style={{ color: '#949494' }}>Lateral</span>{' '}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
                ml: 0.6,
              }}
            >
              <FormControlLabel
                sx={{
                  color: '#136773',
                  textAlign: 'left',
                  fontSize: '40px',
                  width: 'fit-content',
                }}
                control={<Checkbox onChange={handleCheck} style={{ color: '#136773' }} />}
                label={
                  <Typography
                    style={{
                      color: '#136773',
                      textAlign: 'left',
                      fontWeight: '500',
                    }}
                  >
                    Want to Add expiry date
                  </Typography>
                }
              />
            </FormControl>
            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div className="date-div2" id={!checked ? 'disabledDate' : ''}>
                <DatePicker
                  showPopperArrow
                  dateFormat="dd/MMMM/yyyy"
                  name="date"
                  disabled={!checked}
                  placeholderText="Enter expiry date"
                  popperPlacement="bottom-start"
                  showYearDropdown
                />
              </div>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            <p className="sendInviteTxt">Send Invite </p>{' '}
            <img src={add} className="spaceOnLeft" alt="" />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
