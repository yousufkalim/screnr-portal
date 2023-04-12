/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import AvatarComponent from './Avatar';

function ClinicianInfoTab({ userData, clinicianData, selectedClinician, setSelectedClinician }) {
  return (
    <>
      {userData?.role === 'clinician' ? (
        <div
          className="topSec_in_clinician"
          style={{
            cursor: userData?.id === clinicianData?.id ? 'pointer' : '',
            border: userData?.id === clinicianData?.id ? '1px solid #FBA622' : 'none',
            borderRadius: '1000px',
            padding: '.5rem',
            backgroundColor:
              userData?.id === clinicianData?.id ? 'rgba(251, 166, 34, 0.05)' : 'transparent',
          }}
        >
          <div>
            <AvatarComponent
              alt={`${clinicianData?.first_name} ${clinicianData?.last_name}`}
              className={
                userData?.id === clinicianData?.id ? 'top_sec_avatar' : 'top_sec_avatar_disabled'
              }
            />
          </div>
          <div className="topSecDetails">
            <p
              className={
                userData?.id === clinicianData?.id ? 'topSecDocName' : 'topSecDocName_disabled'
              }
            >{`${clinicianData?.first_name} ${clinicianData?.last_name}`}</p>
            <p
              className={
                userData?.id === clinicianData?.id ? 'topSecExpertise' : 'topSecExpertise_disabled'
              }
            >
              {clinicianData?.userData?.title}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="topSec"
          onClick={() => {
            setSelectedClinician(clinicianData?.id);
          }}
          style={{
            cursor: 'pointer',
            borderRadius: '1000px',
            padding: '.5rem',
            border: selectedClinician === clinicianData?.id ? '1px solid #FBA622' : 'none',
            backgroundColor:
              selectedClinician === clinicianData?.id ? 'rgba(251, 166, 34, 0.05)' : 'transparent',
          }}
        >
          <div>
            <AvatarComponent
              alt={`${clinicianData?.first_name} ${clinicianData?.last_name}`}
              className={
                selectedClinician === clinicianData?.id
                  ? 'top_sec_avatar'
                  : 'top_sec_avatar_disabled'
              }
            />
          </div>
          <div className="topSecDetails">
            <p
              className={
                selectedClinician === clinicianData?.id ? 'topSecDocName' : 'topSecDocName_disabled'
              }
            >{`${clinicianData?.first_name} ${clinicianData?.last_name}`}</p>
            <p
              className={
                selectedClinician === clinicianData?.id
                  ? 'topSecExpertise'
                  : 'topSecExpertise_disabled'
              }
            >
              {clinicianData?.userData?.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ClinicianInfoTab;
