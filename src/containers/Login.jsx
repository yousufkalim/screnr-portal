import { Grid, IconButton, InputLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import Visibility from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../assets/Logo.svg';
import Vector from '../assets/loginPgImg.svg';

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid black ',
        borderRadius: '20px',
        fontSize: 16,
        width: '100%',
        height: '100%',
      },
      '&:hover fieldset': {
        borderColor: '#FBA622',
      },
      '&::placeholder fieldset': {
        fontWeight: 500,
      },
      input: {
        '&::placeholder': {
          color: 'red',
        },
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FBA622',
      },
    },
  },
}));
export default function Login() {
  const outlinedInputStyles = useOutlinedInputStyles();

  return (
    <div style={{ background: '#F6FAFB', height: '100vh' }}>
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
              <InputLabel sx={{ mt: 4, mb: 1.3, fontWeight: '600', fontSize: '14px' }}>
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
                      fontWeight: '500',
                      fontFamily: 'Poppins, sans-serif',
                    },
                  }}
                  id="outlined-email"
                  classes={outlinedInputStyles}
                  placeholder="Enter Email"
                  size="normal"
                  name="email"

                  // value={user.email}
                  // onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ mt: 1, mb: 1.3, fontWeight: '600', fontSize: '14px' }}>
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
                      fontFamily: 'Poppins, sans-serif',
                    },
                  }}
                  id="outlined-password"
                  classes={outlinedInputStyles}
                  placeholder="Enter password"
                  size="normal"
                  name="password"
                  //   value={user.password}
                  //   type={showPassword ? 'text' : 'password'}
                  //   onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          //   onClick={handleClickShowPassword}
                          //   onMouseDown={() => setShowPassword(true)}
                          edge="end"
                          sx={{ color: '#FBA622' }}
                        >
                          {/* {showPassword ? ( */}
                          <VisibilityOff />
                          {/* : <Visibility /> */}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  style={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                  }}
                >
                  <p
                    className="forgetPasswordTxt"
                    // onClick={() => setOpen(true)}
                    // onKeyDown={() => setOpen(true)}
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
                // onClick={handleSubmit}
              >
                Login
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
