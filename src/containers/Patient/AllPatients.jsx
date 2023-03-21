import { React, useState, useEffect } from 'react';
// mui imports
import { Grid } from '@mui/material';
// assets import
import addBtn from '../../assets/icons/addBtn.svg';
// child components import
// eslint-disable-next-line import/no-named-as-default-member
import AllPatientTable from '../../components/tables/patient/AllPatientsTable';
import AddNewPatient from '../../components/popups/patient/AddNewPatient';
import api from '../../api';

export default function Patient() {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [diaganosisFilter, setDiaganosisFilter] = useState([]);
  const [exerciseFilter, setExerciseFilter] = useState([]);

  const getPatients = async () => {
    const { data } = await api('get', '/admins/patients/');
    if (data) {
      setPatients(data?.users);
    }
  };

  const handleFilterAndSorting = async (sort, searchValue, page = 1) => {
    let apiUrl = `/admins/patients?&page=${page}`;
    if (sort) {
      apiUrl += `&sort=${sort}`;
    }
    if (searchValue) {
      apiUrl += `&search=${searchValue}`;
    }

    setLoading(true);
    await api('get', apiUrl)
      .then((res) => {
        if (res?.data?.users) {
          setPatients(res?.data?.users);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error(`handleFilterAndSorting --> ${err}`);
      });
  };

  const handleFilters = async (filterType, clinicName, multiChecks, page = 1) => {
    let apiUrl = `/admins/patients?&page=${page}`;
    if (filterType === 'clinic') {
      apiUrl += `&filter_type=${filterType}&filter_value=${clinicName}`;
    }
    if (filterType === 'all') {
      apiUrl += `&filter_type=${filterType}&filter_value=""`;
    }

    setLoading(true);
    await api('get', apiUrl)
      .then((res) => {
        if (res?.data?.users) {
          setPatients(res?.data?.users);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error(`handleFilterAndSorting --> ${err}`);
      });
  };

  const handleDynamicFilter = async () => {
    const { data } = await api('get', '/admins/patients/getDynamicFilters');
    if (data) {
      setExerciseFilter(data?.exercises);
      setDiaganosisFilter(data?.diagnosis);
    }
  };

  useEffect(() => {
    getPatients();
    handleDynamicFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container>
      <Grid className="bgClinicianTable" xl={12} lg={12}>
        <AllPatientTable
          loading={loading}
          patients={patients}
          getPatients={getPatients}
          handleFilters={handleFilters}
          exerciseFilter={exerciseFilter}
          diaganosisFilter={diaganosisFilter}
          setOpenAddPatient={setOpenAddPatient}
          handleFilterAndSorting={handleFilterAndSorting}
        />
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
      <AddNewPatient
        getPatients={getPatients}
        openAddPatient={openAddPatient}
        setOpenAddPatient={setOpenAddPatient}
      />
    </Grid>
  );
}
