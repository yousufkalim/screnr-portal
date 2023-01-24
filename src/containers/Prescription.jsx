import { React } from 'react';

// mui imports
import { Grid } from '@mui/material';

// navigator
import { useNavigate } from 'react-router-dom';

// assets import
import addBtn from '../assets/icons/addBtn.svg';

// child components import
import Sidebar from '../components/sidebar/patient/PatientSidebar';
import PatientTopSection from '../components/PatientTopSection';
import PrescriptionTable from '../components/tables/prescription/PrescriptionTable';

export default function Prescription() {
  const navigate = useNavigate();
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
          onClick={() => navigate('/dashboard/staff/clinician/patient/addPrescription')}
          role="presentation"
          alt=""
        />
      </div>
    </Grid>
  );
}
