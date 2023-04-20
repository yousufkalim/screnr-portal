/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState } from 'react';

// mui imports
import Collapse from '@mui/material/Collapse';

import moment from 'moment';
// images import
import { ReactComponent as Phone } from '../../../assets/components/Table/Call.svg';
import { ReactComponent as Email } from '../../../assets/components/Table/SidebarEmail.svg';
import { ReactComponent as Expiry } from '../../../assets/images/staffScreen/expiryDate.svg';
import { ReactComponent as Counter } from '../../../assets/components/Sidebar/counter.svg';
import { ReactComponent as Medical } from '../../../assets/components/Sidebar/Medical.svg';
import { ReactComponent as Body } from '../../../assets/components/Sidebar/body.svg';
import { ReactComponent as OpenArrow } from '../../../assets/components/Sidebar/openArrow.svg';
// import { ReactComponent as RightArrow } from '../../../assets/components/Sidebar/right.svg';
// import { ReactComponent as Up } from '../../../assets/components/Sidebar/up.svg';
import edit from '../../../assets/icons/sidebarEdit.svg';

// Avatar
import AvatarComponent from '../../Avatar/Avatar.Component';

export default function PatientSidebarSection({
  patientData,
  openEditpatientModal,
  setOpenEditpatientModal,
}) {
  const [expanded, setExpanded] = useState('');
  const [toggleIcon, setToggleIcon] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setToggleIcon(!toggleIcon);
  };

  const handleEditIconClick = () => {
    setOpenEditpatientModal(!openEditpatientModal);
  };
  return (
    <>
      <div className="mainAvatarDiv">
        <AvatarComponent
          alt={`${patientData?.first_name} ${patientData?.last_name}`}
          className="sidebar_avatar"
        />
        <img
          src={edit}
          alt=""
          className="editIconSidebar"
          onClick={() => {
            handleEditIconClick();
          }}
        />
      </div>
      <div className="sideBarInfo">
        <div className="user_name">{`${patientData?.first_name} ${patientData?.last_name}`}</div>
        <div className="staff_id">
          Patient ID: <span className="staff_id_2">{patientData?.userData?.mrn_id}</span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail" style={{ paddingLeft: '.3rem' }}>
          <Counter />
          {moment().diff(patientData?.userData?.dob, 'years')}
        </div>
        <div className="user_detail">
          <Medical />
          {patientData?.userData?.diagnosis}
        </div>
        <div className="user_detail">
          <Body />
          {patientData?.userData?.location}
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="sidebarSubDiv2">
          <div className="user_detail">
            <Phone />
            {patientData?.phone_number}
          </div>
          <div className="user_detail">
            <Email />
            {patientData?.email}
          </div>
        </div>
        <br />
        {patientData?.expiry_date && (
          <div className="patient_exp_detail">
            <span className="detail_expiry">
              <Expiry />
              <p>Expiry Date</p>
            </span>
            <p>{moment(patientData?.expiry_date).format('DD/MM/YYYY')}</p>
          </div>
        )}
      </Collapse>
      {toggleIcon ? (
        <OpenArrow
          onClick={handleExpandClick}
          style={{
            cursor: 'pointer',
          }}
        />
      ) : (
        <OpenArrow
          onClick={handleExpandClick}
          style={{
            transform: 'rotateX(180deg)',
            cursor: 'pointer',
          }}
        />
      )}
      <br />
    </>
  );
}
