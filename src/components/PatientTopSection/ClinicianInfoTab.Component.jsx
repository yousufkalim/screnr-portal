import React from 'react';
import AvatarComponent from '../Avatar/Avatar.Component';

function ClinicianInfoTab({ userData, clinicianData, selectedClinician, setSelectedClinician }) {
  return userData?.role === 'clinician' ? (
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
    <button
      type="button"
      className="topSec"
      onClick={() => {
        setSelectedClinician(clinicianData?.id);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setSelectedClinician(clinicianData?.id);
        }
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
            selectedClinician === clinicianData?.id ? 'top_sec_avatar' : 'top_sec_avatar_disabled'
          }
        />
      </div>
      <div
        className="topSecDetails"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p
          className={
            selectedClinician === clinicianData?.id ? 'topSecDocName' : 'topSecDocName_disabled'
          }
        >{`${clinicianData?.first_name} ${clinicianData?.last_name}`}</p>
        {/* <p
          className={
            selectedClinician === clinicianData?.id ? 'topSecExpertise' : 'topSecExpertise_disabled'
          }
        >
          {clinicianData?.userData?.title}
        </p> */}
      </div>
    </button>
  );
}

export default ClinicianInfoTab;
