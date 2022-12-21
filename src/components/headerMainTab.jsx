import React from 'react';
// mui imports
import Stack from '@mui/material/Stack';
// images import
import { ReactComponent as DashboardIcon } from '../assets/components/HeaderIcons/Dashboard.svg';
import { ReactComponent as ClinicAdminIcon } from '../assets/components/HeaderIcons/ClinicAdminIcon.svg';
import { ReactComponent as ClinicalIcon } from '../assets/components/HeaderIcons/Clinical.svg';
import { ReactComponent as PatientIcon } from '../assets/components/HeaderIcons/Patient.svg';
import { ReactComponent as PatientStatsIcon } from '../assets/components/HeaderIcons/PatientStatsIcon.svg';

export default function headerMainTab({ activeTab, HandleTabsSwitch }) {
  return (
    <Stack direction="row" spacing={6} alignItems="center">
      {activeTab === 'Dashboard' ? (
        <div className="tab2_div">
          <DashboardIcon />
          <span>{activeTab}</span>
        </div>
      ) : (
        <DashboardIcon
          onClick={() => {
            HandleTabsSwitch('Dashboard');
          }}
          className="tab_icon"
        />
      )}
      {activeTab === 'Clinic Admin' ? (
        <div className="tab2_div">
          <ClinicAdminIcon />
          <span>{activeTab}</span>
        </div>
      ) : (
        <ClinicAdminIcon onClick={() => HandleTabsSwitch('Clinic Admin')} className="tab_icon" />
      )}
      {activeTab === 'Clinician' ? (
        <div className="tab2_div">
          <ClinicalIcon />
          <span>{activeTab}</span>
        </div>
      ) : (
        <ClinicalIcon onClick={() => HandleTabsSwitch('Clinician')} className="tab_icon" />
      )}
      {activeTab === 'Patients' ? (
        <div className="tab2_div">
          <PatientIcon />
          <span>{activeTab}</span>
        </div>
      ) : (
        <PatientIcon onClick={() => HandleTabsSwitch('Patients')} className="tab_icon" />
      )}
      {activeTab === 'Patient Stats' ? (
        <div className="tab2_div">
          <PatientStatsIcon />
          <span>{activeTab}</span>
        </div>
      ) : (
        <PatientStatsIcon onClick={() => HandleTabsSwitch('Patient Stats')} className="tab_icon" />
      )}
    </Stack>
  );
}
