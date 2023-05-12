import { Grid } from '@mui/material';
import GenericSidebar from '../../components/sidebar/GenericLeftSidebar';
import PatientSidebar from '../../components/sidebar/patient/PatientSidebar';
import TimeCard from '../../components/cards/TimeCard.Component';
import ActivityTable from '../../components/tables/activityLog/ActivityTable';
import RightSidebar from '../../components/sidebar/patient/PatientListRightSidebar';
import { cardsData } from '../../utils/data';

export default function Activity() {
  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        {window.location.pathname === 'clinician/:id/activity' ? (
          <PatientSidebar />
        ) : (
          <GenericSidebar />
        )}
      </Grid>
      <Grid className="bgClinicianTable" xl={7.5} lg={7}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Lifeline Clinic &gt; Doctor &gt;{' '}
        </div>
        <div className="patientScreenCardsDiv">
          <div className="cards_div_patient_pg">
            {cardsData.map((item) => (
              <TimeCard
                Icon={item.icon}
                time={item.time}
                text={item.text}
                classname="top_activity_cards"
              />
            ))}
          </div>
        </div>
        <ActivityTable />
      </Grid>
      <Grid xl={2.5} lg={2.5}>
        <RightSidebar />
      </Grid>
    </Grid>
  );
}
