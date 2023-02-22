import { React, useState, useEffect } from 'react';

// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';

// phone
import PhoneInput from 'react-phone-input-2';

// react-toastify import
import { toast } from 'react-toastify';

// react-datepicker import
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// assets import
import edit from '../../../assets/icons/edit.svg';

// child component imports
import AvatarComponent from '../../Avatar';
import api from '../../../api';
import { getMediaUrl } from '../../../config';
import useOutlinedInputStyles from '../../../utils/EditFormInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

export default function EditStaffMember({
  openEditStaffMember,
  setOpenEditStaffMember,
  getStaffMembers,
  staffMemberDetails,
}) {
  const [checked, setChecked] = useState(false);
  const [staffMember, setStaffMember] = useState({});

  useEffect(() => {
    const tempStaffMember = {
      first_name: staffMemberDetails.first_name,
      last_name: staffMemberDetails.last_name,
      email: staffMemberDetails.email,
      profile_pic: staffMemberDetails.profile_pic,
      phone_number: staffMemberDetails.phone_number,
    };

    if (staffMemberDetails.expiry_date) {
      // eslint-disable-next-line no-underscore-dangle
      tempStaffMember.expiry_date = moment(staffMemberDetails.expiry_date)._d;
      setChecked(true);
    }

    setStaffMember(tempStaffMember);
  }, [staffMemberDetails]);

  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenEditStaffMember(false);
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    setStaffMember({ ...staffMember, [e.target.name]: e.target.value });
  };

  const dateChange = (e) => {
    setStaffMember({
      ...staffMember,
      expiry_date: e,
    });
  };

  const handleSelectedFile = async (e) => {
    const myFile = e.target.files[0];
    const size = 1024 * 1024 * 10;
    if (myFile.size > size) {
      return toast.error('File size can not exceed 10 Mb');
    }
    setStaffMember({ ...staffMember, profile_pic: myFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffMemberCopy = { ...staffMember };
    const formData = new FormData();
    if (staffMemberCopy.expiry_date && !checked) {
      staffMemberCopy.expiry_date = '';
      setStaffMember({ ...staffMemberCopy });
    }

    if (typeof staffMemberCopy.profile_pic !== 'object') {
      delete staffMemberCopy.profile_pic;
    }

    Object.keys(staffMemberCopy).map((key) => formData.append(key, staffMemberCopy[key]));
    if (staffMemberCopy.phone_number && staffMemberCopy.phone_number.length < 11) {
      return toast.error('Phone number must be contain 10 digits');
    }

    if (checked && !staffMemberCopy.expiry_date) {
      return toast.error('Please enter expiry date');
    }
    const { data } = await api('put', `/admins/staff/${staffMemberDetails.id}`, formData);
    if (data) {
      getStaffMembers();
      handleClose();
      return toast.success('Staff Member edited successfully');
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditStaffMember}
        setOpen={setOpenEditStaffMember}
        fullWidth
        width="40.8%"
        minWidth="90%"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="addPopupTxt">Edit Staff Member</h1>
            <p className="addPopupSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div>
              <div className="imgDivPopup">
                {/* Avatar to be used */}
                <label htmlFor="profilePic">
                  <input
                    name="profile_pic"
                    type="file"
                    id="profilePic"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleSelectedFile}
                  />

                  {staffMember.profile_pic ? (
                    <img
                      src={getMediaUrl(staffMember.profile_pic)}
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
                  ) : (
                    <AvatarComponent
                      alt={`${staffMember?.first_name} ${staffMember?.last_name}`}
                      className="popups_avatar"
                    />
                  )}
                  <img src={edit} className="addImgIcon" alt="" />
                </label>
              </div>
            </div>
            <FormControl sx={{ mb: 1, mt: 3, width: '48.5%', mr: 2 }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder="First Name"
                size="normal"
                name="first_name"
                value={staffMember?.first_name}
                onChange={handleChange}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 3, width: '48.5%' }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                placeholder="Last Name"
                size="normal"
                name="last_name"
                onChange={handleChange}
                value={staffMember?.last_name}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </FormControl>
            <FormControl sx={{ mb: 2, mt: 1, width: '48.5%', mr: 2 }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                }}
                id="outlined-email"
                classes={outlinedInputStyles}
                placeholder="Email"
                size="normal"
                type="email"
                name="email"
                onChange={handleChange}
                value={staffMember?.email}
              />
            </FormControl>
            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
              <div className="edit-phone-input">
                <PhoneInput
                  country="us"
                  onlyCountries={['us']}
                  value={staffMember.phone_number}
                  onChange={(value) => {
                    setStaffMember({ ...staffMember, phone_number: value });
                  }}
                  disableDropdown
                  countryCodeEditable={false}
                  disableCountryGuess
                />
              </div>
            </FormControl>
            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              <FormControlLabel
                sx={{
                  color: '#136773',
                  textAlign: 'left',
                  fontSize: '40px',
                  width: 'fit-content',
                }}
                control={
                  <Checkbox checked={checked} onChange={handleCheck} style={{ color: '#136773' }} />
                }
                label={
                  <Typography
                    style={{
                      color: '#136773',
                      textAlign: 'left',
                      fontWeight: '500',
                    }}
                  >
                    Want to Add expiry date
                  </Typography>
                }
              />
            </FormControl>
            <FormControl
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div className="date-div2" id={!checked ? 'disabledDate' : ''}>
                <DatePicker
                  showPopperArrow
                  dateFormat="MM-dd-yyyy"
                  name="expiry_date"
                  onChange={dateChange}
                  disabled={!checked}
                  selected={staffMember?.expiry_date}
                  placeholderText="Enter expiry date"
                  popperPlacement="bottom-start"
                  showYearDropdown
                />
              </div>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleSubmit} className="resetPasswordBtn" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
