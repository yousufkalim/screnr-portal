import { React, useState } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

// assets
import { ReactComponent as Dummy } from '../../../assets/images/dummyprsn.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '20px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
}));

export default function AssignClinicians({
  setCliniciansData,
  openAssignClinicians,
  setOpenAssignClinicians,
}) {
  const [selectedClinicians, setSelectedClinicians] = useState([]);
  const allClinicians = [
    { id: '1', name: 'Usman' },
    { id: '2', name: 'Asif' },
    { id: '3', name: 'Ghaffar' },
    { id: '4', name: 'Sameer' },
    { id: '5', name: 'Hania' },
  ];

  const handleClose = () => {
    setOpenAssignClinicians(false);
  };

  const selectClinician = (chosenClinician) => {
    if (selectedClinicians.some((t) => t.id === chosenClinician.id)) {
      setSelectedClinicians(selectedClinicians.filter((t) => t.id !== chosenClinician.id));
      setCliniciansData(selectedClinicians.filter((t) => t.id !== chosenClinician.id));
    } else {
      setSelectedClinicians([...selectedClinicians, chosenClinician]);
      setCliniciansData([...selectedClinicians, chosenClinician]);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAssignClinicians}
        setOpen={setOpenAssignClinicians}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="clinicianPopupTxt">Assign more Clinicians</h1>
            <div className="clinicianParentDiv">
              {allClinicians.map((clinician) => (
                <div
                  className={
                    selectedClinicians.some((c) => c.id === clinician.id)
                      ? 'selectedClinicianDiv'
                      : 'clinicianDiv'
                  }
                  role="presentation"
                  onClick={() => selectClinician(clinician)}
                >
                  <Dummy className="clinicianDP" />
                  <p>{`Dr ${clinician.name}`}</p>
                </div>
              ))}
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
