import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import AvatarComponent from '../../Avatar/Avatar.Component';
import request from '../../../request';

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

  const handleClose = () => setOpenAssignClinicians(false);

  const handleAddClinicians = async (clinicianId) => {
    setOpenAssignClinicians(false);
    await request('put', `/clinicians/addClinicianToPatient/${patientId}`, {
      clinician: clinicianId,
    })
      .then(() => {
        setOpenAssignClinicians(false);
        getPatients();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const selectClinician = (chosenClinician) => {
    handleAddClinicians(chosenClinician?.id);

    const updatedClinicians = selectedClinicians.find(
      (clinician) => clinician.id === chosenClinician.id,
    )
      ? [...selectedClinicians]
      : [...selectedClinicians, chosenClinician];
    setSelectedClinicians(updatedClinicians);
    setCliniciansData(updatedClinicians);
  };

  return (
    <div style={{ display: 'none' }}>
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
              {allClinicians?.map((clinician) => {
                const isSelected = selectedClinicians.some((c) => c.id === clinician.id);
                const avatarClassName = isSelected ? 'top_sec_avatar' : 'top_sec_avatar_disabled';
                const pTagClassName = isSelected ? 'topSecDocName' : 'topSecDocName_disabled';
                return (
                  <div
                    className={isSelected ? 'selectedClinicianDiv' : 'clinicianDiv'}
                    role="presentation"
                    onClick={() => selectClinician(clinician)}
                  >
                    <AvatarComponent
                      alt={`${clinician?.first_name} ${clinician?.last_name}`}
                      className={avatarClassName}
                    />
                    <p className={pTagClassName}>
                      {`${clinician?.first_name} ${clinician?.last_name}`}{' '}
                    </p>
                  </div>
                );
              })}
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
