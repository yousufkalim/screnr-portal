import { React, useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import request from '../../request';
import AllClinicAdminTable from '../../components/tables/clinicAdmin/AllClinicAdminTable';

export default function ClinicAdmin() {
  const abortControllerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clinicAdmins, setClinicAdmins] = useState({});
  const [checked, setChecked] = useState(false);

  const getClinicAdmins = async (sort, search, page = 1) => {
    setIsLoading(true);
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      let apiUrl = `/staff/allClinicsList?page=${page}`;
      if (sort) {
        apiUrl += `&sort=${sort}`;
      }
      if (search) {
        apiUrl += `&search=${search}`;
      }

      apiUrl += `&&active=${checked}`;

      const { data } = await request(
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const activateUser = (userId) => {
    request('patch', `    /staffs/activateClinic/${userId}`)
      .then((res) => {
        console.log(res);
        getClinicAdmins();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    getClinicAdmins();
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
        <AllClinicAdminTable
          clinicAdmins={clinicAdmins}
          getClinicAdmins={getClinicAdmins}
          loading={isLoading}
          activateUser={activateUser}
          checked={checked}
          handleChangeCheck={handleChangeCheck}
        />
      </Grid>
    </Grid>
  );
}
