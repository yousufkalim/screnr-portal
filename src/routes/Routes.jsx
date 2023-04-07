// unAuth Routes
import Login from '../unAuth/Login';
// Routes
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

const superadminRoutes = [
  {
    path: '/',
    navigate: '/login',
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/clinician/dasboard',
    element: <ClinicianDashboard />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
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
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  {
    path: '/patients',
    element: <AllPatients />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
  { path: '/searchScreen', element: <SearchScreen />, protected: true, roles: ['admin'] },

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
    path: '/patients/:sessionId/exercise/exerciseDetails/:prescriptionId',
    element: <Index />,
    roles: ['admin'],
    protected: true,
  },
];

export default superadminRoutes;
