// mui imports
import { Grid } from '@mui/material';

// assets import
import { ReactComponent as Clock } from '../assets/components/TimeCard/clock.svg';
import { ReactComponent as Login } from '../assets/components/TimeCard/login.svg';
import { ReactComponent as LoginCount } from '../assets/components/TimeCard/loginCount.svg';
import { ReactComponent as Logoff } from '../assets/components/TimeCard/logoff.svg';

// child components import
import GenericSidebar from '../components/sidebar/GenericLeftSidebar';
import PatientSidebar from '../components/sidebar/patient/PatientSidebar';
import TimeCard from '../components/cards/TimeCard';
import ActivityTable from '../components/tables/activityLog/ActivityTable';
import RightSidebar from '../components/sidebar/patient/PatientListRightSidebar';

export default function Activity() {
  const cardsData = [
    {
      icon: Login,
      time: '1 Hr Ago',
      text: 'Last Login',
    },
    {
      icon: LoginCount,
      time: '22',
      text: 'Login count',
    },
    {
      icon: Clock,
      time: '120 Hr',
      text: 'Login Hours',
    },

    {
      icon: Logoff,
      time: '30 Min Ago',
      text: 'Last Logoff',
    },
  ];

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
