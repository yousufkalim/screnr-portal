import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Checkbox,
  Grid,
  //  IconButton,
  InputLabel,
} from '@mui/material';
// import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Logo from '../assets/icons/Logo.svg';
import Vector from '../assets/images/login/loginPgImg.svg';
import request from '../request';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #454238',
        borderRadius: '20px',
        fontSize: 16,
        width: '100%',
        height: '100%',
        '@media (max-width: 1900px)': {
          height: 50,
        },
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

export default function Login() {
  const params = useParams();
  const naviagte = useNavigate();
  const { token } = params;
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const outlinedInputStyles = useOutlinedInputStyles();

  const handlePasswordChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = (name) => {
    setUser((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const handleResetPage = () => {
    setUser({
      password: '',
      confirmPassword: '',
      showPassword: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.password) {
      toast.error('Please enter a password.');
    } else if (user.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
    } else if (!user.confirmPassword) {
      toast.error('Please enter confirm password.');
    } else if (user.confirmPassword !== user.password) {
      toast.error('Passwords do not match.');
    } else {
      await request('post', '/auth/verify-email', {
        password: user.password,
        confirmPassword: user.confirmPassword,
        token: token && token,
      })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          handleResetPage();
          naviagte('/login');
        })
        .catch((err) => {
          console.log(err);
          naviagte('/login');
        });
    }
  };

  return (
    <div className="loginScreenBG">
      <Grid container>
        <Grid lg={12} xl={12} className="mainLoginDiv" />
        <Grid lg={6.5} xl={6.5}>
          <div className="logoDiv">
            <img src={Logo} className="loginPglogo" alt="" />
          </div>
          <img src={Vector} className="loginPgImg" alt="" />
        </Grid>
        <Grid lg={5.5} xl={5.5}>
          <div className="loginForm">
            <h1 className="loginformHeading"> Generate Password </h1>
            <Grid item xs={12}>
              <InputLabel
                sx={{ mt: 4, mb: 1.3, fontWeight: '600', fontSize: '14px', color: '#454238' }}
              >
                Password
              </InputLabel>
              <FormControl sx={{ mb: 2.5, width: '100%' }} variant="outlined">
                <TextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    input: {
                      color: '#1b1b1b',
                      fontSize: '16px',
                      marginLeft: '15px',
                      fontWeight: '500',
                      '@media (max-width: 1900px)': {
                        padding: '11px',
                      },
                    },
                  }}
                  value={user.password}
                  onChange={(e) => {
                    handlePasswordChange(e.target.name, e.target.value);
                  }}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  placeholder="Enter Password"
                  size="normal"
                  name="password"
                  type={user.showPassword ? 'text' : 'password'}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         onClick={() => handleClickShowPassword('showPassword')}
                  //         aria-label="toggle password visibility"
                  //         edge="end"
                  //         sx={{ color: '#FBA622', mr: 1 }}
                  //       >
                  //         {user.showPassword ? <Visibility /> : <VisibilityOff />}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                sx={{ mt: 1, mb: 1.3, fontWeight: '600', fontSize: '14px', color: '#454238' }}
              >
                Confirm Password
              </InputLabel>
              <FormControl sx={{ mb: 0.5, width: '100%' }} variant="outlined">
                <TextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    mb: 1,
                    input: {
                      color: '#1b1b1b',
                      fontSize: '16px',
                      fontWeight: '500',
                      marginLeft: '15px',
                      fontFamily: 'Poppins, sans-serif',
                      '@media (max-width: 1900px)': {
                        padding: '11px',
                      },
                    },
                  }}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  placeholder="Confirm password"
                  size="normal"
                  name="confirmPassword"
                  onChange={(e) => {
                    handlePasswordChange(e.target.name, e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSubmit(event);
                    }
                  }}
                  value={user.confirmPassword}
                  type={user.showPassword ? 'text' : 'password'}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         onClick={() => handleClickShowPassword('showPassword')}
                  //         aria-label="toggle password visibility"
                  //         edge="end"
                  //         sx={{ color: '#FBA622', mr: 1 }}
                  //       >
                  //         {user.showPassword ? <Visibility /> : <VisibilityOff />}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </FormControl>

              <InputLabel
                sx={{
                  mb: 8,
                  fontWeight: '500',
                  color: '#454238',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '10px',
                }}
              >
                <Checkbox
                  sx={{
                    color: '#454238',
                    padding: '0px',
                    '&.Mui-checked': {
                      color: '#FBA622',
                    },
                  }}
                  onClick={() => handleClickShowPassword('showPassword')}
                />
                <span>Show password</span>
              </InputLabel>

              <Button className="logInBtn" variant="contained" onClick={handleSubmit}>
                Verify
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
