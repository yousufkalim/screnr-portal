import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
import { useParams } from 'react-router-dom';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

// child components import
import AllCliniciansTable from '../../components/tables/clinician/AllCliniciansTable';
import AddClinician from '../../components/popups/clinician/AddNewClinician';
import api from '../../api';

export default function AllClinicians() {
  const [openAddClinican, setOpenAddClinican] = useState(false);
  const [clinicians, setClinicians] = useState([]);
  const { id } = useParams();

  const getClinicians = async () => {
    if (window.location.pathname.includes('clinician')) {
      const { data } = await api('get', '/admins/therapist/all/');
      if (data) {
        setClinicians(data.users);
      }
    } else {
      const { data } = await api('get', `/admins/therapist/all/${id}`);
      if (data) {
        setClinicians(data.users);
      }
    }
  };

  useEffect(() => {
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid className="bg" xl={12} lg={12}>
        <AllCliniciansTable
          setOpenAddClinican={setOpenAddClinican}
          clinicians={clinicians}
          getClinicians={getClinicians}
        />
      </Grid>
      <div className="addBtn">
        <img
          src={addBtn}
          className="pointer"
          onClick={() => setOpenAddClinican(true)}
          role="presentation"
          alt=""
        />
      </div>
      <AddClinician
        openAddClinican={openAddClinican}
        setOpenAddClinican={setOpenAddClinican}
        getClinicians={getClinicians}
      />
    </Grid>
  );
}
