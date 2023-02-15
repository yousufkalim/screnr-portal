import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

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

export default BootstrapDialog;
