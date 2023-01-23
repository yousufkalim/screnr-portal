import { React, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';

// assets import
import addBtn from '../assets/icons/addBtn.svg';

// child components import
import Sidebar from '../components/sidebar/patient/PatientSidebar';
import AddNewPatient from '../components/popups/patient/AddNewPatient';
import PatientTopSection from '../components/PatientTopSection';
import PrescriptionTable from '../components/tables/prescription/PrescriptionTable';

export default function Prescription() {
  const [openAddPatient, setOpenAddPatient] = useState(false);

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>

      <Grid className="bgPrescription" xl={10} lg={9.5}>
        <PatientTopSection />
        <PrescriptionTable />
      </Grid>

      <div className="addBtn">
        <img
          src={addBtn}
          className="pointer"
          onClick={() => setOpenAddPatient(true)}
          role="presentation"
          alt=""
        />
      </div>

      <AddNewPatient openAddPatient={openAddPatient} setOpenAddPatient={setOpenAddPatient} />
    </Grid>
  );
}
