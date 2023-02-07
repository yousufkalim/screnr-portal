// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import ClinicAdmin from '../containers/ClinicAdmin/ClinicAdmin';
import AllClinicAdmins from '../containers/ClinicAdmin/AllClinicAdmins';
import Clinician from '../containers/Clinician/Clinician';
import AllClinicians from '../containers/Clinician/AllClinicians';
import Patient from '../containers/Patient/Patient';
import AllPatients from '../containers/Patient/AllPatients';
import Activity from '../containers/Activity';
import Prescription from '../containers/Patient/Prescription';
import AddPatientPrescription from '../containers/Patient/AddPrescription';
import PatientMessageBox from '../containers/Patient/PatientMessageBox';
import Index from '../containers/Patient/PatientStats/Index';

const superadminRoutes = [
  {
    path: '/',
    navigate: '/login',
  },
  {
    path: '/login',
    element: <Login />,
  },

  // routes for all data
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/clinics',
    element: <AllClinicAdmins />,
  },
  {
    path: '/clinicians',
    element: <AllClinicians />,
  },
  {
    path: '/patients',
    element: <AllPatients />,
  },

  // routes for getting data by a specific id
  {
    path: '/staff/:id',
    element: <ClinicAdmin />,
  },

  {
    path: '/clinics/:id',
    element: <Clinician />,
  },

  {
    path: '/clinicians/:id',
    element: <Patient />,
  },
  {
    path: '/clinicians/:id/activity',
    element: <Activity />,
  },

  {
    path: '/patients/:id/prescription',
    element: <Prescription />,
  },
  {
    path: '/patients/:id/addPrescription',
    element: <AddPatientPrescription />,
  },
  {
    path: '/patients/:id/messages',
    element: <PatientMessageBox />,
  },
  {
    path: '/patients/:id/activity',
    element: <Activity />,
  },

  {
    path: '/patients/:id/exercise',
    element: <Index />,
    children: [
      {
        path: '/reports',
        element: <Index />,
      },
      {
        path: '/painSurvey',
        element: <Index />,
      },
      {
        path: '/Supine Bridge',
        element: <Index />,
      },
    ],
  },
];

export default superadminRoutes;
