// mui imports
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { ReactComponent as Icon } from '../../../assets/images/popups/existingEmail.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(9),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(7),
  },
}));

export default function UserAlreadyExist({
  openExistingUser,
  setOpenExistingUser,
  handleActivate,
  closeParent,
}) {
  const handleClose = () => {
    setOpenExistingUser(false);
    closeParent();
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
        <DialogContent>
          <div className="loginClearIconCopy">
            <ClearIcon onClick={handleClose} />
          </div>
          <div>
            <Typography>
              {/* need to show avatar/display pic of inactive user here instead of this icon */}
              <Icon />
              <h1 className="genPresTxt genPresTxt_2">
                Sorry, this user already exists but is currently inactive.
              </h1>
              <p className="genSubTxt">To active this user,please click on the button below.</p>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button
            className="inactiveBtn"
            variant="contained"
            onClick={() => {
              handleActivate();
              handleClose();
            }}
          >
            Activate user
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
