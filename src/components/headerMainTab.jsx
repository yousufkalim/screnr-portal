import React from 'react';
// mui imports
import Stack from '@mui/material/Stack';

// images import
import { ReactComponent as DashboardIcon } from '../assets/components/HeaderIcons/Dashboard.svg';
import { ReactComponent as ClinicAdminIcon } from '../assets/components/HeaderIcons/ClinicAdminIcon.svg';
import { ReactComponent as ClinicalIcon } from '../assets/components/HeaderIcons/Clinical.svg';
import { ReactComponent as PatientIcon } from '../assets/components/HeaderIcons/Patient.svg';
import { ReactComponent as PatientStatsIcon } from '../assets/components/HeaderIcons/PatientStatsIcon.svg';

export default function HeaderMainTab({ activeTab, handleTabsSwitch }) {
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
            handleTabsSwitch('/dashboard');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === '/clinics' ? (
        <div className="tab2_div">
          <ClinicAdminIcon />
          <span>Clinic Admin</span>
        </div>
      ) : (
        <ClinicAdminIcon
          onClick={() => {
            handleTabsSwitch('/clinics');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === '/clinicians' ? (
        <div className="tab2_div">
          <ClinicalIcon />
          <span>Clinician</span>
        </div>
      ) : (
        <ClinicalIcon
          onClick={() => {
            handleTabsSwitch('/clinicians');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === '/patients' ? (
        <div className="tab2_div">
          <PatientIcon />
          <span>Patients</span>
        </div>
      ) : (
        <PatientIcon onClick={() => handleTabsSwitch('/patients')} className="tab_icon" />
      )}
      {activeTab === '/patients/:id/exercise/reports' ? (
        <div className="tab2_div">
          <PatientStatsIcon />
          <span>Patient Stats</span>
        </div>
      ) : (
        <PatientStatsIcon
          // onClick={() => handleTabsSwitch('/patients/:id/exercise/reports')}
          className="tab_icon"
        />
      )}
    </Stack>
  );
}
