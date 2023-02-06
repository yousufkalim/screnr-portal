import { useState } from 'react';

// navigator import
import { useNavigate } from 'react-router-dom';

// mui imports
import { Grid, IconButton, InputLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

// assets import
import Logo from '../assets/icons/Logo.svg';
import Vector from '../assets/images/login/loginPgImg.svg';

// child component import
import ForgetPasswordPopup from '../components/ForgetPasswordPopup';
import { UpdateStore } from '../StoreContext';
import api from '../api';

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
  const [openForgetPasswordPopup, setOpenForgetPasswordPopup] = useState(false);
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const updateStore = UpdateStore();
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api('post', '/auth/login', user);
    updateStore({ admin: data.admin, loggedIn: true });
    navigate('/dashboard');
    window.location.reload();
  };
  return (
    <div className="loginScreenBG">
      <Grid container>
        <Grid lg={12} xl={12} className="mainLoginDiv" />
        <Grid lg={6.5} xl={6.5}>
          <div className="logoDiv">
            <img src={Logo} className="loginPglogo" alt="" />
            <h1 className="logoHeading">Super Admin</h1>
          </div>
          <img src={Vector} className="loginPgImg" alt="" />
        </Grid>
        <Grid lg={5.5} xl={5.5}>
          <div className="loginForm">
            <h1 className="loginformHeading"> Welcome back !</h1>
            <p className="loginformSubHeading">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
            <Grid item xs={12}>
              <InputLabel
                sx={{ mt: 4, mb: 1.3, fontWeight: '600', fontSize: '14px', color: '#454238' }}
              >
                Email
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
                        padding: '13px',
                      },
                    },
                  }}
                  value={user.email}
                  onChange={handleChange}
                  id="outlined-email"
                  classes={outlinedInputStyles}
                  placeholder="Enter Email"
                  size="normal"
                  name="email"
                  type="email"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                sx={{ mt: 1, mb: 1.3, fontWeight: '600', fontSize: '14px', color: '#454238' }}
              >
                Password
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
                        padding: '13px',
                      },
                    },
                  }}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  placeholder="Enter password"
                  size="normal"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleClickShowPassword}
                          aria-label="toggle password visibility"
                          edge="end"
                          sx={{ color: '#FBA622', mr: 1 }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="forget-txt">
                  <p
                    className="forgetPasswordTxt"
                    onClick={() => setOpenForgetPasswordPopup(true)}
                    role="presentation"
                    aria-hidden
                  >
                    Forgot Password ?
                  </p>
                </div>
              </FormControl>

              <Button
                className="logInBtn"
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Login
              </Button>
            </Grid>
            {openForgetPasswordPopup && (
              <ForgetPasswordPopup
                openForgetPasswordPopup={openForgetPasswordPopup}
                setOpenForgetPasswordPopup={setOpenForgetPasswordPopup}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
