import { React } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, Button } from '@mui/material';
// moment
import moment from 'moment';

// assets imports
import { ReactComponent as Phone } from '../../../assets/icons/phoneIcon.svg';
import { ReactComponent as Mail } from '../../../assets/icons/mailIcon.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/logoutArrow.svg';
import edit from '../../../assets/icons/sidebarEdit.svg';

// child imports
import AvatarComponent from '../../Avatar/Avatar.Component';
import { Store, UpdateStore } from '../../../StoreContext';
import { getMediaUrl } from '../../../config';
import PhoneFormat from '../../../utils/PhoneFormat';
import request from '../../../request';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingBottom: theme.spacing(7),
    paddingTop: theme.spacing(0),
    margin: 'auto',
  },
  [theme.breakpoints.down('1800')]: {
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(6),
      textAlign: 'center',
    },
  },
}));

export default function ProfilePopup({
  openProfilePopup,
  setOpenProfilePopup,
  setOpenPasswordPopup,
  setOpenEditProfilePopup,
}) {
  const { user } = Store();
  const updateStore = UpdateStore();
  const handleClose = () => {
    setOpenProfilePopup(false);
  };

  const handleLogout = () => {
    request('patch', '/auth/logout/');
    localStorage.removeItem('token');
    updateStore({ user: {}, loggedIn: false });
    window.location = '/login';
  };

  const roles = {
    admin: 'Super Admin',
    staff: 'Staff Admin',
    clinic: 'Clinic Admin',
    clinician: 'Clinician',
    patient: 'Patient',
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openProfilePopup}
        setOpen={setOpenProfilePopup}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 20,
            background: 'white',
            width: 750,
          },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <div>
              <div className="imgDivPopupProfile">
                {/* Avatar to be used */}
                <label htmlFor="profilePic">
                  {user.profile_pic ? (
                    <img
                      src={getMediaUrl(user.profile_pic)}
                      className="pointer"
                      id="selectedImg"
                      style={{
                        width: '122px',
                        borderRadius: '100px',
                        height: '100%',
                        objectFit: 'cover',
                        border: ' 3px solid #faa017',
                      }}
                      alt=""
                    />
                  ) : (
                    <AvatarComponent
                      alt={`${user.first_name} ${user.last_name}`}
                      className="profile_popups_avatar"
                    />
                  )}
                  <img
                    src={edit}
                    className="addDPIcon"
                    role="presentation"
                    onClick={() => {
                      setOpenEditProfilePopup(true);
                      setOpenProfilePopup(false);
                    }}
                    alt=""
                  />
                </label>
              </div>
            </div>
            <h1 className="forgetPaswdTxt">{`${user.first_name} ${user.last_name}`}</h1>
            <p className="enterEmailTxt">{roles[user?.role]}</p>
            <FormControl sx={{ mb: 2, mt: 6, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack" htmlFor="phone">
                <p className="inputDiv">
                  <Phone className="customFieldIcon" /> Phone Number
                </p>
                <p className="blktxt" id="fontWeight">
                  {' '}
                  {PhoneFormat(user.phone_number)}
                </p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack" htmlFor="email">
                <p className="inputDiv">
                  <Mail className="customFieldIcon" /> Email
                </p>

                <p className="blktxt" id="fontWeight">
                  {user.email}
                </p>
              </div>
            </FormControl>

            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack">
                <p>Last Password Changed</p>
                <p>{moment(user.last_password_changed).format('MM-DD-YYYY')}</p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack">
                <p className="blktxt">Password</p>
                <p
                  className="passwordChangeTxt"
                  role="presentation"
                  onClick={() => {
                    setOpenPasswordPopup(true);
                    setOpenProfilePopup(false);
                  }}
                >
                  Change Password
                </p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 1, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack">
                <p className="blktxt">Account Created</p>
                <p className="blktxt">{moment(user.createdAt).format('MM-DD-YYYY')}</p>
              </div>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '84%' }}>
          <Button onClick={handleLogout} className="logoutBtn" variant="contained">
            <p className="logoutTxt"> Logout</p>
            <Arrow className="logoutArrow" />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
