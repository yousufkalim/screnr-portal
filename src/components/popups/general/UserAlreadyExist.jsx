// mui imports
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// react-toastify import
import { toast } from 'react-toastify';

// assets import
import { ReactComponent as Icon } from '../../../assets/images/popups/existingEmail.svg';

// child imports
import BootstrapDialog from '../../../utils/GeneralPopupsStyling';
import api from '../../../api/index';

export default function UserAlreadyExist({
  openExistingUser,
  setOpenExistingUser,
  staffMember,
  setStaffMember,
  getStaffMembers,
  setOpenAddStaffMember,
}) {
  const handleClose = () => {
    setOpenExistingUser(false);
  };

  const handleActivate = async () => {
    // setOpenExistingUser(false);

    const staffMemberCopy = { ...staffMember };
    const formData = new FormData();

    Object.keys(staffMemberCopy).map((key) => formData.append(key, staffMemberCopy[key]));
    formData.append('active', 'true');
    formData.append('activateUser', 'true');

    const { data } = await api('put', '/admins/staff/undefined', formData);

    if (data) {
      getStaffMembers();
      setStaffMember({});
      setOpenAddStaffMember(false);
      handleClose();
      return toast.success('User added successfully');
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openExistingUser}
        setOpen={setOpenExistingUser}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />

        <DialogContent>
          <Typography>
            {/* need to show avatar/display pic of inactive user here instead of this icon */}
            <Icon />
            <h1 className="genPresTxt">This User Already exist but inactive</h1>
            <p className="genSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button className="inactiveBtn" variant="contained" onClick={handleActivate}>
            Activate user
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
