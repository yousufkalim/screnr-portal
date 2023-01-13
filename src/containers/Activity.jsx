// mui imports
import { Grid } from '@mui/material';

// assets import
import { ReactComponent as Clock } from '../assets/components/TimeCard/clock.svg';
import { ReactComponent as Login } from '../assets/components/TimeCard/login.svg';
import { ReactComponent as LoginCount } from '../assets/components/TimeCard/loginCount.svg';
import { ReactComponent as Logoff } from '../assets/components/TimeCard/logoff.svg';

// child components import
import Sidebar from '../components/Sidebar';
import TimeCard from '../components/TimeCard';
import ActivityTable from '../components/tables/activityLog/ActivityTable';
import RightSidebar from '../components/rightSidebar/patient/PatientListRightSidebar';

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
        <Sidebar />
      </Grid>

      <Grid className="bgClinicianTable" xl={7.5} lg={7}>
        <div className="breadCrumb">
          Dashboard &gt; &nbsp;Staff &gt; &nbsp;Lifeline Clinic &gt;&nbsp;Doctor&gt;
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
