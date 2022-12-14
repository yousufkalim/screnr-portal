import React from 'react';
// mui imports
import Stack from '@mui/material/Stack';
// images import
import { ReactComponent as DashboardIcon } from '../assets/components/headerIcons/dashboard.svg';
import { ReactComponent as ClinicalIcon } from '../assets/components/headerIcons/clinical.svg';
import { ReactComponent as PatientIcon } from '../assets/components/headerIcons/patient.svg';

export default function headerMainTab({ activeTab, HandleTabsSwitch }) {
  return (
    <Stack direction="row" spacing={4} alignItems="center">
      {activeTab === 'Dashboard' ? (
        <div className="tab2_div">
          <DashboardIcon />
          <span>{activeTab}</span>
        </div>
      ) : (
        <DashboardIcon onClick={() => HandleTabsSwitch('Dashboard')} className="tab_icon" />
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
    </Stack>
  );
}
