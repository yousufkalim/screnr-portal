/* eslint-disable no-useless-computed-key */
/* eslint-disable consistent-return */
import { React, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField } from '@mui/material';

const CustomMuiDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(9),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
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

export default function ForgetPasswordPopup({ open, setOpen }) {
  const [email, setEmail] = useState('');
  const outlinedInputStyles = useOutlinedInputStyles();
  const handleInput = (e) => {
    setEmail(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleForgetPassword = () => {
    toast.success('Please check your email to reset your password');
    handleClose();
  };

  return (
    <div>
      <CustomMuiDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: 2,
              }}
            >
              Forgot Password
            </h1>
            <p className="enterEmailTxt">Enter your email so we can send you reset instructions</p>

            <FormControl sx={{ mb: 1, mt: 3, width: '85%' }} variant="outlined">
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
            {window.innerWidth < 768 ? 'Reset' : ' Send Reset Instructions'}
          </Button>
        </DialogActions>
      </CustomMuiDialog>
    </div>
  );
}
