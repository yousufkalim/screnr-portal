// mui imports
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// assets import
import { ReactComponent as Icon } from '../../../assets/images/popups/userAddedSuccessfully.svg';

// child imports
import BootstrapDialog from '../../../utils/GeneralPopupsStyling';

export default function UserCreated({ openUserCreated, setOpenUserCreated }) {
  const handleClose = () => {
    setOpenUserCreated(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openUserCreated}
        setOpen={setOpenUserCreated}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />

        <DialogContent>
          <Typography>
            <Icon />
            <h1 className="genPresTxt">New User Added</h1>
            <p className="genSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleClose} className="usrAddedBtn" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
