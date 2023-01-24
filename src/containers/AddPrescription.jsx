import { React, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

// child components import
import Sidebar from '../components/sidebar/patient/PatientSidebar';
import AddPrescription from '../components/forms/prescription/AddPrescription';
import GeneratePrescription from '../components/popups/prescription/PrescriptionGenerated';

export default function AddPatientPrescription() {
  const [openGeneratePrescription, setOpenGeneratePrescription] = useState(false);

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>

      <Grid className="bgPrescription" xl={10} lg={9.5}>
        <div className="breadCrumb">
          Dashboard &gt; &nbsp;Staff &gt; &nbsp; Clinic Admin &gt; &nbsp; Clinician &gt; &nbsp;
          Patient &gt; &nbsp; Prescribe Exercise &gt; &nbsp;
        </div>
        <div className="bgAddPrescription">
          <AddPrescription />
        </div>
      </Grid>

      <div className="addPrescriptionBtn">
        <Button
          className="generatePrescriptionBtn"
          onClick={() => setOpenGeneratePrescription(true)}
          variant="contained"
        >
          Generate Prescription
        </Button>
      </div>
      {openGeneratePrescription && (
        <GeneratePrescription
          openGeneratePrescription={openGeneratePrescription}
          setOpenGeneratePrescription={setOpenGeneratePrescription}
        />
      )}
    </Grid>
  );
}
