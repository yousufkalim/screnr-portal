import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { FormControl, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import dropdown from '../../../assets/icons/downArrow.svg';
import request from '../../../request';

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
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 6%)',
  },
}));

const weeks = [
  {
    value: 1,
    label: 'Week 1',
  },
  {
    value: 2,
    label: 'Week 2',
  },
  {
    value: 3,
    label: 'Week 3',
  },
  {
    value: 4,
    label: 'Week 4',
  },
  {
    value: 5,
    label: 'Week 5',
  },
  {
    value: 6,
    label: 'Week 6',
  },
];

const frequency = [
  {
    value: 1,
    label: '1 Times',
  },
  {
    value: 2,
    label: '2 Times',
  },
  {
    value: 3,
    label: '3 Times',
  },
  {
    value: 4,
    label: '4 Times',
  },
  {
    value: 5,
    label: '5 Times',
  },
];

export default function EditPrescription({
  openEditPrescription,
  setOpenEditPrescription,
  selectedPrescription,
  handlePrescriptionList,
}) {
  const [prescriptionName, setPrescriptionName] = useState('');
  const [prescriptionDuration, setPrescriptionDuration] = useState('');
  const [prescriptionFrequency, setPrescriptionFrequency] = useState('');
  const outlinedInputStyles = useOutlinedInputStyles();
  const handleClose = () => {
    setOpenEditPrescription(false);
  };

  const handleEditPrescriptions = async () => {
    await request(
      'put',
      `/clinicians/prescriptions/updatePrescription/${selectedPrescription?.id}`,
      {
        name: prescriptionName,
        duration: prescriptionDuration,
        frequency: prescriptionFrequency,
      },
    )
      .then(() => {
        toast.success('Edited Successfully');
        handlePrescriptionList();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
    handleClose();
  };

  useEffect(() => {
    setPrescriptionDuration(selectedPrescription?.duration);
    setPrescriptionFrequency(selectedPrescription?.frequency);
    setPrescriptionName(selectedPrescription?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditPrescription]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditPrescription}
        setOpen={setOpenEditPrescription}
        maxWidth="md"
        PaperProps={{
          style: {
            borderRadius: 20,
            background: '#FFFFFF',
            width: '40%',
            boxShadow: 'none',
          },
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
                    color: '#949494',
                    fontSize: '14px',
                    fontWeight: '500',
                    ml: 1,
                  },
                }}
                id="outlined-name"
                classes={outlinedInputStyles}
                placeholder="Add prescription name"
                size="normal"
                value={prescriptionName}
                onChange={(e) => {
                  setPrescriptionName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl sx={{ mb: 1, mt: 1, width: '48.5%', mr: 1 }} variant="outlined">
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
                value={prescriptionDuration || 'default'}
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
                onChange={(e) => {
                  setPrescriptionDuration(e.target.value);
                }}
              >
                <MenuItem value="default">
                  <span style={{ color: '#949494' }}>Select Duration</span>
                </MenuItem>
                {weeks.map((item) => (
                  <MenuItem value={item?.value}>
                    <span style={{ color: '#949494' }}>{item?.label}</span>
                  </MenuItem>
                ))}
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
                value={prescriptionFrequency || 'default'}
                inputProps={{
                  sx: { padding: '14.5px', textAlign: 'left', ml: 1 },
                }}
                onChange={(e) => {
                  setPrescriptionFrequency(e.target.value);
                }}
              >
                <MenuItem value="default">
                  <span style={{ color: '#949494' }}>Weekly Frequency</span>
                </MenuItem>
                {frequency.map((item) => (
                  <MenuItem value={item?.value}>
                    <span style={{ color: '#949494' }}>{item?.label}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ width: '100%' }}>
          <Button
            onClick={handleEditPrescriptions}
            sx={{ boxShadow: '0' }}
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
