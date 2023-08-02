/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
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
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import edit from '../../../assets/icons/edit.svg';
// import dropdown from '../../../assets/icons/downArrow.svg';
import AvatarComponent from '../../Avatar/Avatar.Component';
import CustomPhoneInput from '../general/CustomPhoneInput.Popup';
import { getMediaUrl } from '../../../config';
import ReactSelect from '../../ReactSelect';
import request from '../../../request';
import emailValidation from '../../../utils/emailValidation';
import { Store } from '../../../StoreContext';

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

export default function EditPatient({
  openEditPatient,
  setOpenEditPatient,
  getPatients,
  patientDetails,
}) {
  const { user } = Store();
  const [checked, setChecked] = useState(!!patientDetails?.expiry_date);
  const [clinicians, setClinicians] = useState([]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [patient, setPatient] = useState({
    first_name: patientDetails?.first_name,
    last_name: patientDetails?.last_name,
    email: patientDetails?.email,
    profile_pic: patientDetails?.profile_pic,
    phone_number: patientDetails?.phone_number,
    expiry_date: moment(patientDetails?.expiry_date)?._d || '',
  });

  const [userData, setUserData] = useState({
    mrn_id: patientDetails?.userData?.mrn_id,
    diagnosis: patientDetails?.userData?.diagnosis || '',
    location: patientDetails?.userData?.location || [],
    clinicians: patientDetails?.userData?.clinicians || [],
    // eslint-disable-next-line no-underscore-dangle
    dob: moment(patientDetails?.userData?.dob)._d || '',
  });
  console.log('🚀 ~ file: EditPatient.Popup.jsx:97 ~ userData:', userData);

  const setPatientData = () => {
    setPatient({
      first_name: patientDetails?.first_name,
      last_name: patientDetails?.last_name,
      email: patientDetails?.email,
      profile_pic: patientDetails?.profile_pic,
      phone_number: patientDetails?.phone_number,
    });
    if (patientDetails?.expiry_date) {
      // eslint-disable-next-line no-underscore-dangle
      setPatient({ ...patientDetails, expiry_date: moment(patientDetails?.expiry_date)?._d || '' });
      setChecked(true);
    }

    setUserData({
      mrn_id: patientDetails?.userData?.mrn_id,
      diagnosis: patientDetails?.userData?.diagnosis || '',
      location: patientDetails?.userData?.location || [],
      clinicians: patientDetails?.userData?.clinicians || [],
      // eslint-disable-next-line no-underscore-dangle
      dob: moment(patientDetails?.userData?.dob)._d || '',
    });
  };

  useEffect(() => {
    setPatientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditPatient]);

  const clinicId = patientDetails?.userData?.clinicians[0]?.userData?.clinic?.id
    ? patientDetails?.userData?.clinicians[0]?.userData?.clinic?.id
    : patientDetails?.userData?.clinicians[0]?.userData?.clinic;

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenEditPatient(false);
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const expDateChange = (e) => {
    setPatient({
      ...patient,
      expiry_date: e,
    });
  };

  const dobChange = (e) => {
    setUserData({
      ...userData,
      dob: e,
    });
  };

  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 10;

    if (myFile.size > size) {
      return toast.error('File size can not exceed 10 Mb');
    }
    setPatient({ ...patient, profile_pic: myFile });
  };

  const getClinicians = async () => {
    await request('get', `/clinicians/getCliniciansByClinicIdNonPaginated/${clinicId}`)
      .then((res) => {
        if (res.data) {
          setClinicians(
            res.data.users
              .filter((dr) => userData?.clinicians?.filter((_) => _.id === dr.id).length === 0)
              .map((doctor) => {
                return {
                  id: doctor?.id,
                  optName: `${doctor?.first_name} ${doctor?.last_name}`,
                };
              }),
          );
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (clinicId) {
      getClinicians();
    }
    // eslint-disable-next-line
  }, [openEditPatient]);

  // posting data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientCopy = { ...patient };
    // Create a new FormData object
    const formData = new FormData();

    if (patientCopy.expiry_date && !checked) {
      delete patientCopy.expiry_date;
      setPatient({ ...patientCopy });
    }

    if (typeof patientCopy.profile_pic !== 'object') {
      delete patientCopy.profile_pic;
    }

    // append properties from patientCopy in formdata
    Object.keys(patientCopy).forEach((key) => {
      formData.append(key, patientCopy[key]);
    });

    // append properties from userData in formdata
    Object.keys(userData).forEach((key) => {
      if (key === 'clinicians') {
        // if the key is 'clinicians', loop over the array and append each value to the formData object
        userData[key].forEach((value, index) => {
          formData.append(`userData[${key}][${index}]`, value);
        });
      } else if (key === 'location') {
        // if the key is 'location', loop over the array and append each value to the formData object
        userData[key].forEach((value, index) => {
          formData.append(`userData[${key}][${index}]`, value);
        });

        // formData.append(`userData[${key}]`, userData[key]);
      } else {
        // for other properties, simply append the value to the formData object
        formData.append(`userData[${key}]`, userData[key]);
      }
    });

    if (patientCopy.phone_number && patientCopy.phone_number.length < 11) {
      return toast.error('Phone number must contain 10 digits');
    }
    if (checked && !patientCopy.expiry_date) {
      return toast.error('Please enter expiry date');
    }

    // this function will return true if email validation fails (for production only)
    if (emailValidation(patientCopy.email)) {
      return;
    }
    // sending this data to api
    try {
      const { data } = await request(
        'put',
        `/clinicians/editPatient/${patientDetails.id}`,
        formData,
      );
      if (data) {
        handleClose();
        getPatients();
        toast.success('Patient updated successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handlePainLocationChange = (targetLocation) => {
    const isLocationChecked = userData.location.includes(targetLocation);

    if (isLocationChecked) {
      // If the targetLocation is checked, remove it from the location array
      setUserData({
        ...userData,
        location: userData.location.filter((location) => location !== targetLocation),
      });
    } else {
      // If the targetLocation is not checked, add it to the location array
      setUserData({ ...userData, location: [...userData.location, targetLocation] });
    }
  };

  return (
    <div>
      <BootstrapDialog
        fullWidth
        width="40.8%"
        minWidth="90%"
        onClose={handleClose}
        open={openEditPatient}
        setOpen={setOpenEditPatient}
        aria-labelledby="customized-dialog-title"
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
              <h1 className="clinicianPopupTxt">Edit Patient</h1>
              <p className="clinicianSubTxt"> </p>
              <div>
                <div className="imgDivPopup">
                  <label htmlFor="patient_EditProfile_Pic">
                    <input
                      type="file"
                      name="profile_pic"
                      className="noDisplay"
                      accept=".png, .jpg, .jpeg"
                      id="patient_EditProfile_Pic"
                      onChange={handleSelectedFile}
                    />
                    {patient.profile_pic ? (
                      <img
                        src={getMediaUrl(patient.profile_pic)}
                        className="pointer"
                        id="editProfile_selectedImg"
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
                        alt={`${patient?.first_name} ${patient?.last_name}`}
                        className="popups_avatar"
                      />
                    )}
                    <img src={edit} className="addImgIcon" alt="" />
                  </label>
                </div>
              </div>
              <FormControl
                sx={{ mt: 2, width: '100%', display: user.role === 'clinician' ? 'none' : '' }}
                variant="outlined"
              >
                <ReactSelect
                  dataOptions={clinicians}
                  setUserData={setUserData}
                  userData={userData}
                />
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
                  size="normal"
                  name="mrn_id"
                  id="outlined-name"
                  value={userData?.mrn_id}
                  classes={outlinedInputStyles}
                  onChange={handleUserDataChange}
                  placeholder="MRN (customized unique id)"
                />
              </FormControl>

              <FormControl sx={{ mb: 1, mt: 1, width: '48.5%', mr: 1.5 }} variant="outlined">
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
                  size="normal"
                  name="first_name"
                  id="outlined-name"
                  placeholder="First Name"
                  value={patient.first_name}
                  classes={outlinedInputStyles}
                  onChange={handlePatientChange}
                  inputProps={{
                    maxLength: 20,
                  }}
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
                  size="normal"
                  name="last_name"
                  id="outlined-name"
                  placeholder="Last Name"
                  value={patient.last_name}
                  classes={outlinedInputStyles}
                  onChange={handlePatientChange}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              </FormControl>
              <FormControl sx={{ mb: 1, mt: 1, width: '48.5%', mr: 1.5 }} variant="outlined">
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
                  size="normal"
                  type="email"
                  name="email"
                  id="outlined-email"
                  placeholder="Email"
                  value={patient.email}
                  classes={outlinedInputStyles}
                  onChange={handlePatientChange}
                />
              </FormControl>
              <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
                <div className="edit-phone-input">
                  <CustomPhoneInput setUserInfo={setPatient} userInfo={patient} />
                </div>
              </FormControl>
              <FormControl
                sx={{
                  textAlign: 'left',
                  width: '100%',
                  mb: 2,
                }}
              >
                <div className="date-div">
                  <DatePicker
                    name="date"
                    showPopperArrow
                    showYearDropdown
                    onChange={dobChange}
                    dateFormat="MM-dd-yyyy"
                    selected={userData.dob}
                    popperPlacement="bottom-start"
                    placeholderText="Date of birth"
                    openToDate={new Date('01/01/2005')}
                  />
                </div>
              </FormControl>

              <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
                <TextField
                  sx={{
                    borderRadius: '15px',
                    input: {
                      color: 'black',
                      fontSize: '14px',
                      fontWeight: '500',
                      ml: 1,
                    },
                  }}
                  id="outlined-name"
                  classes={outlinedInputStyles}
                  placeholder="Diagnosis"
                  size="normal"
                  name="diagnosis"
                  value={userData.diagnosis}
                  onChange={handleUserDataChange}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              </FormControl>
              <FormControl
                sx={{
                  mb: 1,
                  ml: 0.5,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  color: '#fba622',
                }}
                variant="outlined"
              >
                <FormControlLabel
                  label="Left"
                  control={
                    <Checkbox
                      style={{ color: '#fba622' }}
                      checked={userData.location.includes('left')}
                      onChange={() => {
                        handlePainLocationChange('left');
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Right"
                  control={
                    <Checkbox
                      style={{ color: '#fba622' }}
                      checked={userData.location.includes('right')}
                      onChange={() => {
                        handlePainLocationChange('right');
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Posterior"
                  control={
                    <Checkbox
                      style={{ color: '#fba622' }}
                      checked={userData.location.includes('posterior')}
                      onChange={() => {
                        handlePainLocationChange('posterior');
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Anterior"
                  control={
                    <Checkbox
                      style={{ color: '#fba622' }}
                      checked={userData.location.includes('anterior')}
                      onChange={() => {
                        handlePainLocationChange('anterior');
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Medial"
                  control={
                    <Checkbox
                      style={{ color: '#fba622' }}
                      checked={userData.location.includes('medial')}
                      onChange={() => {
                        handlePainLocationChange('medial');
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Lateral"
                  control={
                    <Checkbox
                      style={{ color: '#fba622' }}
                      checked={userData.location.includes('lateral')}
                      onChange={() => {
                        handlePainLocationChange('lateral');
                      }}
                    />
                  }
                />
              </FormControl>
              {/* <FormControl sx={{ mb: 1, width: '100%' }} variant="outlined">
              <Select
                displayEmpty
                id="demo-simple-select"
                labelId="demo-simple-select-label"
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
                value={userData.location}
                onChange={handleUserDataChange}
              >
                <MenuItem disabled selected value="">
                  <span style={{ color: '#949494' }}>Location</span>
                </MenuItem>
                <MenuItem value="left">
                  <span style={{ color: '#949494' }}>Left</span>
                </MenuItem>
                <MenuItem value="right">
                  <span style={{ color: '#949494' }}>Right</span>
                </MenuItem>
                <MenuItem value="posterior">
                  <span style={{ color: '#949494' }}>Posterior</span>
                </MenuItem>
                <MenuItem value="anterior">
                  <span style={{ color: '#949494' }}>Anterior</span>
                </MenuItem>
                <MenuItem value="medical">
                  <span style={{ color: '#949494' }}>Medial</span>
                </MenuItem>
                <MenuItem value="lateral">
                  <span style={{ color: '#949494' }}>Lateral</span>
                </MenuItem>
              </Select>
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
                <div className="date-div" id={!checked ? 'disabledDate' : ''}>
                  <DatePicker
                    disablePast
                    showPopperArrow
                    showYearDropdown
                    name="expiry_date"
                    minDate={tomorrow}
                    disabled={!checked}
                    dateFormat="MM-dd-yyyy"
                    onChange={expDateChange}
                    popperPlacement="bottom-start"
                    selected={patient?.expiry_date}
                    placeholderText="Enter expiry date"
                  />
                </div>
              </FormControl>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            <p className="sendInviteTxt">Save Changes</p>{' '}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
