import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import request from '../../../request';

const CustomMuiDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    paddingLeft: theme.spacing(5.2),
    paddingRight: theme.spacing(5.2),
    paddingTop: theme.spacing(10),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(5.2),
    paddingRight: theme.spacing(5.2),
    paddingBottom: theme.spacing(8),
    margin: 'auto',
  },
}));

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #E1E1E1 ',
        borderRadius: '20px',
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#FBA622',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FBA622',
      },
    },
  },
});

export default function ForgetPasswordPopup({
  openForgetPasswordPopup,
  setOpenForgetPasswordPopup,
}) {
  const [email, setEmail] = useState('');
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleInput = (e) => setEmail(e.target.value);
  const handleClose = () => setOpenForgetPasswordPopup(false);

  const handleForgetPassword = async () => {
    if (!email) {
      return toast.error('Please enter your email');
    }
    await request('put', `/auth/forgot/${email}`);
    handleClose();
    return toast.success('Please check your email to reset your password');
  };

  return (
    <div>
      <CustomMuiDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openForgetPasswordPopup}
        setOpen={setOpenForgetPasswordPopup}
        fullWidth
        width="35%"
        minWidth="300px"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography>
            <h1 className="forgetPaswdTxt">Forgot Password</h1>
            <p className="enterEmailTxt">
              Enter your email so we can send you a verification email
            </p>

            <FormControl sx={{ mb: 1, mt: 4, width: '100%' }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: '#000000',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginLeft: '20px',
                  },
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                placeholder="Enter Your Email"
                size="normal"
                value={email}
                type={email}
                onChange={handleInput}
              />
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleForgetPassword} className="resetPasswordBtn" variant="contained">
            Send Reset Instructions
          </Button>
        </DialogActions>
      </CustomMuiDialog>
    </div>
  );
}
