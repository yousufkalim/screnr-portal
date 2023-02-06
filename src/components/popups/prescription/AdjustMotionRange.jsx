// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

// react-toastify import
import { toast } from 'react-toastify';

// assets import
import { ReactComponent as Joints } from '../../../assets/icons/joints.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(9),
  },
}));
const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #E1E1E1 ',
        borderRadius: '20px',
        fontSize: 16,
        height: 55,
      },
      '&:hover fieldset': {
        borderColor: '#454238',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#454238',
      },
    },
  },
});
export default function AdjustRange({ openAdjustRange, setOpenAdjustRange }) {
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenAdjustRange(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('Prescription added successfully');
    handleClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAdjustRange}
        setOpen={setOpenAdjustRange}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF', width: '1000px' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <h1 className="rangePopupTxt">Adjust range of Motion</h1>
        <p className="rangeSubTxt">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        <Grid container>
          <Grid xl={7} lg={7}>
            <DialogContent>
              <Typography>
                <div className="rangeTopRow">
                  <p />
                  <p>Top</p>
                  <p>Bottom</p>
                </div>
                <div className="rangeRow">
                  <p>Knee Flexion</p>
                  <FormControl sx={{ ml: 3, width: '35%' }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      classes={outlinedInputStyles}
                      placeholder="70"
                      size="normal"
                    />
                  </FormControl>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-name"
                      classes={outlinedInputStyles}
                      placeholder="60"
                      size="normal"
                    />
                  </FormControl>
                </div>
                <div className="rangeRow">
                  <p>Spine </p>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-name"
                      classes={outlinedInputStyles}
                      placeholder="120"
                      size="normal"
                    />
                  </FormControl>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-email"
                      classes={outlinedInputStyles}
                      placeholder="155"
                    />
                  </FormControl>
                </div>
                <div className="rangeRow">
                  <p>Hip Threshold</p>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-phone"
                      classes={outlinedInputStyles}
                      placeholder="6"
                      size="normal"
                      type="text"
                    />
                  </FormControl>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-email"
                      classes={outlinedInputStyles}
                      placeholder="80"
                      size="normal"
                    />
                  </FormControl>{' '}
                </div>
                <div className="rangeRow">
                  <p>Shoulder </p>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-phone"
                      classes={outlinedInputStyles}
                      placeholder="25"
                      size="normal"
                      type="text"
                    />
                  </FormControl>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      id="outlined-email"
                      classes={outlinedInputStyles}
                      placeholder="25"
                      size="normal"
                    />
                  </FormControl>{' '}
                </div>
                <div className="rangeRow">
                  <p>Shin Threshold</p>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      classes={outlinedInputStyles}
                      placeholder="25"
                      size="normal"
                      type="text"
                    />
                  </FormControl>
                  <FormControl sx={{ width: '35%', ml: 3 }} variant="outlined">
                    <TextField
                      sx={{
                        borderRadius: '20px',
                        input: {
                          color: 'black',
                          fontSize: '14px',
                          fontWeight: '500',
                          ml: 1,
                          textAlign: 'center',
                        },
                      }}
                      classes={outlinedInputStyles}
                      placeholder="25"
                      size="normal"
                    />
                  </FormControl>
                </div>
              </Typography>
            </DialogContent>
            <DialogActions sx={{ width: '45%' }}>
              <Button onClick={handleSubmit} className="rangeBtn" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Grid>
          <Grid xl={5} lg={5}>
            <Joints className="jointImg" />
          </Grid>
        </Grid>
      </BootstrapDialog>
    </div>
  );
}
