// eslint-disable-next-line import/no-named-as-default-member
import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
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
    // const page1 = item?.page ?? 1;
    let apiUrl = `/clinicians/allPatientsListWithFilters`;
    const obj = {
      filter_type: '',
      filter_value: '',
    };

    switch (item?.filterType) {
      case 'all':
        obj.filter_type = item?.filterType;
        obj.filter_value = '';
        break;
      case 'clinic':
        obj.filter_type = item?.filterType;
        obj.filter_value = item?.clinicName;
        break;
      case 'exercise':
      case 'diagnosis':
        obj.filter_type = item?.filterType;
        obj.filter_value = item?.filterValueArray;
        break;
      default:
        break;
    }

    if (item?.sort) apiUrl += `&sort=${item?.sort}`;
    if (item?.searchValue) apiUrl += `&search=${item?.searchValue}`;
    try {
      setLoading(true);
      const res = await request('put', apiUrl, obj);
      if (res?.data?.users) {
        setPatients(res?.data?.users);
      } else {
        setPatients([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error(`handleFilterAndSorting --> ${err}`);
    }
  };

  const handleDynamicFilter = async () => {
    const { data } = await request('get', '/clinicians/getDynamicFilters');
    if (data) {
      setExerciseFilter(data?.exercises);
      setDiaganosisFilter(data?.diagnosis);
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
  return (
    <Grid container>
      <Grid className="bgClinicianTable" xl={12} lg={12}>
        <AllPatientTable
          loading={loading}
          patients={patients}
          getPatients={handleFilterAndSorting}
          exerciseFilter={exerciseFilter}
          diaganosisFilter={diaganosisFilter}
          setOpenAddPatient={setOpenAddPatient}
          handleFilterAndSorting={handleFilterAndSorting}
          filter={filter}
          setFilter={setFilter}
          sorting={sorting}
          setSorting={setSorting}
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
        openAddPatient={openAddPatient}
        getPatients={handleFilterAndSorting}
        setOpenAddPatient={setOpenAddPatient}
      />
    </Grid>
  );
}
