/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import AddMore from '../assets/icons/AddMore.svg';
import AssignClinicians from './popups/prescription/AssignClinicians';
import { Store } from '../StoreContext';
import ClinicianInfoTab from './ClinicianInfoTab';

export default function PatientTopSection({
  allClinicians,
  patientData,
  getPatients,
  selectedClinician,
  setSelectedClinician,
}) {
  const [openAssignClinicians, setOpenAssignClinicians] = useState(false);
  const [cliniciansData, setCliniciansData] = useState([]);
  const { user } = Store();

  useEffect(() => {
    setCliniciansData(patientData?.userData?.clinicians);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientData]);
  return (
    <div className="PatientTopSection">
      <div className="PatientSubTopSection">
        {cliniciansData?.map((data) => (
          <ClinicianInfoTab
            key={data?.id}
            userData={user}
            clinicianData={data}
            selectedClinician={selectedClinician}
            setSelectedClinician={setSelectedClinician}
          />
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
