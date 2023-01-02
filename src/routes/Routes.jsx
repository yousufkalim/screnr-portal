// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import ClinicAdmin from '../containers/ClinicAdmin';
import Clinician from '../containers/Clinician';
import Patient from '../containers/Patient';

const superadminRoutes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/staff',
        element: <ClinicAdmin />,
        children: [
          {
            path: '/clinician',
            element: <Clinician />,
            children: [{ path: '/doctor', element: <Patient /> }],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    navigate: '/',
  },
];

export default superadminRoutes;
