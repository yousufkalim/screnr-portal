import React from 'react';
// images improt
import { ReactComponent as Phone } from '../assets/images/staffScreen/phone.svg';
import { ReactComponent as Email } from '../assets/images/staffScreen/email.svg';
import { ReactComponent as Expiry } from '../assets/images/staffScreen/expiryDate.svg';
import edit from '../assets/icons/sidebarEdit.svg';

import AvatarComponent from './Avatar';

export default function Sidebar() {
  return (
    <div className="left_side">
      <div>
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
          <Phone />
          &nbsp;&nbsp; +123456734
        </div>
        <div className="user_detail">
          <Email />
          &nbsp;&nbsp; &nbsp;Screner@gmail.com
        </div>
      </div>
      <div className="user_exp_detail">
        <span className="detail_expiry">
          <Expiry />
          &nbsp;&nbsp;
          <p>Expiry Date</p>
        </span>
        <p> &nbsp;&nbsp;12-05-2023</p>
      </div>
    </div>
  );
}
