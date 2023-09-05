import { React, useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import AllCliniciansTable from '../../components/tables/clinician/AllCliniciansTable';
import request from '../../request';

export default function AllClinicians() {
  const [clinicians, setClinicians] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const [checked, setChecked] = useState(true);

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

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
    apiUrl += `&&active=${checked}`;

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

  const activateUser = (userId) => {
    request('patch', `/clinics/activateClinician/${userId}`)
      .then(() => {
        getClinicians();
      })
      .catch((err) => {
        console.log('file: AllClinicians.Page.jsx:63 ~ activateUser ~ err:', err);
      });
  };

  useEffect(() => {
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Grid container>
      <Grid className="bg" sx={{ marginLeft: 'unset', width: '100%' }} xl={12} lg={12}>
        <AllCliniciansTable
          clinicians={clinicians}
          getClinicians={getClinicians}
          loading={isLoading}
          checked={checked}
          handleChangeCheck={handleChangeCheck}
          activateUser={activateUser}
        />
      </Grid>
    </Grid>
  );
}
