import { React, useState } from 'react';

// mui imports
import Collapse from '@mui/material/Collapse';

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
import AvatarComponent from '../../Avatar';

export default function PatientSidebarSection() {
  const [expanded, setExpanded] = useState('');
  const [toggleIcon, setToggleIcon] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setToggleIcon(!toggleIcon);
  };
  return (
    <>
      {' '}
      <div>
        <AvatarComponent alt="Rana Hamza" className="sidebar_avatar" />
        <img src={edit} alt="" className="editIconSidebar" id="editIconPatientSidebar" />
      </div>
      <div className="sideBarInfo">
        <div className="user_name">Rana Hamza</div>
        <div className="staff_id">
          Patient ID: <span className="staff_id_2">12345</span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail">
          <Counter className="spaceOnRight" />
          25
        </div>
        <div className="user_detail">
          <Medical className="spaceOnRight" />
          Backpain
        </div>
        <div className="user_detail">
          <Body className="spaceOnRight" />
          Anterior
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="sidebarSubDiv2">
          <div className="user_detail">
            <Phone className="spaceOnRight" />
            +123456734
          </div>
          <div className="user_detail">
            <Email className="spaceOnRight" />
            Screner@gmail.com
          </div>
        </div>
        <br />
        <div className="patient_exp_detail">
          <span className="detail_expiry">
            <Expiry className="spaceOnRight" />

            <p className="spaceOnRight">Expiry Date</p>
          </span>
          <p>12-05-2023</p>
        </div>
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
