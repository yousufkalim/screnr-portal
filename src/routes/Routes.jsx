// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import ClinicAdmin from '../containers/ClinicAdmin';
import Clinician from '../containers/Clinician';
import Patient from '../containers/Patient';
import Activity from '../containers/Activity';
import Prescription from '../containers/Prescription';
import AddPatientPrescription from '../containers/AddPrescription';

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
  },
  {
    path: '/dashboard/staff/:id',
    element: <ClinicAdmin />,
  },
  {
    path: '/dashboard/staff',
    element: <ClinicAdmin />,
  },
  {
    path: '/dashboard/staff/clinician/:id',
    element: <Clinician />,
  },
  {
    path: '/dashboard/staff/clinician',
    element: <Clinician />,
  },
  {
    path: '/dashboard/staff/clinician/doctor/:id',
    element: <Patient />,
  },
  {
    path: '/dashboard/staff/clinician/doctor',
    element: <Patient />,
  },
  {
    path: '/dashboard/staff/clinician/doctor/activity',
    element: <Activity />,
  },
  {
    path: '/dashboard/staff/clinician/patient/prescription',
    element: <Prescription />,
  },
  {
    path: '/dashboard/staff/clinician/patient/addPrescription',
    element: <AddPatientPrescription />,
  },
];

export default superadminRoutes;
