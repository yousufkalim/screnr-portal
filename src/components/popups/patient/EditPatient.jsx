import { React, useState, useEffect } from 'react';
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

// moment
import moment from 'moment';

// react-datepicker import
import DatePicker from 'react-datepicker';

// assets import
import add from '../../../assets/icons/add.svg';
import edit from '../../../assets/icons/edit.svg';
import dropdown from '../../../assets/icons/downArrow.svg';

// child component imports
import useOutlinedInputStyles from '../../../utils/EditFormInput';
import AvatarComponent from '../../Avatar';
import CustomPhoneInput from '../general/CustomPhoneInput';
import { getMediaUrl } from '../../../config';
import ReactSelect from '../../ReactSelect';
import api from '../../../api/index';

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
    // eslint-disable-next-line no-underscore-dangle
    expiry_date: moment(patientDetails?.expiry_date)?._d || '',
  });

  const [userData, setUserData] = useState({
    mrn_id: patientDetails?.userData?.mrn_id,
    diagnosis: patientDetails?.userData?.diagnosis || '',
    location: patientDetails?.userData?.location || '',
    clinicians: patientDetails?.userData?.clinicians || [],
    // eslint-disable-next-line no-underscore-dangle
    dob: moment(patientDetails?.userData?.dob)._d || '',
  });

  const setPatientData = () => {
    setPatient({
      first_name: patientDetails?.first_name,
      last_name: patientDetails?.last_name,
      email: patientDetails?.email,
      profile_pic: patientDetails?.profile_pic,
      phone_number: patientDetails?.phone_number,
      // eslint-disable-next-line no-underscore-dangle
      expiry_date: moment(patientDetails?.expiry_date)?._d || '',
    });
    setUserData({
      mrn_id: patientDetails?.userData?.mrn_id,
      diagnosis: patientDetails?.userData?.diagnosis || '',
      location: patientDetails?.userData?.location || '',
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
    await api('get', `/admins/clinicians/getCliniciansByClinicId/${clinicId}`)
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
        // eslint-disable-next-line no-console
        console.error(`getClinicians --> ${err}`);
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

    // sending this data to api
    const { data } = await api('put', `/admins/patients/${patientDetails.id}`, formData);
    if (data) {
      getPatients();
      handleClose();
      return toast.success('Patient updated successfully');
    }
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
                <label htmlFor="patient_EditProfile_Pic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="patient_EditProfile_Pic"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleSelectedFile}
                    className="noDisplay"
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

            <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
              <ReactSelect dataOptions={clinicians} setUserData={setUserData} userData={userData} />
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
                name="mrn_id"
                value={userData?.mrn_id}
                onChange={handleUserDataChange}
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
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="First Name"
                size="normal"
                name="first_name"
                value={patient.first_name}
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
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="Last Name"
                size="normal"
                name="last_name"
                value={patient.last_name}
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
                id="outlined-email"
                classes={outlinedInputStyles}
                placeholder="Email"
                size="normal"
                type="email"
                name="email"
                value={patient.email}
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
                  showPopperArrow
                  dateFormat="MM-dd-yyyy"
                  name="date"
                  selected={userData.dob}
                  onChange={dobChange}
                  placeholderText="Date of birth"
                  popperPlacement="bottom-start"
                  showYearDropdown
                  openToDate={new Date('01/01/2005')}
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
                name="diagnosis"
                placeholder="Title"
                value={userData.diagnosis}
                onChange={handleUserDataChange}
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value="">
                  <span style={{ color: '#949494' }}>Select Diagnosis</span>
                </MenuItem>
                <MenuItem value="Cancer"> Cancer</MenuItem>
                <MenuItem value="Typhoid"> Typhoid</MenuItem>
                <MenuItem value="Backpain"> Backpain</MenuItem>
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
                value={userData.location}
                onChange={handleUserDataChange}
              >
                <MenuItem disabled selected value="">
                  <span style={{ color: '#949494' }}>Location</span>{' '}
                </MenuItem>
                <MenuItem value="left">
                  {' '}
                  <span style={{ color: '#949494' }}>Left</span>{' '}
                </MenuItem>
                <MenuItem value="right">
                  {' '}
                  <span style={{ color: '#949494' }}>Right</span>{' '}
                </MenuItem>
                <MenuItem value="posterior">
                  {' '}
                  <span style={{ color: '#949494' }}>Posterior</span>{' '}
                </MenuItem>
                <MenuItem value="anterior">
                  {' '}
                  <span style={{ color: '#949494' }}>Anterior</span>{' '}
                </MenuItem>
                <MenuItem value="medical">
                  {' '}
                  <span style={{ color: '#949494' }}>Medial</span>{' '}
                </MenuItem>
                <MenuItem value="lateral">
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
              <div className="date-div" id={!checked ? 'disabledDate' : ''}>
                <DatePicker
                  showPopperArrow
                  dateFormat="MM-dd-yyyy"
                  name="expiry_date"
                  selected={patient.expiry_date}
                  onChange={expDateChange}
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
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            <p className="sendInviteTxt">Send Invite</p>{' '}
            <img src={add} className="spaceOnLeft" alt="" />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
