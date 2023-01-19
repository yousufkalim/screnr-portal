import { React, useState } from 'react';

// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';

// react-toastify import
import { toast } from 'react-toastify';

// react-datepicker import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// assets import
import add from '../../../assets/icons/add.svg';
import profiles from '../../../assets/icons/Profiles.svg';
import api from '../../../api/index';
import edit from '../../../assets/icons/edit.svg';

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
export default function AddClinicAdmin({
  openAddClinicAdmin,
  setOpenAddClinicAdmin,
  getClinicAdmins,
}) {
  const [checked, setChecked] = useState(false);
  const [clinicAdmin, setClinicAdmin] = useState({
    role: 'clinicadmin',
    first_name: 'a',
    last_name: 'b',
    password: '12345678',
    confirmPassword: '12345678',
  });
  const [selectedGender, setSelectedGender] = useState('');
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenAddClinicAdmin(false);
  };

  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const [file] = document.getElementById('profilePic').files;

    if (file) {
      document.getElementById('selectedImg').src = URL.createObjectURL(file);
    }
    setClinicAdmin({ ...clinicAdmin, image: myFile });
  };

  const handleChange = (e) => {
    setClinicAdmin({ ...clinicAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    setClinicAdmin({ ...clinicAdmin, gender: selectedGender });
    Object.keys(clinicAdmin).map((key) => formData.append(key, clinicAdmin[key]));
    const { data } = await api('post', '/admins/clinics', formData);
    if (data) {
      toast.success('Clinic Admin added successfully');
      getClinicAdmins();
      handleClose();
    }
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
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
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="addPopupTxt">Add New Clinic Admin</h1>
            <p className="addPopupSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div>
              <div className="imgDivPopup">
                <label htmlFor="profilePic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleSelectedFile}
                  />
                  <img
                    src={profiles}
                    className="pointer"
                    id="selectedImg"
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
                value={clinicAdmin.clinic_name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 2.7, width: '48.5%', mr: 2 }} variant="outlined">
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
                placeholder="Manager Name"
                size="normal"
                name="manager_name"
                value={clinicAdmin.manager_name}
                onChange={handleChange}
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
                id="outlined-phone"
                classes={outlinedInputStyles}
                placeholder="Phone Number"
                size="normal"
                type="text"
                name="phone"
                value={clinicAdmin.phone}
                onChange={handleChange}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </FormControl>

            <FormControl sx={{ mb: 2, mt: 1, width: '48.5%', mr: 2 }} variant="outlined">
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
                value={clinicAdmin.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '100%', textAlign: 'left' }} variant="outlined">
              <p className="genderTxt"> Gender</p>
              <span>
                <Button
                  className={selectedGender === 'male' ? 'selectGender' : 'genderBtn'}
                  variant="contained"
                  onClick={() => {
                    setSelectedGender('male');
                  }}
                >
                  Male
                </Button>
                <Button
                  className={selectedGender === 'female' ? 'selectGender' : 'genderBtn'}
                  variant="contained"
                  onClick={() => {
                    setSelectedGender('female');
                  }}
                >
                  Female
                </Button>
                <Button
                  className={selectedGender === 'other' ? 'selectGender' : 'genderBtn'}
                  variant="contained"
                  onClick={() => {
                    setSelectedGender('other');
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
                  <Checkbox onChange={handleCheck} checked={checked} style={{ color: '#136773' }} />
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
                  dateFormat="dd/MMMM/yyyy"
                  name="expiry"
                  value={clinicAdmin.expiry}
                  onChange={handleChange}
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
            <p className="sendInviteTxt">Send Invite &nbsp;</p> <img src={add} alt="" />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
