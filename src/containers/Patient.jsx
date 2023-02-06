import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
import { useParams } from 'react-router-dom';

// assets import
import addBtn from '../assets/icons/addBtn.svg';

import { ReactComponent as GreenIcon } from '../assets/components/StatsCard/greenIcon.svg';
import { ReactComponent as RedIcon } from '../assets/components/StatsCard/redIcon.svg';
import { ReactComponent as YellowIcon } from '../assets/components/StatsCard/yellowIcon.svg';
import { ReactComponent as GreenStats } from '../assets/components/StatsCard/greenStats.svg';
import { ReactComponent as RedStats } from '../assets/components/StatsCard/redStats.svg';
import { ReactComponent as YellowStats } from '../assets/components/StatsCard/yellowStats.svg';

// child components import
import Sidebar from '../components/sidebar/GenericLeftSidebar';
import StatsCard from '../components/cards/StatsCard';
import PatientTable from '../components/tables/patient/PatientTable';
import AddNewPatient from '../components/popups/patient/AddNewPatient';
import RightSidebar from '../components/sidebar/patient/PatientListRightSidebar';
import api from '../api';

export default function Patient() {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patients, setPatients] = useState([]);
  const { id } = useParams();

  const getPatients = async () => {
    if (window.location.pathname === '/dashboard/staff/clinician/patient') {
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

  const cardsData = [
    {
      icon: GreenIcon,
      amount: '478',
      title: 'Completed Exercises',
      icon2: GreenStats,
    },
    {
      icon: RedIcon,
      amount: '45',
      title: 'Patients with Errors',
      icon2: RedStats,
    },
    {
      icon: YellowIcon,
      amount: '345',
      title: 'Unchecked Exercise',
      icon2: YellowStats,
    },
  ];

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>

      <Grid className="bgClinicianTable" xl={7.5} lg={7}>
        <div className="breadCrumb">Dashboard &gt; Staff &gt; Lifeline Clinic &gt; Doctor &gt;</div>
        <div className="patientScreenCardsDiv">
          <div className="cards_div_patient_pg">
            {cardsData.map((item) => (
              <StatsCard
                Icon={item.icon}
                amount={item.amount}
                title={item.title}
                BottomStats={item.icon2}
                statsCardClassName="stats_card_main_div"
              />
            ))}
          </div>
        </div>
        <PatientTable patients={patients} />
      </Grid>
      <Grid xl={2.5} lg={2.5}>
        <RightSidebar />
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
