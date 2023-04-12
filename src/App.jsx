/* eslint-disable no-nested-ternary */
// Init
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'react-easy-router';
import superadminRoutes from './routes/Routes';
import Header from './components/Header/Header';
import './css/index.css';
import { UpdateStore } from './StoreContext';
import { baseUrl } from './config';
import { ReactComponent as DashboardIcon } from './assets/components/HeaderIcons/Dashboard.svg';
import { ReactComponent as ClinicAdminIcon } from './assets/components/HeaderIcons/ClinicAdminIcon.svg';
import { ReactComponent as ClinicalIcon } from './assets/components/HeaderIcons/Clinical.svg';
import { ReactComponent as PatientIcon } from './assets/components/HeaderIcons/Patient.svg';
import { ReactComponent as PatientStatsIcon } from './assets/components/HeaderIcons/PatientStatsIcon.svg';
// Component
const adminTabs = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    IconComponent: DashboardIcon,
  },
  {
    path: '/clinics',
    label: 'Clinic Admin',
    IconComponent: ClinicAdminIcon,
  },
  {
    path: '/clinicians',
    label: 'Clinician',
    IconComponent: ClinicalIcon,
  },
  {
    path: '/patients',
    label: 'Patients',
    IconComponent: PatientIcon,
  },
  {
    path: '/patients/:id/exercise/reports',
    label: 'Patient Statics',
    IconComponent: PatientStatsIcon,
  },
];

const clinicianDasboardRoutes = [
  {
    path: '/clinician/dasboard',
    label: 'Dashboard',
    IconComponent: DashboardIcon,
  },
  {
    path: '/patients',
    label: 'Patients',
    IconComponent: PatientIcon,
  },
  {
    path: '/patients/:id/exercise/reports',
    label: 'Patient Statics',
    IconComponent: PatientStatsIcon,
  },
];

const clinicDasboardRoutes = [
  {
    label: 'Dashboard',
    path: '/clinic/dashboard',
    IconComponent: DashboardIcon,
  },
  {
    label: 'Clinician',
    path: '/clinicians',
    IconComponent: ClinicalIcon,
  },
  {
    label: 'Patients',
    path: '/patients',
    IconComponent: PatientIcon,
  },
  {
    label: 'Patient Statics',
    path: '/patients/:id/exercise/reports',
    IconComponent: PatientStatsIcon,
  },
];

const StaffDashboardRoutes = [
  {
    path: '/staff/dashboard',
    label: 'Dashboard',
    IconComponent: DashboardIcon,
  },
  {
    path: '/clinics',
    label: 'Clinic Admin',
    IconComponent: ClinicAdminIcon,
  },
  {
    path: '/clinicians',
    label: 'Clinician',
    IconComponent: ClinicalIcon,
  },
  {
    path: '/patients',
    label: 'Patients',
    IconComponent: PatientIcon,
  },
  {
    path: '/patients/:id/exercise/reports',
    label: 'Patient Statics',
    IconComponent: PatientStatsIcon,
  },
];

const tabsByUser = {
  admin: adminTabs,
  staff: StaffDashboardRoutes,
  clinic: clinicDasboardRoutes,
  clinician: clinicianDasboardRoutes,
  patient: adminTabs,
};

const redirectPathByRole = {
  admin: '/admin/dashboard',
  staff: '/staff/dashboard',
  clinic: '/clinic/dashboard',
  clinician: '/clinician/dasboard',
  patient: '/patient/dashboard',
};

function App() {
  const updateStore = UpdateStore();
  const { pathname } = useLocation();
  const [role, setRole] = useState('');
  const isAuthenticated = async () => {
    const { data } = await axios.get(`${baseUrl}/auth`, { withCredentials: true });
    setRole(data.user?.role);
    updateStore({ loggedIn: true, user: data.user });
    return { authenticated: true, role: data.user?.role };
  };

  useEffect(() => {
    if (pathname === '/' || pathname === '/login') {
      isAuthenticated().then((r) => r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />
      {/* All Superadmin routes should have header except for login page */}
      {pathname !== '/' && pathname !== '/login' && (
        <Header logoRedirectPath={redirectPathByRole[role]} tabs={tabsByUser[role]} />
      )}
      {/* Superadmin routes alongwith header */}
      <Router routes={superadminRoutes} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
