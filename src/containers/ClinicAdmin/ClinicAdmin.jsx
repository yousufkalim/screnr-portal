import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
import { useParams } from 'react-router-dom';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

// child components import
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import ClinicAdminTable from '../../components/tables/clinicAdmin/ClinicAdminsTable';
import AddClinicAdmin from '../../components/popups/clinicAdmin/AddNewClinicAdmin';
import api from '../../api';

export default function ClinicAdmin() {
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);
  const [clinicAdmins, setClinicAdmins] = useState([]);
  const { id } = useParams();

  const getClinicAdmins = async () => {
    const { data } = await api('get', `/admins/clinics/all/${id}`);
    if (data) {
      setClinicAdmins(data.users);
    }
  };

  useEffect(() => {
    getClinicAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>

      <Grid className="bg" xl={10} lg={9.5}>
        <div className="breadCrumb">Dashboard &gt; Staff &gt;</div>
        <ClinicAdminTable clinicAdmins={clinicAdmins} getClinicAdmins={getClinicAdmins} />
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
        getClinicAdmins={getClinicAdmins}
      />
    </Grid>
  );
}
