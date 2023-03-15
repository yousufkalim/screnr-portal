/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
// assets import
import AddMore from '../assets/icons/AddMore.svg';
// child imports
import AvatarComponent from './Avatar';
import AssignClinicians from './popups/prescription/AssignClinicians';

export default function PatientTopSection({
  allClinicians,
  patientData,
  getPatients,
  selectedClinician,
  setSelectedClinician,
}) {
  const [openAssignClinicians, setOpenAssignClinicians] = useState(false);
  const [cliniciansData, setCliniciansData] = useState([]);
  useEffect(() => {
    setCliniciansData(patientData?.userData?.clinicians);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientData]);
  return (
    <div className="PatientTopSection">
      <div className="PatientSubTopSection">
        {cliniciansData?.map((data) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className="topSec"
            key={data?.id}
            onClick={() => setSelectedClinician(data?.id)}
            style={{
              cursor: 'pointer',
              border: selectedClinician === data?.id ? '1px solid #FBA622' : 'none',
              borderRadius: '1000px',
              padding: '.5rem',
              backgroundColor:
                selectedClinician === data?.id ? 'rgba(251, 166, 34, 0.05)' : 'transparent',
            }}
          >
            <div>
              <AvatarComponent
                alt={`${data?.first_name} ${data?.last_name}`}
                className={
                  selectedClinician === data?.id ? 'top_sec_avatar' : 'top_sec_avatar_disabled'
                }
              />
            </div>
            <div className="topSecDetails">
              <p
                className={
                  selectedClinician === data?.id ? 'topSecDocName' : 'topSecDocName_disabled'
                }
              >{`${data?.first_name} ${data?.last_name}`}</p>
              <p
                className={
                  selectedClinician === data?.id ? 'topSecExpertise' : 'topSecExpertise_disabled'
                }
              >
                {data?.userData?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="addMore" role="presentation" onClick={() => setOpenAssignClinicians(true)}>
        Add More <img src={AddMore} alt="" />
      </p>
      {openAssignClinicians && (
        <AssignClinicians
          cliniciansData={cliniciansData}
          setCliniciansData={setCliniciansData}
          openAssignClinicians={openAssignClinicians}
          setOpenAssignClinicians={setOpenAssignClinicians}
          allClinicians={allClinicians}
          patientId={patientData?.id}
          getPatients={getPatients}
        />
      )}
    </div>
  );
}
