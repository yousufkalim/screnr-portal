import * as React from 'react';

// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

// react-toastify import
import { toast } from 'react-toastify';

// assets import
// import api from '../api/index';
import delConfirm from '../assets/images/deletePopup/delConfirm.svg';

// eslint-disable-next-line object-curly-newline

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

export default function DeleteModal({
  open,
  setOpen,
  //  item, getData, txt, selectedDate
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    // await api('delete', `/${txt}/${item._id}`);
    // getData();
    toast.success('Deleted successfully');
    handleClose();
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
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 600,
                marginTop: '40px',
              }}
            >
              Are you sure?
            </h1>

            <p className="enterEmailTxt">You won’t be able to revert this!</p>
            <div className="hl-del" />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} className="delBtn" variant="contained">
            Delete
          </Button>
          <Button onClick={handleClose} className="closeBtn" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
