// mui imports
import Button from '@mui/material/Button';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// assets import
import { ReactComponent as Icon } from '../../../assets/images/popups/existingEmail.svg';

// child import
import BootstrapDialog from '../../../utils/GeneralPopupsStyling';

export default function EmailAlreadyRegisteredPopup({ openExistingEmail, setOpenExistingEmail }) {
  const handleClose = () => {
    setOpenExistingEmail(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openExistingEmail}
        setOpen={setOpenExistingEmail}
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
            <h1 className="genPresTxt">This email is Already Register</h1>
            <p className="genSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleClose} className="tryAnotherBtn" variant="contained">
            Try with Another Email
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
