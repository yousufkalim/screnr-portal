import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
// import { useParams } from 'react-router-dom';

// child components import
import AllClinicAdminTable from '../../components/tables/clinicAdmin/AllClinicAdminTable';
import api from '../../api';

export default function ClinicAdmin() {
  const [clinicAdmins, setClinicAdmins] = useState({});
  // const { id } = useParams();

  const getClinicAdmins = async (page = 1) => {
    const { data } = await api('get', `/admins/clinics?page=${page}`);
    if (data) {
      setClinicAdmins(data);
    }
  };

  useEffect(() => {
    getClinicAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid className="bg" xl={12} lg={12}>
        <AllClinicAdminTable clinicAdmins={clinicAdmins} getClinicAdmins={getClinicAdmins} />
      </Grid>
    </Grid>
  );
}
