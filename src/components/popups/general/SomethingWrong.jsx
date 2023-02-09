// mui imports
import Button from '@mui/material/Button';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// assets import
import { ReactComponent as Icon } from '../../../assets/images/popups/somethingWrong.svg';

// child imports
import BootstrapDialog from '../../../utils/GeneralPopupsStyling';

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
            <p className="genSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
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
