import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField, IconButton } from '@mui/material';
import useOutlinedInputStyles from '../../../utils/AddFormInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(0),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

export default function UpdatePasswordPopup({
  openUpdateModal,
  setOpenUpdateModal,
  closeProfilePopup,
}) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    password: '',
    newPassword: '',
  });

  const { password, newPassword } = values;
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenUpdateModal(false);
  };

  const handleForgetPassword = async () => {
    toast.success('You have successfully updated your password');
    closeProfilePopup();
    handleClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: { borderRadius: 20, background: 'white', width: 800 },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="forgetPaswdTxt">Change Password</h1>
            <p className="enterEmailTxt">Enter your new password to update!</p>

            <FormControl sx={{ mb: 2, mt: 6, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack">
                <p>Last Password Changed</p>
                <p>13-dec-2021</p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  input: {
                    color: '#454238',
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::placeholder': {
                      opacity: '1 !important',
                    },
                  },
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                placeholder="Password"
                name="password"
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(true)}
                        edge="end"
                        sx={{ color: '#FBA622' }}
                      >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, width: '85%' }} variant="outlined">
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  input: {
                    color: '#454238',
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::placeholder': {
                      opacity: '1 !important',
                    },
                  },
                }}
                id="outlined-password"
                classes={outlinedInputStyles}
                placeholder="New Password"
                name="newPassword"
                size="normal"
                varient="filled"
                value={newPassword}
                type={showNewPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        onMouseDown={() => setShowNewPassword(true)}
                        edge="end"
                        sx={{ color: '#FBA622' }}
                      >
                        {showNewPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '84%' }}>
          <Button onClick={handleForgetPassword} className="resetPasswordBtn" variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
