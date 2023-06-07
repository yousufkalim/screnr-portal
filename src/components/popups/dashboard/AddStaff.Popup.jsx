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
import CustomPhoneInput from '../general/CustomPhoneInput.Popup';
import 'react-datepicker/dist/react-datepicker.css';
import arrow from '../../../assets/icons/RightArrow.svg';
import edit from '../../../assets/icons/edit.svg';
import profiles from '../../../assets/icons/Profiles.svg';
import EmailAlreadyRegisteredPopup from '../general/EmailAlreadyRegistered.Popup';
import UserCreated from '../general/UserCreated.Popup';
import request from '../../../request';
import UserAlreadyExist from '../general/UserAlreadyExist.Popup';

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

export default function AddStaffMember({
  openAddStaffMember,
  setOpenAddStaffMember,
  getStaffMembers,
}) {
  const [checked, setChecked] = useState(false);
  const [alreadyExisitingUser, setAlreadyExisitingUser] = useState(false);
  const [exisitingButInactive, setExisitingButInactive] = useState(false);
  const [added, setAdded] = useState(false);
  const [staffMember, setStaffMember] = useState({});

  const outlinedInputStyles = useOutlinedInputStyles();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleClose = () => {
    setOpenAddStaffMember(false);
    setStaffMember({});
  };

  const handleChange = (e) => {
    setStaffMember({ ...staffMember, [e.target.name]: e.target.value });
  };
  const dateChange = (e) => {
    setStaffMember({
      ...staffMember,
      expiry_date: e,
    });
  };

  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 10;

    if (myFile.size > size) {
      return toast.error('File size can not exceed 10 Mb');
    }
    if (myFile) {
      document.getElementById('selectedImg').src = URL.createObjectURL(myFile);
    }
    setStaffMember({ ...staffMember, profile_pic: myFile });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const staffMemberCopy = { ...staffMember };
      const formData = new FormData();

      if (staffMemberCopy.expiry_date && !checked) {
        delete staffMemberCopy.expiry_date;
        setStaffMember({ ...staffMemberCopy });
      }

      Object.keys(staffMemberCopy).map((key) => formData.append(key, staffMemberCopy[key]));

      if (staffMemberCopy.phone_number && staffMemberCopy.phone_number.length < 11) {
        return toast.error('Phone number must contain 10 digits');
      }
      if (checked && !staffMemberCopy.expiry_date) {
        return toast.error('Please enter expiry date');
      }
      const emailRegex = /^[\w-]+@screnrhealth\.com$/i;
      if (staffMemberCopy.email && !emailRegex.test(staffMemberCopy.email)) {
        return toast.error('Email should be in @screnrhealth.com format');
      }
      const { data } = await request('post', '/admins/addStaff', formData);

      if (data) {
        getStaffMembers();
        setStaffMember({});
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
    const staffMemberCopy = { ...staffMember };
    const formData = new FormData();

    Object.keys(staffMemberCopy).map((key) => formData.append(key, staffMemberCopy[key]));
    formData.append('active', true);
    formData.append('activateUser', true);

    try {
      const { data } = await request('put', '/admins/editStaff/undefined', formData);
      if (data) {
        getStaffMembers();
        setStaffMember({});
        return toast.success('User added successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
        open={openAddStaffMember}
        setOpen={setOpenAddStaffMember}
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
            <h1 className="addPopupTxt">Add Staff Member</h1>
            <p className="addPopupSubTxt"> </p>
            <div>
              <div className="imgDivPopup">
                <label htmlFor="profilePic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="profilePic"
                    accept=".png, .jpg, .jpeg"
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
            {/* N */}
            <FormControl sx={{ mb: 1, mt: 3, width: '48.5%', mr: 1.5 }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder="First Name"
                size="normal"
                name="first_name"
                value={staffMember.first_name}
                onChange={handleChange}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 3, width: '48.5%' }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="Last Name"
                size="normal"
                name="last_name"
                onChange={handleChange}
                value={staffMember.last_name}
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
                  },
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                placeholder="Email"
                size="normal"
                name="email"
                onChange={handleChange}
                value={staffMember.email}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
              <div>
                <CustomPhoneInput setUserInfo={setStaffMember} userInfo={staffMember} />
              </div>
            </FormControl>

            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
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
                  onChange={dateChange}
                  disabled={!checked}
                  selected={staffMember.expiry_date}
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
            <p>Send Invite</p> <img src={arrow} className="arrowIcon" alt="" />
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
