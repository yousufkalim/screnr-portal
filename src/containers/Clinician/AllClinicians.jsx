import { React, useState, useEffect, useRef } from 'react';

// mui imports
import { Grid } from '@mui/material';

// child components import
import AllCliniciansTable from '../../components/tables/clinician/AllCliniciansTable';
import api from '../../api';

export default function AllClinicians() {
  const [clinicians, setClinicians] = useState({});

  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const getClinicians = async (sort, search, status, page = 1) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let apiUrl = `/admins/clinicians?page=${page}`;
    if (sort) {
      apiUrl += `&sort=${sort}`;
    }
    if (search) {
      apiUrl += `&search=${search}`;
    }
    if (status) {
      apiUrl += `&status=${status}`;
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
      setClinicians(data);
    }
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
