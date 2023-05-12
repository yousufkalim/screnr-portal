import { useState, useEffect, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import AvatarComponent from '../Avatar/Avatar.Component';
import HeaderTab2 from './MainTab.component';
import { ReactComponent as Logo } from '../../assets/components/HeaderIcons/Logo.svg';
import { ReactComponent as SearchIcon } from '../../assets/components/HeaderIcons/Search.svg';
import ProfilePopup from '../popups/general/Profile.Popup';
import { Store } from '../../StoreContext';
import UpdatePasswordPopup from '../popups/general/ChangePassword.Popup';
import EditProfilePopup from '../popups/general/EditProfile.Popup';
import { getMediaUrl } from '../../config';
import { ReactComponent as DashboardIcon } from '../../assets/components/HeaderIcons/Dashboard.svg';
import { ReactComponent as ClinicAdminIcon } from '../../assets/components/HeaderIcons/ClinicAdminIcon.svg';
import { ReactComponent as ClinicalIcon } from '../../assets/components/HeaderIcons/Clinical.svg';
import { ReactComponent as PatientIcon } from '../../assets/components/HeaderIcons/Patient.svg';
import { ReactComponent as PatientStatsIcon } from '../../assets/components/HeaderIcons/PatientStatsIcon.svg';

const tabsByUser = {
  admin: [
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
  ],
  staff: [
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
  ],
  clinic: [
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
  ],
  clinician: [
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
  ],
  patient: [
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
  ],
};

const redirectPathByRole = {
  admin: '/admin/dashboard',
  staff: '/staff/dashboard',
  clinic: '/clinic/dashboard',
  clinician: '/clinician/dasboard',
  patient: '/patient/dashboard',
};

export default function Header() {
  const { user } = Store();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(pathname);
  const [openProfilePopup, setOpenProfilePopup] = useState(false);
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [openEditProfilePopup, setOpenEditProfilePopup] = useState(false);
  const useClickHandler = (handler) => {
    return useCallback(
      (event) => {
        event.preventDefault();
        handler();
      },
      [handler],
    );
  };
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const handleTabsSwitch = (targetTab) => navigate(targetTab);
  const handleLogoClick = () => user && navigate(redirectPathByRole[user?.role]);
  const handleSearchLogoClick = () => navigate('/searchScreen');
  const handleLogoClickCallback = useClickHandler(handleLogoClick);
  const handleSearchLogoClickCallback = useClickHandler(handleSearchLogoClick);

  const ProfilePopups = openProfilePopup && (
    <ProfilePopup
      openProfilePopup={openProfilePopup}
      setOpenProfilePopup={setOpenProfilePopup}
      setOpenPasswordPopup={setOpenPasswordPopup}
      setOpenEditProfilePopup={setOpenEditProfilePopup}
    />
  );
  const EditProfilePopups = openEditProfilePopup && (
    <EditProfilePopup
      openEditProfilePopup={openEditProfilePopup}
      setOpenEditProfilePopup={setOpenEditProfilePopup}
    />
  );
  const UpdatePasswordPopups = openPasswordPopup && (
    <UpdatePasswordPopup
      openUpdateModal={openPasswordPopup}
      setOpenUpdateModal={setOpenPasswordPopup}
    />
  );

  return (
    <div className="header_main_div">
      <Stack direction="row" alignItems="center" className="tab1_div" justifyContent="flex-start">
        <Logo onClick={handleLogoClickCallback} className="app_logo" />
      </Stack>
      <HeaderTab2
        activeTab={activeTab}
        handleTabsSwitch={handleTabsSwitch}
        tabs={tabsByUser[user?.role]}
      />
      <div className="tab3_div">
        <Stack direction="row" spacing={4} alignItems="center" className="tab3_div">
          <SearchIcon onClick={handleSearchLogoClickCallback} className="search" />
          {user?.profile_pic ? (
            <div
              className="headerImgDiv"
              role="presentation"
              onClick={() => setOpenProfilePopup(true)}
            >
              <img src={getMediaUrl(user?.profile_pic)} className="headerProfileImage" alt="" />
            </div>
          ) : (
            <AvatarComponent
              alt={`${user?.first_name} ${user?.last_name}`}
              className="header_main_avatar"
              onClick={() => setOpenProfilePopup(true)}
            />
          )}
        </Stack>
      </div>
      <div className="menu_icon_div">
        <Stack direction="row" spacing={4} alignItems="center" justifyContent="flex-end">
          <MenuIcon sx={{ fontSize: 'large' }} />
        </Stack>
      </div>
      {ProfilePopups}
      {EditProfilePopups}
      {UpdatePasswordPopups}
    </div>
  );
}
