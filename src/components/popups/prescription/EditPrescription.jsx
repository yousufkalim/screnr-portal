import { React } from 'react';

// mui imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';

// react-toastify import
import { toast } from 'react-toastify';

// assets import
import dropdown from '../../../assets/icons/downArrow.svg';

// child imports
import useOutlinedInputStyles from '../../../utils/AddFormInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    textAlign: 'left',
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));

export default function EditPrescription({ openEditPrescription, setOpenEditPrescription }) {
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleClose = () => {
    setOpenEditPrescription(false);
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
        open={openEditPrescription}
        setOpen={setOpenEditPrescription}
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="clinicianPopupTxt">Edit Prescription</h1>

            <FormControl sx={{ mb: 1, mt: 2, width: '100%' }} variant="outlined">
              <TextField
                sx={{
                  borderRadius: '20px',
                  input: {
                    color: 'black',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 1,
                  },
                }}
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="Prescription 1"
                size="normal"
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%', mr: 2 }} variant="outlined">
              <Select
                // eslint-disable-next-line react/no-unstable-nested-components
                IconComponent={(props) => (
                  <img
                    src={dropdown}
                    style={{
                      margin: '1% 2%',
                      filter:
                        'brightness(0) saturate(100%) invert(66%) sepia(69%) saturate(1538%) hue-rotate(344deg) brightness(107%) contrast(97%)',
                    }}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    alt=""
                  />
                )}
                displayEmpty
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E1E1E1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #454238',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #454238',
                  },
                  borderRadius: '20px',
                  input: {
                    color: 'red',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 2,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="client"
                value=""
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value="">
                  <span style={{ color: '#949494' }}>Select Duration</span>
                </MenuItem>
                <MenuItem> 1 Week</MenuItem>
                <MenuItem> 2 Weeks</MenuItem>
                <MenuItem> 3 Weeks</MenuItem>
                <MenuItem> 4 Weeks</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%' }} variant="outlined">
              <Select
                // eslint-disable-next-line react/no-unstable-nested-components
                IconComponent={(props) => (
                  <img
                    src={dropdown}
                    style={{
                      margin: '1% 2%',
                      filter:
                        'brightness(0) saturate(100%) invert(66%) sepia(69%) saturate(1538%) hue-rotate(344deg) brightness(107%) contrast(97%)',
                    }}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    alt=""
                  />
                )}
                displayEmpty
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E1E1E1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #454238',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #454238',
                  },
                  borderRadius: '20px',
                  input: {
                    color: 'red',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 2,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="client"
                placeholder="Title"
                value=""
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
              >
                <MenuItem value="">
                  <span style={{ color: '#949494' }}>Weekly Frequency</span>
                </MenuItem>
                <MenuItem> 1 Time</MenuItem>
                <MenuItem> 2 Times</MenuItem>
                <MenuItem> 3 Times</MenuItem>
                <MenuItem> 4 Times</MenuItem>
              </Select>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button
            sx={{ boxShadow: '0' }}
            onClick={handleSubmit}
            className="savePBtn"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
