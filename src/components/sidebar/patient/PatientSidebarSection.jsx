/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import moment from 'moment';
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
import AvatarComponent from '../../Avatar/Avatar.Component';
import { getMediaUrl } from '../../../config';

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

  const handleEditIconClick = () => setOpenEditpatientModal(!openEditpatientModal);
  return (
    <>
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
                disabled
                // onChange={handleSelectedFile}
              />
              {patientData?.profile_pic ? (
                <img
                  src={getMediaUrl(patientData?.profile_pic)}
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
                  alt={`${patientData?.first_name ?? ''} ${patientData?.last_name ?? ''}`}
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
            // onKeyDown={(event) => {
            //   if (event?.key === 'Enter' || event?.key === ' ') {
            //     handleEditIconClick();
            //   }
            // }}
          />
          <span className="tooltiptext">Edit</span>
        </div>
      </div>
      <div className="sideBarInfo">
        <div className="user_name">
          {patientData?.first_name ? `${patientData?.first_name} ${patientData?.last_name}` : ''}
        </div>
        <div className="staff_id">
          Patient ID:{' '}
          <span className="staff_id_2">
            {patientData?.userData?.mrn_id ? patientData?.userData?.mrn_id : ''}
          </span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail" id="gapAdd" style={{ paddingLeft: '.3rem' }}>
          <div className="image_div">
            <Counter />
          </div>
          {moment().diff(patientData?.userData?.dob, 'years')}
        </div>
        {patientData?.userData?.diagnosis && (
          <div className="user_detail" id="gapAdd">
            <div className="image_div">
              <Medical />
            </div>
            <p style={{ whiteSpace: 'break-spaces' }}>{patientData?.userData?.diagnosis ?? '-'}</p>
          </div>
        )}
        <div className="user_detail" id="gapAdd">
          <div className="image_div">
            <Body />
          </div>
          <div
            style={{
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: '.5rem',
              flexWrap: 'wrap',
            }}
          >
            {patientData?.userData?.location?.map((item) => {
              return <p>{item}</p>;
            }) ?? ''}
          </div>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="sidebarSubDiv2">
          <div className="user_detail" id="gapAdd">
            <Phone />
            {patientData?.phone_number ?? ''}
          </div>
          <div className="user_detail" id="gapAdd">
            <Email />
            <div className="xnewww">{patientData?.email ?? ''}</div>
          </div>
        </div>
        <br />
        {patientData?.expiry_date && (
          <div className="patient_exp_detail">
            <span className="detail_expiry" id="gapAdd">
              <Expiry />
              <p>Expiration Date</p>
            </span>
            <p>{moment(patientData?.expiry_date).format('MM/DD/YYYY')}</p>
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
