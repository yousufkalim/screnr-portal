import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';
import PhoneInput from 'react-phone-input-2';
import moment from 'moment';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar/Avatar.Component';
import request from '../../../request';
import edit from '../../../assets/icons/edit.svg';
import emailValidation from '../../../utils/emailValidation';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #454238',
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
        borderColor: '#FBA622',
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

export default function EditClinicAdmin({
  table,
  openEditClinicAdmin,
  setOpenEditClinicAdmin,
  clinicAdminDetails,
  getClinicianData,
}) {
  const outlinedInputStyles = useOutlinedInputStyles();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({});
  const [clinicAdmin, setClinicAdmin] = useState({});
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const futureYear = new Date();
  futureYear.setFullYear(futureYear.getFullYear() + 10);

  const dateChange = (e) => {
    setClinicAdmin({
      ...clinicAdmin,
      expiry_date: e,
    });
  };

  const handleGenderSelection = (name) => {
    setClinicAdmin({ ...clinicAdmin, gender: name });
  };

  useEffect(() => {
    const clinicAdminTemp = {
      first_name: clinicAdminDetails.first_name,
      last_name: clinicAdminDetails.last_name,
      email: clinicAdminDetails.email,
      profile_pic: clinicAdminDetails.profile_pic,
      phone_number: clinicAdminDetails.phone_number,
      gender: clinicAdminDetails.gender,
    };

    if (clinicAdminDetails.expiry_date) {
      // eslint-disable-next-line no-underscore-dangle
      clinicAdminTemp.expiry_date = moment(clinicAdminDetails.expiry_date)._d;
      setChecked(true);
    }

    setClinicAdmin(clinicAdminTemp);
    setUserData({
      clinic_name: clinicAdminDetails?.userData?.clinic_name,
      address: clinicAdminDetails?.userData?.address,
      staff:
        table === 'allClinicAdminsTable'
          ? clinicAdminDetails?.userData?.staff.id
          : clinicAdminDetails?.userData?.staff,
    });
  }, [clinicAdminDetails, table]);

  const handleClose = () => {
    setOpenEditClinicAdmin(false);
  };

  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 10;

    if (myFile.size > size) {
      return toast.error('File size can not exceed 10 Mb');
    }
    setClinicAdmin({ ...clinicAdmin, profile_pic: myFile });
  };

  const handleChange = (e) => {
    setClinicAdmin({ ...clinicAdmin, [e.target.name]: e.target.value });
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clinicAdminCopy = { ...clinicAdmin };
    // Create a new FormData object
    const formData = new FormData();

    if (clinicAdminCopy.expiry_date && !checked) {
      clinicAdminCopy.expiry_date = '';
      setClinicAdmin({ ...clinicAdminCopy });
    }

    if (typeof clinicAdminCopy.profile_pic !== 'object') {
      delete clinicAdminCopy.profile_pic;
    }
    if (!clinicAdminCopy.gender) {
      delete clinicAdminCopy.gender;
      setClinicAdmin({ ...clinicAdminCopy });
    }

    Object.keys(clinicAdminCopy).forEach((key) => {
      formData.append(key, clinicAdminCopy[key]);
    });

    Object.keys(userData).forEach((key) => {
      formData.append(`userData[${key}]`, userData[key]);
    });

    if (clinicAdminCopy.phone_number && clinicAdminCopy.phone_number.length < 11) {
      return toast.error('Phone number must contain 10 digits');
    }
    if (checked && !clinicAdminCopy.expiry_date) {
      return toast.error('Please enter expiration date');
    }

    // this function will return true if email validation fails (for production only)
    if (emailValidation(clinicAdminCopy.email)) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await request('put', `/staff/editClinic/${clinicAdminDetails.id}`, formData);
      if (data) {
        toast.success('Clinic Admin updated successfully');
        setOpenEditClinicAdmin(false);
        getClinicianData();
        handleClose();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleDeleteUser = async (targetUserId) => {
    await request('delete', `/staff/deleteClinic/${targetUserId}`)
      .then(() => {
        toast.success('Clinic Admin Deactivated successfully');
        setOpenEditClinicAdmin(false);
        getClinicianData();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditClinicAdmin}
        setOpen={setOpenEditClinicAdmin}
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
              <h1 className="addPopupTxt">Edit Clinic Admin</h1>
              <p className="addPopupSubTxt"> </p>
              <div>
                <div className="imgDivPopup">
                  {/* Avatar to be used */}
                  <label htmlFor="edit_profilePic">
                    <input
                      name="profile_pic"
                      type="file"
                      id="edit_profilePic"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleSelectedFile}
                      className="noDisplay"
                    />

                    {clinicAdmin.profile_pic ? (
                      <img
                        src={getMediaUrl(clinicAdmin.profile_pic)}
                        className="pointer"
                        id="edit_selectedImg"
                        style={{
                          width: '100%',
                          borderRadius: '100px',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        alt=""
                      />
                    ) : (
                      <AvatarComponent
                        alt={`${clinicAdmin?.first_name} ${clinicAdmin?.last_name}`}
                        className="popups_avatar"
                      />
                    )}
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
                <div className="edit-phone-input">
                  <PhoneInput
                    country="us"
                    onlyCountries={['us']}
                    value={clinicAdmin.phone_number}
                    onChange={(value) => {
                      setClinicAdmin({ ...clinicAdmin, phone_number: value });
                    }}
                    disableDropdown
                    countryCodeEditable={false}
                    disableCountryGuess
                  />
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
              {/* <FormControl
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
                      // onChange={handleCheck}
                      // checked={checked}
                      style={{ color: '#136773' }}
                    />
                  }
                  label={
                    <Typography
                      style={{
                        color: 'black',
                        textAlign: 'left',
                        fontWeight: '500',
                      }}
                    >
                      Click to disable this user
                    </Typography>
                  }
                />
              </FormControl> */}
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
                      Want to Add expiration date
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
                    dateFormat="MM-dd-yyyy"
                    name="expiry_date"
                    onChange={dateChange}
                    disabled={!checked}
                    selected={clinicAdmin?.expiry_date}
                    placeholderText="Enter expiration date"
                    popperPlacement="bottom-start"
                    showYearDropdown
                    // minDate={tomorrow}
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
          <Button
            className="deactivateUserBtn"
            variant="contained"
            onClick={() => {
              handleDeleteUser(clinicAdminDetails?.id);
            }}
          >
            Deactivate User
          </Button>
          <Button
            onClick={handleSubmit}
            className={loading ? 'resetPasswordBtnloading' : 'resetPasswordBtn'}
            variant="contained"
            disabled={loading}
          >
            {loading && (
              <div style={{ height: 'inherit' }} className="progressContainer">
                <CircularProgress className="whiteCircularProgress" size={20} />
              </div>
            )}
            <p className="sendInviteTxt">Save Changes</p>{' '}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
