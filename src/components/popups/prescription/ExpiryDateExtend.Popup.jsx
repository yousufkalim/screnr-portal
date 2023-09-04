import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { toast } from 'react-toastify';
import delConfirm from '../../../assets/images/deletePopup/delConfirm.svg';
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
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    margin: 'auto',
  },
}));

export default function ExpiryDateExtend({
  open,
  setOpen,
  patientId,
  selectedStartDate,
  setPrescription,
  prescription,
}) {
  const handleClose = () => setOpen(false);

  const handleExtendExpiryDate = () => {
    request('patch', `/clinicians/extendUserExpiry/${patientId}`, {
      expiry_date: moment(selectedStartDate).toISOString(),
    })
      .then((res) => {
        console.log(res);
        toast.success('Expiration Date extended successfully');
        setPrescription({
          ...prescription,
          start_date: selectedStartDate,
        });
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
        width="30.7%"
        minWidth="400px"
        PaperProps={{
          style: {
            borderRadius: 25,
            width: 500,
          },
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <img src={delConfirm} alt="" />
            <h1 className="delPopuptxt">
              The date you have selected is after the expiration of this patient
            </h1>

            <p className="enterEmailTxt">
              Click the Extend button to extend the expiry date of this patient
            </p>
            <div className="hl-del" />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExtendExpiryDate} className="delBtn" variant="contained">
            Extend
          </Button>
          <Button onClick={() => setOpen(false)} className="closeBtn" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
