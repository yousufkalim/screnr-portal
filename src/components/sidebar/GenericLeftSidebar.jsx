/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// import { toast } from 'react-toastify';
import { ReactComponent as Phone } from '../../assets/images/staffScreen/phone.svg';
import { ReactComponent as Email } from '../../assets/images/staffScreen/email.svg';
import { ReactComponent as Expiry } from '../../assets/images/staffScreen/expiryDate.svg';
import { ReactComponent as Activity } from '../../assets/components/TimeCard/activity.svg';
import edit from '../../assets/icons/sidebarEdit.svg';
import AvatarComponent from '../Avatar/Avatar.Component';
// import request from '../../request';
import { getMediaUrl } from '../../config';
import PhoneFormat from '../../utils/PhoneFormat';
import Chart from '../charts/patient/Chart.Component';

export default function LeftSidebar({ id, roleTxt, setOpen, open, activityLog, userData }) {
  const { pathname } = window.location;
  const navigate = useNavigate();
  const [activityClicked, setActivityClicked] = useState(false);
  const handleEditIconClick = () => setOpen(!open);

  let result = '';
  if (userData?.role === 'clinic') {
    result = userData?.userData?.clinic_name || '';
  } else if (userData?.role === 'clinician') {
    result = userData?.userData?.clinic?.userData?.clinic_name || '';
  } else if (userData?.role === 'staff') {
    result = userData?.id || '';
  } else {
    result = '';
  }

  return (
    <div className="left_side">
      <div className="mainAvatarDiv">
        <div>
          <div className="imgDivSide">
            {/* Avatar to be used */}
            <label htmlFor="profilePic">
              <input
                name="profile_pic"
                type="file"
                id="profilePic"
                accept=".png, .jpg, .jpeg"
                // onChange={handleSelectedFile}
              />
              {userData?.profile_pic ? (
                <img
                  src={getMediaUrl(userData?.profile_pic)}
                  className="pointer"
                  id="selectedImg"
                  style={{
                    width: '100%',
                    borderRadius: '100px',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  alt=""
                />
              ) : (
                <AvatarComponent
                  alt={`${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`}
                  className="sidebar_avatar"
                />
              )}
            </label>
          </div>
        </div>
        <div className="tooltip">
          <img
            src={edit}
            alt=""
            className="editIconSidebar"
            onClick={handleEditIconClick}
            onKeyDown={(event) => {
              if (event?.key === 'Enter' || event?.key === ' ') {
                handleEditIconClick();
              }
            }}
          />
          <span className="tooltiptext">Edit Profile</span>
        </div>
      </div>
      <div className="sideBarInfo">
        <div className="user_name">
          {' '}
          {`${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`}
        </div>
        <div className="staff_id" style={{ display: userData?.role === 'clinician' ? 'none' : '' }}>
          {roleTxt}: <span className="staff_id_2">{result}</span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail">
          <Phone className="spaceOnRight" />
          {userData?.phone_number ? PhoneFormat(userData?.phone_number) : ''}
        </div>
        <div className="user_detail">
          <Email className="spaceOnRight" />
          <div className="xnewww"> {userData?.email ?? ''}</div>
        </div>
      </div>
      {userData?.expiry_date ? (
        <div className="user_exp_detail">
          <span className="detail_expiry">
            <div className="image_div">
              <Expiry className="spaceOnRight" />
            </div>
            <p className="spaceRight">Expiration Date </p>
          </span>
          <p className="spaceRight"> {moment(userData?.expiry_date).format('MM-DD-YYYY')}</p>
        </div>
      ) : (
        ''
      )}
      <br />
      {window.location.pathname.includes('clinician') ? (
        <>
          <div
            className="activityLeft"
            role="presentation"
            onClick={() => {
              navigate(`/clinicians/${userData?.id}/activity`);
              setActivityClicked(true);
            }}
          >
            <div className="image_div">
              <Activity
                className={
                  activityClicked || window.location.pathname.includes('activity')
                    ? 'iconActivity'
                    : ''
                }
              />
            </div>

            <p
              className={
                activityClicked || window.location.pathname.includes('activity')
                  ? 'clickedActivity'
                  : 'activityTxt'
              }
            >
              Activity Log
            </p>
          </div>
          {pathname === `/clinicians/${id}` && (
            <div className="chartDiv">
              <Chart logs={activityLog} />
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
}
