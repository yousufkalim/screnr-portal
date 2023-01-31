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
          <Counter />
          &nbsp;&nbsp; 25
        </div>
        <div className="user_detail">
          <Medical />
          &nbsp;&nbsp;Backpain
        </div>
        <div className="user_detail">
          <Body />
          &nbsp;&nbsp;Anterior
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="sidebarSubDiv2">
          <div className="user_detail">
            <Phone />
            &nbsp;&nbsp; +123456734
          </div>
          <div className="user_detail">
            <Email />
            &nbsp;&nbsp; &nbsp;Screner@gmail.com
          </div>
          {/* <div className="user_detail">
            <Up />
            &nbsp;&nbsp;5&apos;5
          </div>
          <div className="user_detail">
            <RightArrow />
            &nbsp;&nbsp; &nbsp;111.2–149.7
          </div> */}
        </div>
        <br />
        <div className="patient_exp_detail">
          <span className="detail_expiry">
            <Expiry />
            &nbsp;&nbsp;
            <p>Expiry Date</p>
          </span>
          <p> &nbsp;&nbsp;12-05-2023</p>
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
