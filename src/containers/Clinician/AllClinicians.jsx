import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import
import AllCliniciansTable from '../../components/tables/clinician/AllCliniciansTable';
// import api from '../../api';

export default function AllClinicians() {
  const [clinicians] = useState({});

  const getClinicians = async () => {
    // const { data } = await api('get', '/admins/clinicians');
    // if (data) {
    //   setClinicians(data);
    // }
  };

  useEffect(() => {
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid className="bg" xl={12} lg={12}>
        <AllCliniciansTable clinicians={clinicians} getClinicians={getClinicians} />
      </Grid>
    </Grid>
  );
}
