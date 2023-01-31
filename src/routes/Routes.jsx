// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import ClinicAdmin from '../containers/ClinicAdmin';
import Clinician from '../containers/Clinician';
import Patient from '../containers/Patient';
import Activity from '../containers/Activity';
import Prescription from '../containers/Prescription';
import AddPatientPrescription from '../containers/AddPrescription';
import PatientMessageBox from '../containers/PatientMessageBox';
import Reports from '../containers/PatientStats/Reports';
import PainSurvey from '../containers/PatientStats/PainSurvey';
import Session from '../containers/PatientStats/Session';

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
    path: '/dashboard/staff/clinician/patient/:id',
    element: <Patient />,
  },
  {
    path: '/dashboard/staff/clinician/patient',
    element: <Patient />,
  },

  {
    path: '/dashboard/staff/clinician/activity',
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
  {
    path: '/dashboard/staff/clinician/patient/messages',
    element: <PatientMessageBox />,
  },
  {
    path: '/dashboard/staff/clinician/patient/activity',
    element: <Activity />,
  },
  {
    path: '/dashboard/staff/clinician/patient/prescription/reports',
    element: <Reports />,
  },
  {
    path: '/dashboard/staff/clinician/patient/prescription/painSurvey',
    element: <PainSurvey />,
  },
  {
    path: '/dashboard/staff/clinician/patient/prescription/session/Supine Bridge',
    element: <Session />,
  },
  {
    path: '/dashboard/staff/clinician/patient/prescription/session/Bird Dog',
    element: <Session />,
  },
  {
    path: '/dashboard/staff/clinician/patient/prescription/session/Cat Camel',
    element: <Session />,
  },
];

export default superadminRoutes;
