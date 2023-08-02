// mui imports
import Button from '@mui/material/Button';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { ReactComponent as Icon } from '../../../assets/images/popups/somethingWrong.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    textAlign: 'center',
    paddingTop: theme.spacing(9),
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(7),
  },
}));

export default function SomethingWrong({ openSomethingWrong, setOpenSomethingWrong }) {
  const handleClose = () => {
    setOpenSomethingWrong(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openSomethingWrong}
        setOpen={setOpenSomethingWrong}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />

        <DialogContent className="">
          <Typography>
            <Icon style={{ zIndex: '1300' }} />
            <h1 className="genPresTxt">Something Wrong</h1>
            <p className="genSubTxt"> </p>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleClose} className="wrngBtn" variant="contained">
            back to screen
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
