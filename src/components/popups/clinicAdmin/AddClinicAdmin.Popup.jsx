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
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import add from '../../../assets/icons/add.svg';
import profiles from '../../../assets/icons/Profiles.svg';
import request from '../../../request';
import edit from '../../../assets/icons/edit.svg';
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
        borderColor: '#FBA622',
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

export default function AddClinicAdmin({
  staffAdminId,
  openAddClinicAdmin,
  setOpenAddClinicAdmin,
  getClinicAdmins,
}) {
  const [checked, setChecked] = useState(false);
  const [clinicAdmin, setClinicAdmin] = useState({});
  const [userData, setUserData] = useState({ staff: staffAdminId });
  const [alreadyExisitingUser, setAlreadyExisitingUser] = useState(false);
  const [exisitingButInactive, setExisitingButInactive] = useState(false);
  const [added, setAdded] = useState(false);
  const outlinedInputStyles = useOutlinedInputStyles();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleClose = () => {
    setOpenAddClinicAdmin(false);
    setClinicAdmin({});
    setChecked(false);
    setUserData({});
  };

  // uploading img
  const handleSelectedFile = ({ target }) => {
    if (target.files[0].size > 1024 * 1024 * 10) {
      return toast.error('File size can not exceed 10 Mb');
    }
    if (target.files[0]) {
      const imageElement = document.getElementById('clinicAdmin_AddProfile_Pic_selected');
      if (imageElement) {
        imageElement.src = URL.createObjectURL(target.files[0]);
      }
    }
    setClinicAdmin({ ...clinicAdmin, profile_pic: target.files[0] });
  };

  const handleChange = (e) => setClinicAdmin({ ...clinicAdmin, [e.target.name]: e.target.value });

  const handleUserDataChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

  const dateChange = (e) => {
    setClinicAdmin({
      ...clinicAdmin,
      expiry_date: e,
    });
  };

  const handleCheck = (event) => setChecked(event.target.checked);
  const handleGenderSelection = (name) => setClinicAdmin({ ...clinicAdmin, gender: name });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create a new FormData object
      const formData = new FormData();

      if (clinicAdmin.expiry_date && !checked) {
        delete clinicAdmin.expiry_date;
        setClinicAdmin({ ...clinicAdmin });
      }
      // append properties from ClinicAdmin in formdata
      Object.keys(clinicAdmin).forEach((key) => {
        formData.append(key, clinicAdmin[key]);
      });

      // append properties from userData in formdata
      Object.keys(userData).forEach((key) => {
        formData.append(`userData[${key}]`, userData[key]);
      });

      if (clinicAdmin.phone_number && clinicAdmin.phone_number.length < 11) {
        return toast.error('Phone number must contain 10 digits');
      }
      if (checked && !clinicAdmin.expiry_date) {
        return toast.error('Please enter expiry date');
      }

      // this function will return true if email validation fails (for production only)
      if (emailValidation(clinicAdmin.email)) {
        return;
      }
      // sending this data to api
      const { data } = await request('post', '/staff/addClinic', formData);
      if (data) {
        toast.success('Clinic Admin added successfully');
        getClinicAdmins();
        setAdded(true);
        handleClose();
        setClinicAdmin({});
        setChecked(false);
        setUserData({ staff: staffAdminId });
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

    if (clinicAdmin.expiry_date && !checked) {
      delete clinicAdmin.expiry_date;
      setClinicAdmin({ ...clinicAdmin });
    }
    // append properties from ClinicAdmin in formdata
    Object.keys(clinicAdmin).forEach((key) => {
      formData.append(key, clinicAdmin[key]);
    });

    // append properties from userData in formdata
    Object.keys(userData).forEach((key) => {
      formData.append(`userData[${key}]`, userData[key]);
    });
    formData.append('active', 'true');
    formData.append('activateUser', 'true');
    try {
      const { data } = await request('put', '/staff/editClinic/undefined', formData);
      if (data) {
        getClinicAdmins();
        setClinicAdmin({});
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
        open={openAddClinicAdmin}
        setOpen={setOpenAddClinicAdmin}
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
              <h1 className="addPopupTxt">Add New Clinic Admin</h1>
              <p className="addPopupSubTxt"> </p>
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
                  placeholder="Clinic Name"
                  size="normal"
                  name="clinic_name"
                  value={userData.clinic_name}
                  onChange={handleUserDataChange}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
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
                  id="outlined-fname"
                  classes={outlinedInputStyles}
                  placeholder="First Name"
                  size="normal"
                  name="first_name"
                  value={clinicAdmin.first_name}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              </FormControl>
              <FormControl sx={{ mb: 2, mt: 2.7, width: '48.5%' }} variant="outlined">
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
                  id="outlined-last-name"
                  classes={outlinedInputStyles}
                  placeholder="Last name"
                  size="normal"
                  type="text"
                  name="last_name"
                  value={clinicAdmin.last_name}
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
                  type="email"
                  name="email"
                  value={clinicAdmin.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
                <div>
                  <CustomPhoneInput setUserInfo={setClinicAdmin} userInfo={clinicAdmin} />
                </div>
              </FormControl>

              <FormControl
                sx={{ mb: 1, mt: 1, width: '100%', textAlign: 'left' }}
                variant="outlined"
              >
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
                  placeholder="Address"
                  size="normal"
                  name="address"
                  value={userData.address}
                  onChange={handleUserDataChange}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </FormControl>

              <FormControl
                sx={{ mb: 1, mt: 1, width: '100%', textAlign: 'left' }}
                variant="outlined"
              >
                <p className="genderTxt"> Gender</p>
                <span>
                  <Button
                    className={clinicAdmin.gender === 'male' ? 'selectGender' : 'genderBtn'}
                    variant="contained"
                    sx={{ width: '130px' }}
                    onClick={() => {
                      handleGenderSelection('male');
                    }}
                  >
                    Male
                  </Button>
                  <Button
                    className={clinicAdmin.gender === 'female' ? 'selectGender' : 'genderBtn'}
                    variant="contained"
                    onClick={() => {
                      handleGenderSelection('female');
                    }}
                  >
                    Female
                  </Button>
                  <Button
                    className={clinicAdmin.gender === 'non-binary' ? 'selectGender' : 'genderBtn'}
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
                    showPopperArrow
                    dateFormat="MM-dd-yyyy"
                    name="expiry_date"
                    selected={clinicAdmin.expiry_date}
                    onChange={dateChange}
                    disabled={!checked}
                    placeholderText="Enter expiry date"
                    popperPlacement="bottom-start"
                    showYearDropdown
                    minDate={tomorrow}
                    disablePast
                  />
                </div>
              </FormControl>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            <p className="sendInviteTxt">Send Invite </p>{' '}
            {/* <img src={add} className="spaceOnLeft" alt="" /> */}
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
