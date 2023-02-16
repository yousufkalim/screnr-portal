import { useState } from 'react';

// assets import
import AddMore from '../assets/icons/AddMore.svg';

// child imports
import AvatarComponent from './Avatar';
import AssignClinicians from './popups/prescription/AssignClinicians';

export default function PatientTopSection() {
  const [openAssignClinicians, setOpenAssignClinicians] = useState(false);
  const [cliniciansData, setCliniciansData] = useState([]);

  return (
    <div className="PatientTopSection">
      <div className="PatientSubTopSection">
        {cliniciansData.map((data) => (
          <div className="topSec">
            <div>
              <AvatarComponent alt={data.name} className="top_sec_avatar" />
            </div>
            <div className="topSecDetails">
              <p className="topSecDocName">{data.name}</p>
              <p className="topSecExpertise">Muscular dystrophy</p>
              <p className="topSecActions">Created Sabbir’s profile</p>
            </div>
          </div>
        ))}
      </div>
      <p className="addMore" role="presentation" onClick={() => setOpenAssignClinicians(true)}>
        Add More <img src={AddMore} alt="" />
      </p>
      {openAssignClinicians && (
        <AssignClinicians
          setCliniciansData={setCliniciansData}
          openAssignClinicians={openAssignClinicians}
          setOpenAssignClinicians={setOpenAssignClinicians}
        />
      )}
    </div>
  );
}
