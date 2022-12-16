import { React, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

// child components import
import Sidebar from '../../components/Sidebar';
import ClinicAdminTable from './ClinicAdminsTable';
import AddClinicAdmin from './AddNewClinicAdmin';

export default function ClinicAdmin() {
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);

  return (
    <Grid container>
      <Grid xl={2} lg={2}>
        <Sidebar />
      </Grid>

      <Grid className="bg" xl={10} lg={10}>
        <ClinicAdminTable />
      </Grid>
      <div className="addBtn">
        <img
          src={addBtn}
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenAddClinicAdmin(true)}
          role="presentation"
          alt=""
        />
      </div>
      {openAddClinicAdmin && (
        <AddClinicAdmin
          openAddClinicAdmin={openAddClinicAdmin}
          setOpenAddClinicAdmin={setOpenAddClinicAdmin}
        />
      )}
    </Grid>
  );
}
