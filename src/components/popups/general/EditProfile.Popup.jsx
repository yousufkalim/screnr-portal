import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { ReactComponent as Phone } from '../../../assets/icons/phoneIcon.svg';
import { ReactComponent as Mail } from '../../../assets/icons/mailIcon.svg';
import edit from '../../../assets/icons/edit.svg';
import AvatarComponent from '../../Avatar/Avatar.Component';
import { Store, UpdateStore } from '../../../StoreContext';
import { getMediaUrl } from '../../../config';
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
    margin: 'auto',
  },
}));

export default function EditProfilePopup({ openEditProfilePopup, setOpenEditProfilePopup }) {
  const { user } = Store();
  const updateStore = UpdateStore();
  const [values, setValues] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    profile_pic: user.profile_pic || '',
  });

  const roles = {
    admin: 'Super Admin',
    staff: 'Staff Admin',
    clinic: 'Clinic Admin',
    clinician: 'Clinician',
  };

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handlePhoneNumberChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (!e.target.value || regex.test(e.target.value)) {
      setValues({
        ...values,
        phone_number: e.target.value,
      });
    } else return toast.error('Only digits are allowed');
  };

  // uploading img
  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 10;
    if (myFile.size > size) {
      return toast.error('File size can not exceed 10 Mb');
    }
    setValues({ ...values, profile_pic: myFile });
  };

  const handleClose = () => setOpenEditProfilePopup(false);

  const handleSubmit = async () => {
    const formData = new FormData();

    try {
      if (values.phone_number.length < 10) {
        return toast.error('Phone number must contain 10 digits');
      }
      Object.keys(values).map((key) => formData.append(key, values[key]));

      const { data } = await request('post', '/auth/', formData);
      if (data) {
        updateStore({
          user: {
            ...user,
            first_name: data.first_name,
            last_name: data.user.last_namme,
            email: data.user.email,
            phone_number: data.user.phone_number,
            profile_pic: data.user.profile_pic,
          },
        });
        handleClose();
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div style={{ display: 'none' }}>
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
        <DialogContent>
          <div className="loginClearIconCopy">
            <ClearIcon onClick={handleClose} />
          </div>
          <div>
            <Typography gutterBottom>
              <div>
                <div className="imgDivPopupProfile">
                  {/* Avatar to be used */}
                  <label htmlFor="profilePic">
                    <input
                      name="profile_pic"
                      type="file"
                      id="profilePic"
                      className="noDisplay"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleSelectedFile}
                    />

                    {values?.profile_pic ? (
                      <img
                        src={getMediaUrl(values?.profile_pic)}
                        className="pointer"
                        id="selectedProfileImg"
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
                    <img src={edit} className="addDPIcon" alt="" />
                  </label>
                </div>
              </div>
              <h1 className="forgetPaswdTxt">{`${user.first_name} ${user.last_name}`}</h1>
              <p className="enterEmailTxt">{roles[user?.role]}</p>
              <FormControl sx={{ mb: 2, mt: 6, width: '85%' }} variant="outlined">
                <label className="pswdChangeTrack" htmlFor="first_name">
                  <p className="inputDiv">First Name</p>
                  <input
                    className="customInput"
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                  />
                </label>
              </FormControl>
              <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
                <label className="pswdChangeTrack" htmlFor="last_name">
                  <p className="inputDiv">Last Name</p>
                  <input
                    className="customInput"
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                  />
                </label>
              </FormControl>
              <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
                <label className="pswdChangeTrack" htmlFor="phone">
                  <p className="inputDiv">
                    <Phone className="customFieldIcon" /> Phone Number
                  </p>
                  <input
                    className="customInput"
                    id="phone"
                    type="text"
                    name="last_number"
                    maxLength="10"
                    minLength="10"
                    value={values.phone_number}
                    onChange={handlePhoneNumberChange}
                  />
                </label>
              </FormControl>
              <FormControl sx={{ mb: 2, width: '85%' }} variant="outlined">
                <label className="pswdChangeTrack" htmlFor="email">
                  <p className="inputDiv">
                    <Mail className="customFieldIcon" /> Email
                  </p>
                  <input
                    className="customInput"
                    id="email"
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                  />
                </label>
              </FormControl>
            </Typography>
          </div>
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
