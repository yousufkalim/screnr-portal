import { React } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, Button } from '@mui/material';

// assets imports
import { ReactComponent as Phone } from '../../../assets/icons/phoneIcon.svg';
import { ReactComponent as Mail } from '../../../assets/icons/mailIcon.svg';
import { ReactComponent as Location } from '../../../assets/icons/location.svg';
import edit from '../../../assets/icons/edit.svg';

// child imports
import AvatarComponent from '../../Avatar';

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
    margin: 'auto',
  },
}));

export default function EditProfilePopup({ openEditProfilePopup, setOpenEditProfilePopup }) {
  const handleSelectedFile = async () => {
    // const myFile = e.target.files[0];
    // setValues({ ...values, profile_pic: myFile });
  };

  const handleClose = () => {
    setOpenEditProfilePopup(false);
  };

  const handleSubmit = () => {
    setOpenEditProfilePopup(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditProfilePopup}
        setOpen={setOpenEditProfilePopup}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: { borderRadius: 20, background: 'white', width: 800 },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <div>
              <div className="imgDivPopupProfile">
                {/* Avatar to be used */}
                <label htmlFor="profilePic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="profilePic"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleSelectedFile}
                  />

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
                  <img src={edit} className="addDPIcon" alt="" />
                </label>
              </div>
            </div>
            <h1 className="forgetPaswdTxt">Ahmed Qadri</h1>
            <p className="enterEmailTxt">Superadmin</p>
            <FormControl sx={{ mb: 2, mt: 6, width: '85%' }} variant="outlined">
              <label className="pswdChangeTrack" htmlFor="phone">
                <p className="inputDiv">
                  <Phone className="customFieldIcon" /> Phone Number
                </p>
                <input className="customInput" id="phone" type="text" value="+92 312 4567890" />
              </label>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <label className="pswdChangeTrack" htmlFor="email">
                <p className="inputDiv">
                  <Mail className="customFieldIcon" /> Email
                </p>
                <input className="customInput" id="email" type="text" value="Ahmed@screnr.com" />
              </label>
            </FormControl>
            <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
              <label className="pswdChangeTrack" htmlFor="address">
                <p className="inputDiv">
                  <Location className="customFieldIcon" /> Address
                </p>
                <input
                  className="customInput"
                  id="address"
                  type="text"
                  value="Johar Town, Lahore"
                />
              </label>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '84%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
