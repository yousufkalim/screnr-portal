import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// moment
import moment from 'moment';

// images import
import { ReactComponent as Phone } from '../../assets/images/staffScreen/phone.svg';
import { ReactComponent as Email } from '../../assets/images/staffScreen/email.svg';
import { ReactComponent as Expiry } from '../../assets/images/staffScreen/expiryDate.svg';
import { ReactComponent as Activity } from '../../assets/components/TimeCard/activity.svg';
import edit from '../../assets/icons/sidebarEdit.svg';

// child imports
import AvatarComponent from '../Avatar';
import api from '../../api/index';
import { getMediaUrl } from '../../config';
import PhoneFormat from '../../utils/PhoneFormat';

export default function LeftSidebar({ id, txt }) {
  const navigate = useNavigate();
  const [activityClicked, setActivityClicked] = useState(false);
  const [info, setInfo] = useState({});

  const getData = async () => {
    const { data } = await api('get', `/${txt}/${id}`);
    if (data) {
      setInfo(data?.user);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

              {info.profile_pic ? (
                <img
                  src={getMediaUrl(info.profile_pic)}
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
                  alt={`${info?.first_name} ${info?.last_name}`}
                  className="sidebar_avatar"
                />
              )}
            </label>
          </div>
        </div>

        <img src={edit} alt="" className="editIconSidebar" />
      </div>
      <div className="sideBarInfo">
        <div className="user_name"> {`${info?.first_name} ${info?.last_name}`}</div>
        <div className="staff_id">
          Staff ID: <span className="staff_id_2"> {info?.id}</span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail">
          <Phone className="spaceOnRight" />
          {PhoneFormat(info?.phone_number)}
        </div>
        <div className="user_detail">
          <Email className="spaceOnRight" />
          {info?.email}
        </div>
      </div>
      {info?.expiry_date ? (
        <div className="user_exp_detail">
          <span className="detail_expiry">
            <Expiry className="spaceOnRight" />

            <p className="spaceRight">Expiry Date</p>
          </span>

          <p> {moment(info.expiry_date).format('MM-DD-YYYY')}</p>
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
