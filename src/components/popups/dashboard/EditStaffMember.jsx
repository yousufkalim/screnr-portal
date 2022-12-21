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
export default function EditStaffMember({ openEditStaffMember, setOpenEditStaffMember }) {
  const [setChecked] = useState(true);
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenEditStaffMember(false);
  };

  const handleSubmit = async () => {
    toast.success('Profile edited successfully');
    handleClose();
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
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
                  <input name="profile_pic" type="file" id="profilePic" accept="image/*" />

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
                inputProps={{
                  maxLength: 10,
                }}
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
              }}
            >
              <div className="date-div2">
                <DatePicker
                  showPopperArrow
                  dateFormat="dd/MMMM/yyyy"
                  name="date"
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
