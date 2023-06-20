import { useState, useEffect } from 'react';
import AddMore from '../../assets/icons/AddMore.svg';
import AssignClinicians from '../popups/prescription/AssignClinicians.Popup';
import { Store } from '../../StoreContext';
import ClinicianInfoTab from './ClinicianInfoTab.Component';

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
      <div className="addMore" style={{ cursor: 'default' }} role="presentation">
        <div
          className="addMore"
          role="button"
          tabIndex={0}
          onKeyDown="none"
          onClick={() => setOpenAssignClinicians(true)}
        >
          Add More
          <div className="image_div">
            <img src={AddMore} alt="" />
          </div>
        </div>
      </div>
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
