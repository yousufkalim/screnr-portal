import { useState, useEffect, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import AvatarComponent from '../Avatar';
import HeaderTab2 from '../headerMainTab';
import { ReactComponent as Logo } from '../../assets/components/HeaderIcons/Logo.svg';
import { ReactComponent as SearchIcon } from '../../assets/components/HeaderIcons/Search.svg';
import ProfilePopup from '../popups/general/ProfilePopup';
import { Store } from '../../StoreContext';
import UpdatePasswordPopup from '../popups/general/ChangePasswordPopup';
import EditProfilePopup from '../popups/general/EditProfilePopup';
import { getMediaUrl } from '../../config';

export default function Header({ logoRedirectPath, tabs }) {
  const { pathname } = useLocation();
  const { user } = Store();
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

  const handleTabsSwitch = (targetTab) => {
    navigate(targetTab);
  };

  const handleLogoClick = () => {
    navigate(logoRedirectPath);
  };

  const handleSearchLogoClick = () => {
    navigate('/searchScreen');
  };

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
      <HeaderTab2 activeTab={activeTab} handleTabsSwitch={handleTabsSwitch} tabs={tabs} />
      <div className="tab3_div">
        <Stack direction="row" spacing={4} alignItems="center" className="tab3_div">
          <SearchIcon onClick={handleSearchLogoClickCallback} className="search" />
          {user?.profile_pic ? (
            <div
              className="headerImgDiv"
              role="presentation"
              onClick={() => setOpenProfilePopup(true)}
            >
              <img src={getMediaUrl(user.profile_pic)} className="headerProfileImage" alt="" />
            </div>
          ) : (
            <AvatarComponent
              alt={`${user.first_name} ${user.last_name}`}
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
