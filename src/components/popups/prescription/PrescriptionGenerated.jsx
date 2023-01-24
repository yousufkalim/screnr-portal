// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// assets import
import { ReactComponent as Icon } from '../../../assets/icons/prescriptionIcon.svg';

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

export default function GeneratePrescription({
  openGeneratePrescription,
  setOpenGeneratePrescription,
}) {
  const handleClose = () => {
    setOpenGeneratePrescription(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openGeneratePrescription}
        setOpen={setOpenGeneratePrescription}
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
            <h1 className="genPresTxt">Prescription Generated Successfully</h1>
            <p className="genSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button onClick={handleClose} className="resetPasswordBtn" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
