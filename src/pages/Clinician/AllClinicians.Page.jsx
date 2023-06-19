import { React, useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import AllCliniciansTable from '../../components/tables/clinician/AllCliniciansTable';
import request from '../../request';

export default function AllClinicians() {
  const [clinicians, setClinicians] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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

    let apiUrl = `/clinics/allCliniciansList?page=${page}`;
    if (sort) {
      apiUrl += `&sort=${sort}`;
    }
    if (search) {
      apiUrl += `&search=${search}`;
    }
    if (status) {
      apiUrl += `&status=${status}`;
    }
    setIsLoading(true);
    try {
      const { data } = await request(
        'get',
        apiUrl,
        {
          signal: abortController.signal,
        },
        true,
      );

      if (data) {
        setClinicians(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid className="bg" sx={{ marginLeft: 'unset', width: '100%' }} xl={12} lg={12}>
        <AllCliniciansTable
          clinicians={clinicians}
          getClinicians={getClinicians}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
}
