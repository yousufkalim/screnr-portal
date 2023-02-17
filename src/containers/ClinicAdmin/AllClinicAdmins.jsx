import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
// import { useParams } from 'react-router-dom';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

// child components import
import AllClinicAdminTable from '../../components/tables/clinicAdmin/AllClinicAdminTable';
import AddClinicAdmin from '../../components/popups/clinicAdmin/AddNewClinicAdmin';
// import api from '../../api';

export default function ClinicAdmin() {
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);
  const [clinicAdmins] = useState([]);
  // const { id } = useParams();

  const getClinicAdmins = async () => {
    // if (window.location.pathname.includes('staff')) {
    //   const { data } = await api('get', `/admins/clinics/all/`);
    //   if (data) {
    //     setClinicAdmins(data.users);
    //   }
    // } else {
    //   const { data } = await api('get', `/admins/clinics/all/${id}`);
    //   if (data) {
    //     setClinicAdmins(data.users);
    //   }
    // }
  };

  useEffect(() => {
    getClinicAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid className="bg" xl={12} lg={12}>
        <AllClinicAdminTable
          setOpenAddClinicAdmin={setOpenAddClinicAdmin}
          clinicAdmins={clinicAdmins}
          getClinicAdmins={getClinicAdmins}
        />
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
