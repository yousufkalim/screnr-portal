import React from 'react';
// images improt
import { ReactComponent as Phone } from '../../assets/staffScreen/phone.svg';
import { ReactComponent as Email } from '../../assets/staffScreen/email.svg';
import { ReactComponent as Expiry } from '../../assets/staffScreen/expiryDate.svg';

export default function Staff() {
  return (
    <div className="main_staff_div">
      <div className="left_side">
        <div className="profile">RH</div>
        <div style={{ textAlign: 'center' }}>
          <div className="user_name">Rana Hamza</div>
          <div className="staff_id">
            Staff ID: <span className="staff_id_2">12345</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div className="user_detail">
            <Phone />
            &nbsp;&nbsp;+123456734
          </div>
          <div className="user_detail">
            <Email />
            &nbsp;&nbsp;Screner@gmail.com
          </div>
          <div className="user_detail">
            <Expiry />
            &nbsp;&nbsp;Expiry Date&nbsp;&nbsp;&nbsp;&nbsp;12-050-2023
          </div>
        </div>
      </div>
      <div className="right_side">right</div>
    </div>
  );
}
