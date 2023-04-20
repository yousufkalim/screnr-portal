// unAuth Routes
import Login from '../unAuth/Login';
import VerifyEmail from '../unAuth/VerifyEmail';
import Dashboard from '../pages/Dashboard';
import ClinicAdmin from '../pages/ClinicAdmin/StaffSpecificClinicAdmin';
import AllClinicAdmins from '../pages/ClinicAdmin/AllClinicAdmins';
import Patient from '../pages/Patient/ClinicianSpecificPatient';
import AllPatients from '../pages/Patient/AllPatients';
import Activity from '../pages/Activity';
import Prescription from '../pages/Patient/Prescription';
import AddPatientPrescription from '../pages/Patient/AddPrescription';
import PatientMessageBox from '../pages/Patient/PatientMessageBox';
import Index from '../pages/Patient/PatientStats/Index';
import SearchScreen from '../components/popups/general/SearchScreen';
// clinician screen's
import ClinicianDashboard from '../pages/Clinician/ClinicianDashboard';
import Clinician from '../pages/Clinician/ClinicAdminSpecificClinician';
import AllClinicians from '../pages/Clinician/AllClinicians';
import ClinicAdminDashboard from '../pages/ClinicAdmin/ClinicAdminDashboard';
import StaffDashboard from '../pages/Staff/dashboard';

const superadminRoutes = [
  // unAuth routes
  {
    path: '/',
    navigate: '/login',
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/VerifyEmail',
    element: <VerifyEmail />,
  },

  // routes for all data
  {
    path: '/clinician/dasboard',
    element: <ClinicianDashboard />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  {
    path: '/clinic/dashboard',
    element: <ClinicAdminDashboard />,
    protected: true,
    roles: ['admin', 'staff', 'clinic'],
  },
  {
    path: '/staff/dashboard',
    element: <StaffDashboard />,
    protected: true,
    roles: ['admin', 'staff'],
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
    protected: true,
    roles: ['admin'],
  },
  // All users list by roles
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
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  {
    path: '/patients',
    element: <AllPatients />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  // search screen
  {
    path: '/searchScreen',
    element: <SearchScreen />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },

  // routes for getting data by a specific id
  {
    path: '/staff/:id',
    element: <ClinicAdmin />,
    protected: true,
    roles: ['admin', 'staff'],
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
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  {
    path: '/clinicians/:id/activity',
    element: <Activity />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },

  {
    path: '/patients/:id/prescription',
    element: <Prescription />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  {
    path: '/patients/:patientId/addPrescription/:clinicianId',
    element: <AddPatientPrescription />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
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
    roles: ['admin', 'staff', 'clinic', 'clinician'],
    protected: true,
  },
  {
    path: '/patients/:sessionId/exercise/exerciseDetails/:prescriptionId',
    element: <Index />,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
    protected: true,
  },
];

export default superadminRoutes;
