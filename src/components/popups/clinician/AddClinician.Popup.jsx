import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
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
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import add from '../../../assets/icons/add.svg';
import profiles from '../../../assets/icons/Profiles.svg';
import edit from '../../../assets/icons/edit.svg';
import dropdown from '../../../assets/icons/downArrow.svg';
import request from '../../../request';
import EmailAlreadyRegisteredPopup from '../general/EmailAlreadyRegistered.Popup';
import UserCreated from '../general/UserCreated.Popup';
import UserAlreadyExist from '../general/UserAlreadyExist.Popup';
import CustomPhoneInput from '../general/CustomPhoneInput.Popup';
import emailValidation from '../../../utils/emailValidation';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #E1E1E1 ',
        borderRadius: '20px',
        fontSize: 16,
        height: 55,
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
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

export default function AddClinician({
  clinicAdminId,
  openAddClinican,
  setOpenAddClinican,
  getClinicians,
}) {
  const [checked, setChecked] = useState(false);
  const [clinician, setClinician] = useState({});
  const [userData, setUserData] = useState({ clinic: clinicAdminId, title: '' });
  const [alreadyExisitingUser, setAlreadyExisitingUser] = useState(false);
  const [exisitingButInactive, setExisitingButInactive] = useState(false);
  const [added, setAdded] = useState(false);
  const outlinedInputStyles = useOutlinedInputStyles();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const futureYear = new Date();
  futureYear.setFullYear(futureYear.getFullYear() + 10);

  // close popup
  const handleClose = () => {
    setOpenAddClinican(false);
    setClinician({});
    setChecked(false);
    setUserData({ clinic: clinicAdminId, title: '' });
  };

  // uploading img
  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 10;
    if (myFile.size > size) {
      return toast.error('File size can not exceed 10 Mb');
    }
    if (myFile) {
      document.getElementById('clinicAdmin_AddProfile_Pic_selected').src =
        URL.createObjectURL(myFile);
    }
    setClinician({ ...clinician, profile_pic: myFile });
  };

  const handleChange = (e) => {
    setClinician({ ...clinician, [e.target.name]: e.target.value });
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const dateChange = (e) => {
    setClinician({
      ...clinician,
      expiry_date: e,
    });
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  // handle gender selection
  const handleGenderSelection = (name) => {
    setClinician({ ...clinician, gender: name });
  };

  // posting data
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create a new FormData object
      const formData = new FormData();

      if (clinician.expiry_date && !checked) {
        delete clinician.expiry_date;
        setClinician({ ...clinician });
      }
      // append properties from clinician in formdata
      Object.keys(clinician).forEach((key) => {
        formData.append(key, clinician[key]);
      });

      // // append properties from userData in formdata
      // Object.keys(userData).forEach((key) => {
      //   formData.append(`userData[${key}]`, userData[key]);
      // });
      if (userData.clinic) {
        formData.append(`userData[clinic]`, userData.clinic);
      }

      if (userData.title) {
        formData.append(`userData[title]`, userData.title);
      }

      if (clinician.phone_number && clinician.phone_number.length < 11) {
        return toast.error('Phone number must contain 10 digits');
      }
      if (checked && !clinician.expiry_date) {
        return toast.error('Please enter expiry date');
      }
      // this function will return true if email validation fails (for production only)
      if (emailValidation(clinician.email)) {
        return;
      }

      // sending this data to api
      const { data } = await request('post', '/clinics/addClinician', formData);

      if (data) {
        toast.success('Clinician added successfully');
        getClinicians();
        setAdded(true);
        handleClose();
        setClinician({});
        setChecked(false);
        setUserData({ clinic: clinicAdminId, title: '' });
      }
    } catch (error) {
      if (error.response.status === 409) {
        setAlreadyExisitingUser(true);
      }
      if (error.response.status === 418) {
        setExisitingButInactive(true);
      }
      toast.error(error?.response?.data?.message);
    }
  };

  const handleActivate = async () => {
    const formData = new FormData();

    if (clinician.expiry_date && !checked) {
      delete clinician.expiry_date;
      setClinician({ ...clinician });
    }
    // append properties from clinician in formdata
    Object.keys(clinician).forEach((key) => {
      formData.append(key, clinician[key]);
    });

    // append properties from userData in formdata
    Object.keys(userData).forEach((key) => {
      formData.append(`userData[${key}]`, userData[key]);
    });
    formData.append('active', 'true');
    formData.append('activateUser', 'true');
    try {
      const { data } = await request('put', '/clinics/editClinician/undefined', formData);

      if (data) {
        getClinicians();
        setClinician({});
        return toast.success('User activated successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAddClinican}
        setOpen={setOpenAddClinican}
        fullWidth
        width="40.8%"
        minWidth="90%"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <DialogContent>
          <div className="loginClearIconCopy">
            <ClearIcon onClick={handleClose} />
          </div>
          <div>
            <Typography gutterBottom>
              <h1 className="clinicianPopupTxt">Add New Clinician</h1>
              <p className="clinicianSubTxt"> </p>
              <div>
                <div className="imgDivPopup">
                  <label htmlFor="clinicAdmin_AddProfile_Pic">
                    <input
                      name="profile_pic"
                      type="file"
                      id="clinicAdmin_AddProfile_Pic"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleSelectedFile}
                      className="noDisplay"
                    />

                    <img
                      src={profiles}
                      className="pointer"
                      id="clinicAdmin_AddProfile_Pic_selected"
                      style={{
                        width: '100%',
                        borderRadius: '100px',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      alt=""
                    />
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
                      color: 'black',
                      fontSize: '14px',
                      fontWeight: '500',
                      ml: 2,
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="title"
                  value={userData.title || ''}
                  onChange={handleUserDataChange}
                  placeholder="Title"
                  inputProps={{
                    sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Title
                  </MenuItem>
                  <MenuItem value="Mr">Mr.</MenuItem>
                  <MenuItem value="Mrs">Mrs.</MenuItem>
                  <MenuItem value="Miss">Miss.</MenuItem>
                  <MenuItem value="Dr">Dr.</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ mb: 1, mt: 2.7, width: '48.5%', mr: 1.5 }} variant="outlined">
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
                  value={clinician.first_name}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              </FormControl>

              <FormControl sx={{ mb: 1, mt: 2.7, width: '48.5%' }} variant="outlined">
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
                  name="last_name"
                  value={clinician.last_name}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              </FormControl>

              <FormControl sx={{ mb: 2, mt: 1, width: '48.5%', mr: 1.5 }} variant="outlined">
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
                  name="email"
                  type="email"
                  value={clinician.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
                <div>
                  <CustomPhoneInput setUserInfo={setClinician} userInfo={clinician} />
                </div>
              </FormControl>

              <FormControl
                sx={{ mb: 1, mt: 1, width: '100%', textAlign: 'left' }}
                variant="outlined"
              >
                <p className="genderTxt"> Gender</p>
                <span>
                  <Button
                    className={clinician.gender === 'male' ? 'selectGender' : 'genderBtn'}
                    variant="contained"
                    sx={{ width: '130px' }}
                    onClick={() => {
                      handleGenderSelection('male');
                    }}
                  >
                    Male
                  </Button>
                  <Button
                    className={clinician.gender === 'female' ? 'selectGender' : 'genderBtn'}
                    variant="contained"
                    onClick={() => {
                      handleGenderSelection('female');
                    }}
                  >
                    Female
                  </Button>
                  <Button
                    className={clinician.gender === 'non-binary' ? 'selectGender' : 'genderBtn'}
                    variant="contained"
                    onClick={() => {
                      handleGenderSelection('non-binary');
                    }}
                  >
                    Non-binary
                  </Button>
                </span>
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
                  control={
                    <Checkbox
                      onChange={handleCheck}
                      checked={checked}
                      style={{ color: '#136773' }}
                    />
                  }
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
                <div className="date-div" id={!checked ? 'disabledDate' : ''}>
                  <DatePicker
                    dateFormat="MM-dd-yyyy"
                    name="expiry_date"
                    selected={clinician.expiry_date}
                    onChange={dateChange}
                    disabled={!checked}
                    placeholderText="Enter expiry date"
                    popperPlacement="bottom-start"
                    showYearDropdown
                    minDate={tomorrow}
                    disablePast
                    scrollableYearDropdown
                    maxDate={futureYear}
                    yearDropdownItemNumber={10}
                  />
                </div>
              </FormControl>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            <p className="sendInviteTxt">Send Invite</p>{' '}
            <img src={add} className="spaceOnLeft" alt="" />
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {alreadyExisitingUser && (
        <EmailAlreadyRegisteredPopup
          openExistingEmail={alreadyExisitingUser}
          setOpenExistingEmail={setAlreadyExisitingUser}
        />
      )}

      {added && <UserCreated openUserCreated={added} setOpenUserCreated={setAdded} />}
      {exisitingButInactive && (
        <UserAlreadyExist
          openExistingUser={exisitingButInactive}
          setOpenExistingUser={setExisitingButInactive}
          handleActivate={handleActivate}
          closeParent={handleClose}
        />
      )}
    </div>
  );
}
