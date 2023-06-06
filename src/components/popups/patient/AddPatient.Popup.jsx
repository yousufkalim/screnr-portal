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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import add from '../../../assets/icons/add.svg';
import edit from '../../../assets/icons/edit.svg';
import profiles from '../../../assets/icons/Profiles.svg';
import dropdown from '../../../assets/icons/downArrow.svg';
import CustomPhoneInput from '../general/CustomPhoneInput.Popup';
import ReactSelect from '../../ReactSelect';
import request from '../../../request';
import UserAlreadyExist from '../general/UserAlreadyExist.Popup';
import EmailAlreadyRegisteredPopup from '../general/EmailAlreadyRegistered.Popup';
import UserCreated from '../general/UserCreated.Popup';
import { Store } from '../../../StoreContext';

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

export default function AddNewPatient({ openAddPatient, setOpenAddPatient, getPatients }) {
  const { user } = Store();
  const [checked, setChecked] = useState(false);
  const [clinicians, setClinicians] = useState([]);
  const [clinics, setClinics] = useState({});
  const [patient, setPatient] = useState({});
  const [selectedClinic, setSelectedClinic] = useState('');
  const [alreadyExisitingUser, setAlreadyExisitingUser] = useState(false);
  const [exisitingButInactive, setExisitingButInactive] = useState(false);
  const [added, setAdded] = useState(false);
  const [userData, setUserData] = useState({ diagnosis: '', location: '', clinicians: [] });
  const outlinedInputStyles = useOutlinedInputStyles();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleClose = () => {
    setOpenAddPatient(false);
    setPatient({});
    setChecked(false);
    setClinicians([]);
    setSelectedClinic('');
    setUserData({ diagnosis: '', location: '', clinicians: [] });
  };

  const handleCheck = (event) => setChecked(event.target.checked);
  const handlePatientChange = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });
  const handleUserDataChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

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
    if (myFile) {
      document.getElementById('patientDP').src = URL.createObjectURL(myFile);
    }
    setPatient({ ...patient, profile_pic: myFile });
  };

  const getAllClinics = async () => {
    try {
      const { data } = await request('get', '/staff/getAllClinicsNonPaginated');
      if (data) {
        setClinics(data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getClinicians = async (clinicId) => {
    try {
      const { data } = await request(
        'get',
        `/clinics/getCliniciansByClinicIdNonPaginated/${clinicId}`,
      );
      if (data) {
        setClinicians(
          data.users.map((doctor) => {
            return {
              id: doctor.id,
              optName: `${doctor.first_name} ${doctor.last_name}`,
            };
          }),
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSelectedClinic = async (e) => {
    setSelectedClinic(e.target.value);
    await getClinicians(e.target.value);
  };

  // posting data
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create a new FormData object
      const formData = new FormData();

      if (user?.role === 'clinician') {
        formData.append(`userData[clinicians][0]`, [user?.id]);
      }

      if (patient.expiry_date && !checked) {
        delete patient.expiry_date;
        setPatient({ ...patient });
      }
      // append properties from patient in formdata
      Object.keys(patient).forEach((key) => {
        formData.append(key, patient[key]);
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

      if (patient.phone_number && patient.phone_number.length < 11) {
        return toast.error('Phone number must contain 10 digits');
      }

      if (checked && !patient.expiry_date) {
        return toast.error('Please enter expiry date');
      }

      const emailRegex = /^[\w-]+@screnr\.com$/;
      if (patient.email && !emailRegex.test(patient.email)) {
        return toast.error('Email should be in @screnr.com format');
      }

      // sending this data to api
      const { data } = await request('post', '/clinicians/addPatient', formData);
      if (data) {
        toast.success('Patient added successfully');
        getPatients();
        setAdded(true);
        handleClose();
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
    // Create a new FormData object
    const formData = new FormData();

    if (patient.expiry_date && !checked) {
      delete patient.expiry_date;
      setPatient({ ...patient });
    }
    // append properties from patient in formdata
    Object.keys(patient).forEach((key) => {
      formData.append(key, patient[key]);
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
      formData.append('active', true);
      formData.append('activateUser', true);
    });

    // sending this data to api
    try {
      const { data } = await request('put', '/clinicians/editPatient/undefined', formData);
      if (data) {
        toast.success('Patient added successfully');
        getPatients();
        handleClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user?.role !== 'clinician' && user?.role !== 'clinic') {
      getAllClinics();
    } else if (user?.role === 'clinic') {
      getClinicians(user?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddPatient]);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAddPatient}
        setOpen={setOpenAddPatient}
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
            <h1 className="clinicianPopupTxt">Add New Patient</h1>
            <p className="clinicianSubTxt"> </p>
            <div>
              <div className="imgDivPopup">
                <label htmlFor="patient_AddProfile_Pic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="patient_AddProfile_Pic"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleSelectedFile}
                    className="noDisplay"
                  />
                  <img
                    src={profiles}
                    className="pointer"
                    id="patientDP"
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

            <FormControl
              sx={{
                mt: 3,
                width: '100%',
                display: user?.role === 'clinician' || user?.role === 'clinic' ? 'none' : '',
              }}
              variant="outlined"
            >
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
                name="clinic_name"
                placeholder="Title"
                value={selectedClinic}
                onChange={handleSelectedClinic}
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value="">
                  <span style={{ color: '#949494' }}>Select Clinic Name</span>
                </MenuItem>
                {clinics?.users?.map((row) => (
                  <MenuItem value={row.id}>
                    <span style={{ color: '#949494' }}>{row.userData.clinic_name}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{ mt: 2, width: '100%', display: user?.role === 'clinician' ? 'none' : '' }}
              variant="outlined"
            >
              <ReactSelect dataOptions={clinicians} setUserData={setUserData} />
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
                placeholder="MRN (customizable Unique id)"
                size="normal"
                name="mrn_id"
                value={userData.mrn_id}
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
              <CustomPhoneInput setUserInfo={setPatient} userInfo={patient} />
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
                  maxDate={new Date()}
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
                <MenuItem value="Cancer" style={{ color: '#949494' }}>
                  Cancer
                </MenuItem>
                <MenuItem value="Typhoid" style={{ color: '#949494' }}>
                  Typhoid
                </MenuItem>
                <MenuItem value="Backpain" style={{ color: '#949494' }}>
                  Backpain
                </MenuItem>
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
                <MenuItem value="medial">
                  <span style={{ color: '#949494' }}>Medial</span>
                </MenuItem>
                <MenuItem value="lateral">
                  <span style={{ color: '#949494' }}>Lateral</span>
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
    </>
  );
}
