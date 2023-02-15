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
    protected: true,
  },
  {
    path: '/clinics',
    element: <AllClinicAdmins />,
    protected: true,
  },
  {
    path: '/clinicians',
    element: <AllClinicians />,
    protected: true,
  },
  {
    path: '/patients',
    element: <AllPatients />,
    protected: true,
  },

  // routes for getting data by a specific id
  {
    path: '/staff/:id',
    element: <ClinicAdmin />,
    protected: true,
  },

  {
    path: '/clinics/:id',
    element: <Clinician />,
    protected: true,
  },

  {
    path: '/clinicians/:id',
    element: <Patient />,
    protected: true,
  },
  {
    path: '/clinicians/:id/activity',
    element: <Activity />,
    protected: true,
  },

  {
    path: '/patients/:id/prescription',
    element: <Prescription />,
    protected: true,
  },
  {
    path: '/patients/:id/addPrescription',
    element: <AddPatientPrescription />,
    protected: true,
  },
  {
    path: '/patients/:id/messages',
    element: <PatientMessageBox />,
    protected: true,
  },
  {
    path: '/patients/:id/activity',
    element: <Activity />,
    protected: true,
  },

  {
    path: '/patients/:id/exercise',
    element: <Index />,
    protected: true,

    children: [
      {
        path: '/reports',
        element: <Index />,
        protected: true,
      },
      {
        path: '/painSurvey',
        element: <Index />,
        protected: true,
      },
      {
        path: '/Supine Bridge',
        element: <Index />,
        protected: true,
      },
    ],
  },
];

export default superadminRoutes;
