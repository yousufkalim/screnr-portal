import { useState, useEffect } from 'react';
// mui imports
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
// navigator import
import { useNavigate, useLocation } from 'react-router-dom';
// components imports
import AvatarComponent from './Avatar';
import HeaderTab2 from './headerMainTab';
// images imports
import { ReactComponent as Logo } from '../assets/components/HeaderIcons/Logo.svg';
import { ReactComponent as BellIcon } from '../assets/components/HeaderIcons/Bell.svg';
import { ReactComponent as SearchIcon } from '../assets/components/HeaderIcons/Search.svg';
import ProfilePopup from './popups/general/ProfilePopup';
import UpdatePasswordPopup from './popups/general/ChangePasswordPopup';
import EditProfilePopup from './popups/general/EditProfilePopup';

export default function Header() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(pathname);
  const [openProfilePopup, setOpenProfilePopup] = useState(false);
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [openEditProfilePopup, setOpenEditProfilePopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const HandleTabsSwitch = (targetTab) => {
    navigate(targetTab);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="header_main_div">
      <Stack direction="row" alignItems="center" className="tab1_div" justifyContent="flex-start">
        <Logo onClick={() => handleLogoClick()} className="app_logo" />
      </Stack>
      <HeaderTab2 activeTab={activeTab} HandleTabsSwitch={HandleTabsSwitch} />

      <div className="tab3_div">
        <Stack direction="row" spacing={4} alignItems="center" className="tab3_div">
          <SearchIcon className="search" />
          <BellIcon className="bellIcon" />
          <AvatarComponent
            alt="Rana Hamza"
            className="header_main_avatar"
            onClick={() => setOpenProfilePopup(true)}
          />
        </Stack>
      </div>
      <div className="menu_icon_div">
        <Stack direction="row" spacing={4} alignItems="center" justifyContent="flex-end">
          <MenuIcon sx={{ fontSize: 'large' }} />
        </Stack>
      </div>
      {openProfilePopup && (
        <ProfilePopup
          openProfilePopup={openProfilePopup}
          setOpenProfilePopup={setOpenProfilePopup}
          setOpenPasswordPopup={setOpenPasswordPopup}
          setOpenEditProfilePopup={setOpenEditProfilePopup}
        />
      )}
      {openEditProfilePopup && (
        <EditProfilePopup
          openEditProfilePopup={openEditProfilePopup}
          setOpenEditProfilePopup={setOpenEditProfilePopup}
        />
      )}

      {openPasswordPopup && (
        <UpdatePasswordPopup
          openUpdateModal={openPasswordPopup}
          setOpenUpdateModal={setOpenPasswordPopup}
        />
      )}
    </div>
  );
}
