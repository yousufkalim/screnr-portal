import { React, useState, useEffect } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import AvatarComponent from '../../Avatar';
import api from '../../../api/index';

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
  cliniciansData,
  setCliniciansData,
  openAssignClinicians,
  setOpenAssignClinicians,
  allClinicians,
  patientId,
  getPatients,
}) {
  const [selectedClinicians, setSelectedClinicians] = useState([]);

  useEffect(() => {
    setSelectedClinicians(cliniciansData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpenAssignClinicians(false);
  };

  const handleAddClinicians = async (clinicianId) => {
    setOpenAssignClinicians(false);
    await api('put', `/admins/patients/addClinicianToPatient/${patientId}`, {
      clinician: clinicianId,
    })
      .then(() => {
        setOpenAssignClinicians(false);
        getPatients();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectClinician = (chosenClinician) => {
    handleAddClinicians(chosenClinician.id);

    const updatedClinicians = selectedClinicians.find(
      (clinician) => clinician.id === chosenClinician.id,
    )
      ? [...selectedClinicians]
      : [...selectedClinicians, chosenClinician];
    setSelectedClinicians(updatedClinicians);
    setCliniciansData(updatedClinicians);
  };

  return (
    <div>
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        open={openAssignClinicians}
        setOpen={setOpenAssignClinicians}
        aria-labelledby="customized-dialog-title"
        PaperProps={{
          style: { borderRadius: 20, background: '#FFFFFF' },
        }}
      >
        <ClearIcon className="loginClearIcon" onClick={handleClose} />
        <DialogContent>
          <Typography gutterBottom>
            <h1 className="clinicianPopupTxt">Assign more Clinicians</h1>
            <div className="clinicianParentDiv">
              {allClinicians?.map((clinician) => (
                <div
                  className={
                    selectedClinicians.some((c) => c.id === clinician.id)
                      ? 'selectedClinicianDiv'
                      : 'clinicianDiv'
                  }
                  role="presentation"
                  onClick={() => selectClinician(clinician)}
                >
                  <AvatarComponent
                    alt={`${clinician?.first_name} ${clinician?.last_name}`}
                    className="top_sec_avatar"
                  />
                  <p>{`${clinician?.first_name} ${clinician?.last_name}`}</p>
                </div>
              ))}
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
