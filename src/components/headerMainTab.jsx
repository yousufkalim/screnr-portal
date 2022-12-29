import React from 'react';
// mui imports
import Stack from '@mui/material/Stack';

// images import
import { ReactComponent as DashboardIcon } from '../assets/components/HeaderIcons/Dashboard.svg';
import { ReactComponent as ClinicAdminIcon } from '../assets/components/HeaderIcons/ClinicAdminIcon.svg';
import { ReactComponent as ClinicalIcon } from '../assets/components/HeaderIcons/Clinical.svg';
import { ReactComponent as PatientIcon } from '../assets/components/HeaderIcons/Patient.svg';
import { ReactComponent as PatientStatsIcon } from '../assets/components/HeaderIcons/PatientStatsIcon.svg';

export default function HeaderMainTab({ activeTab, HandleTabsSwitch }) {
  return (
    <Stack direction="row" spacing={6} alignItems="center">
      {activeTab === '/dashboard' || activeTab === '/dashboard/' ? (
        <div className="tab2_div">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
      ) : (
        <DashboardIcon
          onClick={() => {
            HandleTabsSwitch('/dashboard');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === '/dashboard/staff' || activeTab === '/dashboard/staff/' ? (
        <div className="tab2_div">
          <ClinicAdminIcon />
          <span>Clinic Admin</span>
        </div>
      ) : (
        <ClinicAdminIcon
          onClick={() => {
            HandleTabsSwitch('/dashboard/staff');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === '/dashboard/staff/clinician' || activeTab === '/dashboard/staff/clinician/' ? (
        <div className="tab2_div">
          <ClinicalIcon />
          <span>Clinician</span>
        </div>
      ) : (
        <ClinicalIcon
          onClick={() => {
            HandleTabsSwitch('/dashboard/staff/clinician');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === '/dashboard/staff/clinician/doctor' ||
      activeTab === '/dashboard/staff/clinician/doctor/' ? (
        <div className="tab2_div">
          <PatientIcon />
          <span>Patients</span>
        </div>
      ) : (
        <PatientIcon
          onClick={() => HandleTabsSwitch('/dashboard/staff/clinician/doctor')}
          className="tab_icon"
        />
      )}
      {activeTab === 'Patient Stats' ? (
        <div className="tab2_div">
          <PatientStatsIcon />
          <span>Patient Stats</span>
        </div>
      ) : (
        <PatientStatsIcon onClick={() => HandleTabsSwitch('Patient Stats')} className="tab_icon" />
      )}
    </Stack>
  );
}
