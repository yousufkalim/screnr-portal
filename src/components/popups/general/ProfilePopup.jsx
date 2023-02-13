import { React } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';

// assets imports
import { ReactComponent as Phone } from '../../../assets/icons/phoneIcon.svg';
import { ReactComponent as Mail } from '../../../assets/icons/mailIcon.svg';
import { ReactComponent as Location } from '../../../assets/icons/location.svg';
import edit from '../../../assets/icons/sidebarEdit.svg';

// child imports
import AvatarComponent from '../../Avatar';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    textAlign: 'center',
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
  const handleClose = () => {
    setOpenProfilePopup(false);
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
            width: 800,
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
                  {/* {staffMember.photo ? (
                    <img
                      src={getMediaUrl(staffMember.photo)}
                      className="pointer"
                      id="selectedImg"
                      style={{
                        width: '100%',
                        borderRadius: '100px',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      
                      alt=""
                    />
                  ) : ( */}
                  <AvatarComponent alt="A Q" className="profile_popups_avatar" />
                  {/* )} */}
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
            <h1 className="forgetPaswdTxt">Ahmed Qadri</h1>
            <p className="enterEmailTxt">Superadmin</p>
            <FormControl sx={{ mb: 2, mt: 6, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack" htmlFor="phone">
                <p className="inputDiv">
                  <Phone className="customFieldIcon" /> Phone Number
                </p>
                <p className="blktxt" id="fontWeight">
                  {' '}
                  +92 312 4567890
                </p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack" htmlFor="email">
                <p className="inputDiv">
                  <Mail className="customFieldIcon" /> Email
                </p>

                <p className="blktxt" id="fontWeight">
                  Ahmed@screnr.com
                </p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack" htmlFor="address">
                <p className="inputDiv">
                  <Location className="customFieldIcon" /> Address
                </p>
                <p className="blktxt" id="fontWeight">
                  Johar Town, Lahore
                </p>
              </div>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <div className="pswdChangeTrack">
                <p>Last Password Changed</p>
                <p>13-dec-2021</p>
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
                <p className="blktxt">13-July-2021</p>
              </div>
            </FormControl>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
