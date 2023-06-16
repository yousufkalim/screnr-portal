// eslint-disable-next-line import/no-named-as-default-member
import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import addBtn from '../../assets/icons/addBtn.svg';
import AllPatientTable from '../../components/tables/patient/AllPatientsTable';
import AddNewPatient from '../../components/popups/patient/AddPatient.Popup';
import request from '../../request';

export default function Patient() {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [diaganosisFilter, setDiaganosisFilter] = useState([]);
  const [exerciseFilter, setExerciseFilter] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await request('put', apiUrl, bodyObject);
        if (res?.data?.users) {
          setPatients(res?.data?.users);
        } else {
          setPatients([]);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      }
    };

    fetchData();
  }, [apiUrl, bodyObject]);

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
    handleFilterAndSorting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDynamicFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addNewPatientPopup = openAddPatient && (
    <AddNewPatient
      openAddPatient={openAddPatient}
      getPatients={handleFilterAndSorting}
      setOpenAddPatient={setOpenAddPatient}
    />
  );

  const AllPatients = (
    <AllPatientTable
      filter={filter}
      sorting={sorting}
      loading={loading}
      patients={patients}
      setFilter={setFilter}
      setSorting={setSorting}
      getPatients={handleFilterAndSorting}
      exerciseFilter={exerciseFilter}
      diaganosisFilter={diaganosisFilter}
      setOpenAddPatient={setOpenAddPatient}
      handleFilterAndSorting={handleFilterAndSorting}
    />
  );

  return (
    <Grid container>
      <Grid sx={{ width: '100%' }} className="bgClinicianTable">
        {AllPatients}
      </Grid>

      <div className="addBtn">
        <img
          alt=""
          src={addBtn}
          role="presentation"
          className="pointer"
          onClick={() => setOpenAddPatient(true)}
        />
      </div>
      {addNewPatientPopup}
    </Grid>
  );
}
