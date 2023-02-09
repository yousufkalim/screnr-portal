// mui imports
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// assets import
import { ReactComponent as Icon } from '../../../assets/images/popups/existingEmail.svg';

// child imports
import BootstrapDialog from '../../../utils/GeneralPopupsStyling';

export default function UserAlreadyExist({ openExistingUser, setOpenExistingUser }) {
  const handleClose = () => {
    setOpenExistingUser(false);
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
          <Button onClick={handleClose} className="inactiveBtn" variant="contained">
            Activate user
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
