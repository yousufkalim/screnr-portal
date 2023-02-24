import { React, useState, useEffect, useRef } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import
import AllClinicAdminTable from '../../components/tables/clinicAdmin/AllClinicAdminTable';
import api from '../../api';

export default function ClinicAdmin() {
  const [clinicAdmins, setClinicAdmins] = useState({});

  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const getClinicAdmins = async (sort, search, page = 1) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let apiUrl = `/admins/clinics?page=${page}`;
    if (sort) {
      apiUrl += `&sort=${sort}`;
    }
    if (search) {
      apiUrl += `&search=${search}`;
    }
    const { data } = await api(
      'get',
      apiUrl,
      {
        signal: abortController.signal,
      },
      true,
    );

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
