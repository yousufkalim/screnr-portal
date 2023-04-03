// Routes
import Login from '../unAuth/Login';
import Dashboard from '../pages/Dashboard';
import ClinicAdmin from '../pages/ClinicAdmin/StaffSpecificClinicAdmin';
import AllClinicAdmins from '../pages/ClinicAdmin/AllClinicAdmins';
import Clinician from '../pages/Clinician/ClinicAdminSpecificClinician';
import AllClinicians from '../pages/Clinician/AllClinicians';
import Patient from '../pages/Patient/ClinicianSpecificPatient';
import AllPatients from '../pages/Patient/AllPatients';
import Activity from '../pages/Activity';
import Prescription from '../pages/Patient/Prescription';
import AddPatientPrescription from '../pages/Patient/AddPrescription';
import PatientMessageBox from '../pages/Patient/PatientMessageBox';
import Index from '../pages/Patient/PatientStats/Index';
import SearchScreen from '../components/popups/general/SearchScreen';
import Session from '../pages/Patient/PatientStats/Session';

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
    roles: ['admin'],
  },
  {
    path: '/clinics',
    element: <AllClinicAdmins />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/clinicians',
    element: <AllClinicians />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/patients',
    element: <AllPatients />,
    protected: true,
    roles: ['admin'],
  },
  { path: '/searchScreen', element: <SearchScreen />, protected: true, roles: ['admin'] },

  // routes for getting data by a specific id
  {
    path: '/staff/:id',
    element: <ClinicAdmin />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/staff/clinicAdmin/Clinician/Patient/Prescription/Session/:sessionId/:prescriptionId',
    element: <Session />,
    protected: true,
    roles: ['admin'],
  },

  {
    path: '/clinics/:id',
    element: <Clinician />,
    protected: true,
    roles: ['admin'],
  },

  {
    path: '/clinicians/:id',
    element: <Patient />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/clinicians/:id/activity',
    element: <Activity />,
    protected: true,
    roles: ['admin'],
  },

  {
    path: '/patients/:id/prescription',
    element: <Prescription />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/patients/:patientId/addPrescription/:clinicianId',
    element: <AddPatientPrescription />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/patients/:id/messages',
    element: <PatientMessageBox />,
    roles: ['admin'],
    protected: true,
  },
  {
    path: '/patients/:id/activity',
    element: <Activity />,
    roles: ['admin'],
    protected: true,
  },

  {
    path: '/patients/:sessionId/exercise',
    element: <Index />,
    roles: ['admin'],
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
