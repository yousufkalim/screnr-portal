import { React, useState } from 'react';
import { makeStyles } from '@mui/styles';
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
import { FormControl, TextField, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { Store } from '../../../StoreContext';
import request from '../../../request';

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

export default function UpdatePasswordPopup({ openUpdateModal, setOpenUpdateModal }) {
  const [showPassword, setShowPassword] = useState({
    showNew: false,
    showOld: false,
    showConfirm: false,
  });
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { showNew, showOld, showConfirm } = showPassword;
  const { oldPassword, newPassword, confirmPassword } = values;
  const { user } = Store();
  const { id } = user;

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpenUpdateModal(false);
    setValues({});
  };

  const handleForgetPassword = async () => {
    await request('put', `/auth/password/${id}`, values);
    handleClose();
    return toast.success('You have successfully updated your password');
  };

  return (
    <div style={{ display: 'none' }}>
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
            <h1 className="forgetPaswdTxtchng">Change Password</h1>
            <p className="enterEmailTxt">Enter your new password to update!</p>

            <FormControl sx={{ mt: 4, mb: 2, width: '85%' }} variant="outlined">
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
                name="oldPassword"
                value={oldPassword}
                type={showOld ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword({ ...showPassword, showOld: !showOld })}
                        onMouseDown={() => setShowPassword({ ...showPassword, showOld: !showOld })}
                        edge="end"
                        sx={{ color: '#FBA622' }}
                      >
                        {showOld ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                placeholder="New Password"
                name="newPassword"
                size="normal"
                varient="filled"
                value={newPassword}
                type={showNew ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword({ ...showPassword, showNew: !showNew })}
                        onMouseDown={() => setShowPassword({ ...showPassword, showNew: !showNew })}
                        edge="end"
                        sx={{ color: '#FBA622' }}
                      >
                        {showNew ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                placeholder="Confirm Password"
                name="confirmPassword"
                size="normal"
                varient="filled"
                value={confirmPassword}
                type={showConfirm ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword({ ...showPassword, showConfirm: !showConfirm });
                        }}
                        onMouseDown={() =>
                          setShowPassword({
                            ...showPassword,
                            showConfirm: !showConfirm,
                          })
                        }
                        edge="end"
                        sx={{ color: '#FBA622' }}
                      >
                        {showConfirm ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
