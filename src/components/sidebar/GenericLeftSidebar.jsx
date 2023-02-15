import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// images import
import { ReactComponent as Phone } from '../../assets/images/staffScreen/phone.svg';
import { ReactComponent as Email } from '../../assets/images/staffScreen/email.svg';
import { ReactComponent as Expiry } from '../../assets/images/staffScreen/expiryDate.svg';
import { ReactComponent as Activity } from '../../assets/components/TimeCard/activity.svg';
import edit from '../../assets/icons/sidebarEdit.svg';

import AvatarComponent from '../Avatar';

export default function LeftSidebar() {
  const navigate = useNavigate();
  const [activityClicked, setActivityClicked] = useState(false);
  return (
    <div className="left_side">
      <div className="mainAvatarDiv">
        <AvatarComponent alt="Rana Hamza" className="sidebar_avatar" />
        <img src={edit} alt="" className="editIconSidebar" />
      </div>
      <div className="sideBarInfo">
        <div className="user_name">Rana Hamza</div>
        <div className="staff_id">
          Staff ID: <span className="staff_id_2">12345</span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail">
          <Phone className="spaceOnRight" />
          +123456734
        </div>
        <div className="user_detail">
          <Email className="spaceOnRight" />
          Screner@gmail.com
        </div>
      </div>
      <div className="user_exp_detail">
        <span className="detail_expiry">
          <Expiry className="spaceOnRight" />

          <p className="spaceRight">Expiry Date</p>
        </span>
        <p> 12-05-2023</p>
      </div>
      <br />
      {window.location.pathname.includes('clinician') ? (
        <>
          <div
            className="activityLeft"
            role="presentation"
            onClick={() => {
              navigate('/clinicians/:id/activity');
              setActivityClicked(true);
            }}
          >
            <Activity
              className={
                activityClicked || window.location.pathname.includes('activity')
                  ? 'iconActivity'
                  : ''
              }
            />

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
          <p className="totalActivity">Total Activity</p>
          <p className="hrsTxt">(129 Hrs)</p>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
