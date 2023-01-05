import { React, useState, useEffect } from 'react';

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
import edit from '../../../assets/icons/edit.svg';

// child component imports
import AvatarComponent from '../../Avatar';
import api from '../../../api/index';
import { getMediaUrl } from '../../../config';

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
export default function EditStaffMember({
  openEditStaffMember,
  setOpenEditStaffMember,
  getStaffMembers,
  staffMemberDetails,
}) {
  const [checked, setChecked] = useState(false);
  const [staffMember, setStaffMember] = useState({
    role: 'staff',
  });

  useEffect(() => {
    if (!staffMemberDetails.expiry) {
      setStaffMember({ ...staffMemberDetails, expiry: '' });
    } else {
      setStaffMember({
        ...staffMemberDetails,
        expiry: new Date(staffMemberDetails.expiry),
      });
      setChecked(true);
    }
  }, [staffMemberDetails]);

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenEditStaffMember(false);
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    setStaffMember({ ...staffMember, [e.target.name]: e.target.value });
  };

  const dateChange = (e) => {
    setStaffMember({
      ...staffMember,
      expiry: new Date(e),
    });
  };

  const handleSelectedFile = async (e) => {
    const myFile = e.target.files[0];
    if (myFile) {
      document.getElementById('selectedImg').src = URL.createObjectURL(myFile);
    }

    setStaffMember({ ...staffMember, photo: myFile });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(staffMember).map((key) => formData.append(key, staffMember[key]));
    const { data } = await api('put', `/admins/staffs/${staffMemberDetails._id}`, formData);
    if (data) {
      toast.success('Staff Member edited successfully');
      getStaffMembers();
      handleClose();
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditStaffMember}
        setOpen={setOpenEditStaffMember}
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
            <h1 className="addPopupTxt">Edit Staff Member</h1>
            <p className="addPopupSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div>
              <div className="imgDivPopup">
                {/* Avatar to be used */}
                <label htmlFor="profilePic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleSelectedFile}
                  />

                  {staffMember.photo ? (
                    <img
                      src={getMediaUrl(staffMember.photo)}
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
                  ) : (
                    <AvatarComponent
                      alt={`${staffMember?.first_name} ${staffMember?.last_name}`}
                      className="popups_avatar"
                    />
                  )}
                  <img src={edit} className="addImgIcon" alt="" />
                </label>
              </div>
            </div>
            <FormControl sx={{ mb: 1, mt: 3, width: '48.5%', mr: 2 }} variant="outlined">
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
                value={staffMember?.first_name}
                onChange={handleChange}
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
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder="Last Name"
                size="normal"
                name="last_name"
                onChange={handleChange}
                value={staffMember?.last_name}
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
                  },
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                placeholder="Email"
                size="normal"
                type="email"
                name="email"
                onChange={handleChange}
                value={staffMember?.email}
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
                  },
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                placeholder="Phone Number"
                size="normal"
                type="text"
                name="phone"
                onChange={handleChange}
                value={staffMember?.phone}
              />
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
                control={
                  <Checkbox checked={checked} onChange={handleCheck} style={{ color: '#136773' }} />
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
              <div className="date-div2" id={!checked ? 'disabledDate' : ''}>
                <DatePicker
                  showPopperArrow
                  // dateFormat="dd/MMMM/yyyy"
                  name="expiry"
                  // value={staffMember.expiry}
                  onChange={dateChange}
                  disabled={!checked}
                  selected={staffMember?.expiry}
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
            Save Changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
