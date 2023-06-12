import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import PatientTopSection from '../../components/PatientTopSection/PatientTopSection.Component';
import PrescriptionTable from '../../components/tables/prescription/PrescriptionTable';
import request from '../../request';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import addBtn from '../../assets/icons/addBtn.svg';

export default function Prescription() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [patient, setPatient] = useState('');
  const [allClinicians, setAllClinicians] = useState('');
  const [openEditpatientModal, setOpenEditpatientModal] = useState(false);
  const [selectedClinician, setSelectedClinician] = useState('');

  const getPatients = async () => {
    await request('get', `/clinicians/getPatientDetail/${id}`)
      .then(async (res) => {
        setPatient(res?.data?.user);
        setSelectedClinician(res?.data?.user?.userData?.clinicians[0]?.id);
        const ClinicId = res?.data?.user?.userData?.clinicians[0]?.userData?.clinic;
        await request('get', `/clinicians/getCliniciansByClinicId/${ClinicId}`)
          .then((res1) => {
            setAllClinicians(res1?.data?.users);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const EditpatientPopup = openEditpatientModal && (
    <EditPatient
      openEditPatient={openEditpatientModal}
      setOpenEditPatient={setOpenEditpatientModal}
      patientDetails={patient}
      getPatients={getPatients}
    />
  );

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Grid container sx={{ marginTop: '8vh', height: '92vh' }}>
        <Grid xl={2} lg={2.5}>
          <Sidebar
            patientId={id}
            patientData={patient}
            openEditpatientModal={openEditpatientModal}
            setOpenEditpatientModal={setOpenEditpatientModal}
            selectedClinician={selectedClinician}
          />
        </Grid>
        <Grid className="bgPrescription" xl={10} lg={9.5}>
          <PatientTopSection
            allClinicians={allClinicians}
            patientData={patient}
            getPatients={getPatients}
            selectedClinician={selectedClinician}
            setSelectedClinician={setSelectedClinician}
          />
          <PrescriptionTable
            patientId={id}
            selectedClinicianId={selectedClinician}
            selectedClinicians={patient?.userData?.clinicians}
          />
        </Grid>
        <div className="addBtn">
          <img
            src={addBtn}
            className="pointer"
            onClick={() => {
              navigate(`/patients/${id}/addPrescription/${selectedClinician}`);
            }}
            role="presentation"
            alt=""
          />
        </div>
      </Grid>
      {EditpatientPopup}
    </>
  );
}
