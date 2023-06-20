/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { ReactComponent as Phone } from '../../assets/images/staffScreen/phone.svg';
import { ReactComponent as Email } from '../../assets/images/staffScreen/email.svg';
import { ReactComponent as Expiry } from '../../assets/images/staffScreen/expiryDate.svg';
import { ReactComponent as Activity } from '../../assets/components/TimeCard/activity.svg';
import edit from '../../assets/icons/sidebarEdit.svg';
import AvatarComponent from '../Avatar/Avatar.Component';
import request from '../../request';
import { getMediaUrl } from '../../config';
import PhoneFormat from '../../utils/PhoneFormat';

export default function LeftSidebar({ getClinicName, id, txt, roleTxt, setOpen, open }) {
  const navigate = useNavigate();
  const [activityClicked, setActivityClicked] = useState(false);
  const [info, setInfo] = useState({});

  const getData = async () => {
    try {
      const { data } = await request('get', `/${txt}/${id}`);
      if (data) {
        setInfo(data?.user);

        if (txt.includes('Clinician')) {
          getClinicName(data?.user?.userData?.clinic?.userData?.clinic_name);
        } else getClinicName(data?.user?.userData?.clinic_name);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleEditIconClick = () => {
    setOpen(!open);
  };

  let result = '';
  if (txt.includes('Clinic')) {
    result = info?.userData?.clinic_name || '';
  } else if (txt.includes('clinicians')) {
    result = info?.userData?.clinic?.userData?.clinic_name || '';
  } else if (txt.includes('Staff')) {
    result = info?.id || '';
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
              {info?.profile_pic ? (
                <img
                  src={getMediaUrl(info?.profile_pic)}
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
      </div>
      <div className="sideBarInfo">
        <div className="user_name"> {`${info?.first_name} ${info?.last_name}`}</div>
        <div className="staff_id" style={{ display: txt.includes('Clinician') ? 'none' : '' }}>
          {roleTxt}: <span className="staff_id_2">{result}</span>
        </div>
      </div>
      <div className="sidebarSubDiv">
        <div className="user_detail">
          <Phone className="spaceOnRight" />
          {PhoneFormat(info?.phone_number)}
        </div>
        <div className="user_detail">
          <Email className="spaceOnRight" />
          <div className="xnewww"> {info?.email}</div>
        </div>
      </div>
      {info?.expiry_date ? (
        <div className="user_exp_detail">
          <span className="detail_expiry">
            <div className="image_div">
              <Expiry className="spaceOnRight" />
            </div>
            <p className="spaceRight">Expiry Date </p>
          </span>
          <p className="spaceRight"> {moment(info?.expiry_date).format('MM-DD-YYYY')}</p>
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
              navigate(`/clinicians/${info?.id}/activity`);
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
          {/* <p className="totalActivity">Total Activity</p> */}
          {/* <p className="hrsTxt">(129 Hrs)</p> */}
        </>
      ) : (
        ''
      )}
    </div>
  );
}
