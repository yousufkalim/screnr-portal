// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import ClinicAdmin from '../containers/ClinicAdmin';
import Clinician from '../containers/Clinician';
import Patient from '../containers/Patient';

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
];

export default superadminRoutes;
