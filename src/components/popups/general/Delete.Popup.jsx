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

export default function DeleteModal({ openDeletePopup, setOpenDeletePopup, item, txt, getData }) {
  const handleClose = () => setOpenDeletePopup(false);
  const handleDelete = async () => {
    await request('delete', `/${txt}/${item.id}`);
    getData();
    handleClose();
    toast.success('Deleted successfully');
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDeletePopup}
        setOpen={setOpenDeletePopup}
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
            <h1 className="delPopuptxt">Are you sure?</h1>

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
