import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
import { useParams } from 'react-router-dom';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

// child components import
import AllPatientTable from '../../components/tables/patient/AllPatientsTable';
import AddNewPatient from '../../components/popups/patient/AddNewPatient';
import api from '../../api';

export default function Patient() {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patients, setPatients] = useState([]);
  const { id } = useParams();

  const getPatients = async () => {
    if (window.location.pathname.includes('patient')) {
      const { data } = await api('get', '/admins/patient/all/');
      if (data) {
        setPatients(data.users);
      }
    } else {
      const { data } = await api('get', `/admins/patient/all/${id}`);
      if (data) {
        setPatients(data.users);
      }
    }
  };

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid className="bgClinicianTable" xl={12} lg={12}>
        <AllPatientTable patients={patients} />
      </Grid>

      <div className="addBtn">
        <img
          src={addBtn}
          className="pointer"
          onClick={() => setOpenAddPatient(true)}
          role="presentation"
          alt=""
        />
      </div>

      <AddNewPatient openAddPatient={openAddPatient} setOpenAddPatient={setOpenAddPatient} />
    </Grid>
  );
}
