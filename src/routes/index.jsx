import Login from '../unAuth/Login';
import Dashboard from '../pages/SuperAdmin/AdminDashboard.Page';
import ClinicAdmin from '../pages/ClinicAdmin/StaffSpecificClinicAdmin.Page';
import AllClinicAdmins from '../pages/ClinicAdmin/AllClinicAdmins.Page';
import Patient from '../pages/Patient/ClinicianSpecificPatient.Page';
import AllPatients from '../pages/Patient/AllPatients.Page';
import Activity from '../pages/SuperAdmin/Activity.Page';
import Prescription from '../pages/Patient/Prescription.Page';
import AddPatientPrescription from '../pages/Patient/AddPrescription.Page';
import PatientMessageBox from '../pages/Patient/PatientMessageBox.Page';
import Index from '../pages/Patient/PatientStats/Index';
import SearchScreen from '../components/popups/general/SearchScreen.Popup';
import ClinicianDashboard from '../pages/Clinician/Dashboard.Page';
import Clinician from '../pages/Clinician/ClinicAdminSpecificClinician.Page';
import AllClinicians from '../pages/Clinician/AllClinicians.Page';
import ClinicAdminDashboard from '../pages/ClinicAdmin/ClinicAdminDashboard.Page';
import StaffDashboard from '../pages/Staff/StaffDashboard.Page';

const AllRoutes = [
  {
    path: '/',
    navigate: '/login',
  },
  {
    path: '/login',
    element: <Login />,
  },
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
  {
    path: '/searchScreen',
    element: <SearchScreen />,
    protected: true,
    roles: ['admin', 'staff', 'clinic', 'clinician'],
  },
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

export default AllRoutes;
