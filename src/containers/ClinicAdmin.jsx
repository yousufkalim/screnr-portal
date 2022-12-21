import { React, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';

// assets import
import addBtn from '../assets/icons/addBtn.svg';

// child components import
import Sidebar from '../components/Sidebar';
import ClinicAdminTable from '../components/tables/clinicAdmin/ClinicAdminsTable';
import AddClinicAdmin from '../components/popups/clinicAdmin/AddNewClinicAdmin';

export default function ClinicAdmin() {
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);

  return (
    <Grid container>
      <Grid xl={2} lg={2}>
        <Sidebar />
      </Grid>

      <Grid className="bg" xl={10} lg={10}>
        <div className="breadCrumb">Dashboard &gt; &nbsp;Staff &gt;</div>
        <ClinicAdminTable />
      </Grid>
      <div className="addBtn">
        <img
          src={addBtn}
          className="pointer"
          onClick={() => setOpenAddClinicAdmin(true)}
          role="presentation"
          alt=""
        />
      </div>
      <AddClinicAdmin
        openAddClinicAdmin={openAddClinicAdmin}
        setOpenAddClinicAdmin={setOpenAddClinicAdmin}
      />
    </Grid>
  );
}
