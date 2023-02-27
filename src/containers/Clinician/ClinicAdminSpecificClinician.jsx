import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
import { useParams } from 'react-router-dom';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as TotalClinicians } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/CardWithIcon/blueCircle.svg';

// child components import
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import CardWithIcon from '../../components/cards/CardWithIcon';
import ClinicianTable from '../../components/tables/clinician/ClinicianTable';
import AddClinician from '../../components/popups/clinician/AddNewClinician';
import api from '../../api';

export default function ClinicAdmin() {
  const [openAddClinican, setOpenAddClinican] = useState(false);
  const [clinicians, setClinicians] = useState({});
  const { id } = useParams();

  const getClinicians = async () => {
    const { data } = await api('get', `/admins/clinicians/getCliniciansByClinicId/${id}`);
    if (data) {
      setClinicians(data);
    }
  };

  useEffect(() => {
    getClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsData = [
    {
      icon: TotalClinicians,
      amount: '10',
      title: 'Total Clinicians',
      icon2: Circle,
      className: 'yellow_circle',
      link: '',
    },
    {
      icon: Clinician,
      amount: '65',
      title: 'New Patients (last 7 days)',
      icon2: GreenCircle,
      className: 'green_circle',
    },
    {
      icon: Patients2,
      amount: '54',
      title: 'Total Active Patients',
      icon2: BlueCircle,
      className: 'blue_circle',
    },
  ];

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar id={id} txt="admins/clinics" roleTxt="Clinic" />
      </Grid>

      <Grid className="bgClinicianTable" xl={10} lg={9.5}>
        <div className="breadCrumb">Dashboard &gt; Staff &gt; Lifeline Clinic &gt; </div>
        <div className="clinicianScreenCardsDiv">
          <div className="cards_div_clinician_pg">
            {cardsData.map((item) => (
              <CardWithIcon
                Icon={item.icon}
                amount={item.amount}
                title={item.title}
                CircleIcon={item.icon2}
                LeftCircleClassName={item.className}
                cardClassName="card_main_div2"
              />
            ))}
          </div>
        </div>
        <ClinicianTable clinicians={clinicians} getClinicians={getClinicians} />
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
        clinicAdminId={id}
        openAddClinican={openAddClinican}
        setOpenAddClinican={setOpenAddClinican}
        getClinicians={getClinicians}
      />
    </Grid>
  );
}
