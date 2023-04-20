import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// mui imports
import { Grid, IconButton, InputLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

// assets import
import Logo from '../assets/icons/Logo.svg';
import Vector from '../assets/images/login/loginPgImg.svg';

// child component import

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
  const [user, setUser] = useState({});
  // console.log('user', user);
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = (name) => {
    setShow((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.password1) {
      toast.error('Please enter a password.');
    } else if (user.password1.length < 8) {
      toast.error('Password must be at least 8 characters.');
    } else if (!user.Confirmpassword) {
      toast.error('Please enter confirm password.');
    } else if (user.Confirmpassword !== user.password1) {
      toast.error('Passwords do not match.');
    } else {
      toast.success('Password Generated successfully.');
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
                  value={user.password1}
                  onChange={handleChange}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  placeholder="Enter Password"
                  size="normal"
                  name="password1"
                  type={show.password ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword('password')}
                          aria-label="toggle password visibility"
                          edge="end"
                          sx={{ color: '#FBA622', mr: 1 }}
                        >
                          {show.password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                sx={{ mt: 1, mb: 1.3, fontWeight: '600', fontSize: '14px', color: '#454238' }}
              >
                Confirm Password
              </InputLabel>
              <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
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
                  name="Confirmpassword"
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSubmit(event);
                    }
                  }}
                  value={user.password}
                  type={show.confirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword('confirmPassword')}
                          aria-label="toggle password visibility"
                          edge="end"
                          sx={{ color: '#FBA622', mr: 1 }}
                        >
                          {show.confirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

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
