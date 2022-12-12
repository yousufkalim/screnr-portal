import Stack from '@mui/material/Stack';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarComponent from './Avatar';
import { ReactComponent as Logo } from '../assets/components/HeaderIcons/Logo.svg';
import { ReactComponent as DashboardIcon } from '../assets/components/HeaderIcons/Dashboard.svg';
import { ReactComponent as ClinicalIcon } from '../assets/components/HeaderIcons/Clinical.svg';
import { ReactComponent as PatientIcon } from '../assets/components/HeaderIcons/Patient.svg';
import { ReactComponent as BellIcon } from '../assets/components/HeaderIcons/Bell.svg';
import { ReactComponent as SearchIcon } from '../assets/components/HeaderIcons/Search.svg';
// Component
export default function Header() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const HandleTabsSwitch = (currentTab) => {
    setActiveTab(currentTab);
  };
  const handleLogoClick = () => {
    console.log('logo clicked');
  };
  return (
    <div className="header_main_div">
      <Stack direction="row" alignItems="center" className="tab1_div" justifyContent="flex-start">
        <Logo onClick={() => handleLogoClick()} className="app_logo" />
      </Stack>
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
      <div className="tab3_div">
        <Stack direction="row" spacing={4} alignItems="center" className="tab3_div">
          <SearchIcon className="search" />
          <BellIcon className="bellIcon" />
          <AvatarComponent alt="Rana Hamza" className="header_avatar" />
        </Stack>
      </div>
      <div className="menu_icon_div">
        <Stack direction="row" spacing={4} alignItems="center" justifyContent="flex-end">
          <MenuIcon sx={{ fontSize: 'large' }} />
        </Stack>
      </div>
    </div>
  );
}
