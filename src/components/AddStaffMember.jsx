/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
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

// react-avatar import
import Avatar from 'react-avatar';

// react-toastify import
import { toast } from 'react-toastify';

// react-datepicker import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// assets import
import arrow from '../assets/icons/RightArrow.svg';
import edit from '../assets/icons/edit.svg';
import profiles from '../assets/icons/Profiles.svg';
// import api from '../api/index';

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
export default function AddStaffMember({ open, setOpen }) {
  const [editing, setEditing] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  //   const onChangeEvent = (e) => {
  //     setValues({
  //       ...values,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  //   const handleSelectedFile = async (e) => {
  //     const myFile = e.target.files[0];
  //   };

  const handleSubmit = async () => {
    toast.success('Profile edited successfully');
    handleClose();
  };
  const outlinedInputStyles = useOutlinedInputStyles();
  const [checked, setChecked] = useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
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
            <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#FBA622', lineHeight: 2 }}>
              {editing ? 'Edit Staff Member' : ' Add Staff Member'}
            </h1>
            <p className="enterEmailTxt" style={{ fontWeight: '400', marginBottom: '40px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
            <div>
              <div
                style={{
                  width: '26%',
                  height: '145px',
                  margin: 'auto',
                }}
              >
                {editing ? (
                  <>
                    <Avatar
                      name="Arooj Ishfaq"
                      color="#919B9B"
                      style={{
                        width: 'fit-content',
                        height: 'fit-content',
                        borderRadius: '50%',
                      }}
                      round
                      size="140"
                      alt="profile_pic"
                    />
                    <label>
                      <input
                        style={{
                          display: 'none',
                        }}
                        name="profile_pic"
                        type="file"
                        accept="image/*"
                        //   onChange={handleSelectedFile}
                      />

                      <img
                        src={edit}
                        style={{
                          position: 'relative',
                          top: '43%',
                          right: '20%',
                          cursor: 'pointer',
                        }}
                        alt=""
                      />
                    </label>
                  </>
                ) : (
                  <label>
                    <input
                      style={{
                        display: 'none',
                      }}
                      name="profile_pic"
                      type="file"
                      accept="image/*"
                      //   onChange={handleSelectedFile}
                    />{' '}
                    <img
                      src={profiles}
                      style={{
                        cursor: 'pointer',
                      }}
                      alt=""
                    />
                  </label>
                )}
              </div>
            </div>
            <FormControl sx={{ mb: 1, mt: 3, width: '48%', mr: 2 }} variant="outlined">
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
                // value={name}
                // onChange={onChangeEvent}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 3, width: '48%' }} variant="outlined">
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
                // value={name}

                // onChange={onChangeEvent}
              />
            </FormControl>
            <FormControl sx={{ mb: 2, mt: 1, width: '48%', mr: 2 }} variant="outlined">
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
                // value={email}
                name="email"
                // onChange={onChangeEvent}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 1, width: '48%' }} variant="outlined">
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
                inputProps={{
                  maxLength: 10,
                }}
                // value={phone_number}
                // name="phone_number"
                // onChange={onChangeEvent}
              />
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
                }}
                control={
                  <Checkbox defaultChecked onChange={handleCheck} style={{ color: '#136773' }} />
                }
                label={
                  <Typography style={{ color: '#136773', textAlign: 'left', fontWeight: '500' }}>
                    Want to Add expiry date
                  </Typography>
                }
              />
            </FormControl>
            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
                ml: 0.6,
              }}
            >
              <div className="date-div">
                <DatePicker
                  showPopperArrow
                  dateFormat="dd/MMMM/yyyy"
                  name="date"
                  placeholderText="DD/MM/YYYY"
                  // value={date}
                  // selected={date}
                  popperPlacement="bottom-start"
                  showYearDropdown
                  // onChange={dateChange}
                />
              </div>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            {editing ? (
              ' Save Changes'
            ) : (
              <>
                <p>Send Invite &nbsp;</p> <img src={arrow} style={{ width: '20px' }} alt="" />
              </>
            )}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
