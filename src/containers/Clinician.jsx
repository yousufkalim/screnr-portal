import { React, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';

// assets import
import addBtn from '../assets/icons/addBtn.svg';

import { ReactComponent as Clinician } from '../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as GreenCircle } from '../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../assets/components/CardWithIcon/blueCircle.svg';

// child components import
import Sidebar from '../components/Sidebar';
import CardWithIcon from '../components/CardWithIcon';
import ClinicianTable from '../components/tables/clinician/ClinicianTable';
import AddClinician from '../components/popups/clinician/AddNewClinician';

export default function ClinicAdmin() {
  const [openAddClinican, setOpenAddClinican] = useState(false);

  const cardsData = [
    {
      icon: Clinician,
      amount: '65',
      title: 'Total Clinician',
      icon2: GreenCircle,
      className: 'green_circle',
    },
    {
      icon: Patients2,
      amount: '54',
      title: 'Total Patients',
      icon2: BlueCircle,
      className: 'blue_circle',
    },
  ];

  return (
    <Grid container>
      <Grid xl={2} lg={2}>
        <Sidebar />
      </Grid>

      <Grid className="bgClinicianTable" xl={10} lg={10}>
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
        <ClinicianTable />
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

      <AddClinician openAddClinican={openAddClinican} setOpenAddClinican={setOpenAddClinican} />
    </Grid>
  );
}
