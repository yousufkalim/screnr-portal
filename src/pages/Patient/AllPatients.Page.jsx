import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import AllPatientTable from '../../components/tables/patient/AllPatientsTable';
import AddNewPatient from '../../components/popups/patient/AddPatient.Popup';
import request from '../../request';

export default function Patient() {
  const [patients, setPatients] = useState();
  const [loading, setLoading] = useState(false);
  const [exerciseFilter, setExerciseFilter] = useState([]);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [diaganosisFilter, setDiaganosisFilter] = useState([]);
  const [apiUrl, setApiUrl] = useState('/clinicians/allPatientsListWithFilters?sort=');
  const [bodyObject, setBodyObject] = useState({
    filter_type: '',
    filter_value: '',
  });

  const [filter, setFilter] = useState({
    filterType: 'all',
    clinicNamefilter: '',
    exerciseArray: [],
    diagnosisArray: [],
  });

  const [sorting, setSorting] = useState({
    sortBy: '',
  });
  const [checked, setChecked] = useState(true);

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  const handleFilterAndSorting = async (item) => {
    const { filterType, clinicName, filterValueArray } = item || {};

    if (filterType === 'all') {
      setBodyObject((prevBodyObject) => ({
        ...prevBodyObject,
        filter_type: filterType,
        filter_value: '',
      }));
    } else if (filterType === 'clinic') {
      setBodyObject((prevBodyObject) => ({
        ...prevBodyObject,
        filter_type: filterType,
        filter_value: clinicName,
      }));
    } else if (filterType === 'exercise' || filterType === 'diagnosis') {
      setBodyObject((prevBodyObject) => ({
        ...prevBodyObject,
        filter_type: filterType,
        filter_value: filterValueArray,
      }));
    }

    if (item?.sort) {
      setApiUrl(`/clinicians/allPatientsListWithFilters?sort=${item?.sort}`);
    }
    if (item?.searchValue) {
      setApiUrl(`${apiUrl}?search=${item?.searchValue}`);
    }
    if (typeof filterValueArray === 'object' && filterValueArray?.length === 0) {
      setBodyObject((prevBodyObject) => ({
        ...prevBodyObject,
        filter_type: 'all',
        filter_value: '',
      }));
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl}&&active=${checked}`;
      const res = await request('put', url, bodyObject);
      if (res?.data) {
        setPatients(res?.data);
      } else {
        setPatients();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  const activateUser = (userId) => {
    request('patch', `/clinics/activateClinician/${userId}`)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(' file: AllPatients.Page.jsx:91 ~ activateUser ~ err:', err);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, bodyObject, checked]);

  const handleDynamicFilter = async () => {
    try {
      const { data } = await request('get', '/clinicians/getDynamicFilters');
      if (data) {
        setExerciseFilter(data?.exercises);
        setDiaganosisFilter(data?.diagnosis);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleDynamicFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleFilterAndSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid sx={{ width: '100%' }} className="bgClinicianTable">
        <AllPatientTable
          filter={filter}
          sorting={sorting}
          loading={loading}
          patients={patients}
          setFilter={setFilter}
          setSorting={setSorting}
          getPatients={fetchData}
          exerciseFilter={exerciseFilter}
          diaganosisFilter={diaganosisFilter}
          setOpenAddPatient={setOpenAddPatient}
          handleFilterAndSorting={handleFilterAndSorting}
          checked={checked}
          activateUser={activateUser}
          handleChangeCheck={handleChangeCheck}
        />
      </Grid>
      {openAddPatient && (
        <AddNewPatient
          getPatients={fetchData}
          openAddPatient={openAddPatient}
          setOpenAddPatient={setOpenAddPatient}
        />
      )}
    </Grid>
  );
}
