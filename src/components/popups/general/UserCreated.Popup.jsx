// mui imports
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { ReactComponent as Icon } from '../../../assets/images/popups/userAddedSuccessfully.svg';

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
            <h1 className="genPresTxt">New User Added!</h1>
            <p className="genSubTxt">User successfuly added to the list!</p>
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
