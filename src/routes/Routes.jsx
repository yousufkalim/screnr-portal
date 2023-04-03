// Routes
import Login from '../unAuth/Login';
import Dashboard from '../containers/Dashboard';
import ClinicAdmin from '../containers/ClinicAdmin/StaffSpecificClinicAdmin';
import AllClinicAdmins from '../containers/ClinicAdmin/AllClinicAdmins';
import Clinician from '../containers/Clinician/ClinicAdminSpecificClinician';
import AllClinicians from '../containers/Clinician/AllClinicians';
import Patient from '../containers/Patient/ClinicianSpecificPatient';
import AllPatients from '../containers/Patient/AllPatients';
import Activity from '../containers/Activity';
import Prescription from '../containers/Patient/Prescription';
import AddPatientPrescription from '../containers/Patient/AddPrescription';
import PatientMessageBox from '../containers/Patient/PatientMessageBox';
import Index from '../containers/Patient/PatientStats/Index';
import SearchScreen from '../components/popups/general/SearchScreen';
import Session from '../containers/Patient/PatientStats/Session';

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
  { path: '/searchScreen', element: <SearchScreen />, protected: true },

  // routes for getting data by a specific id
  {
    path: '/staff/:id',
    element: <ClinicAdmin />,
    protected: true,
  },
  {
    path: '/staff/clinicAdmin/Clinician/Patient/Prescription/Session/:sessionId/:prescriptionId',
    element: <Session />,
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
    path: '/patients/:patientId/addPrescription/:clinicianId',
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
    path: '/patients/:sessionId/exercise',
    element: <Index />,
    protected: true,

    children: [
      {
        path: '/reports',
        element: <Index />,
        protected: true,
      },
      {
        path: '/painSurvey/:prescriptionId',
        element: <Index />,
        protected: true,
      },
      {
        path: '/exerciseDetails/:exerciseId',
        element: <Index />,
        protected: true,
      },
    ],
  },
];

export default superadminRoutes;
