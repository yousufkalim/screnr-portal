import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import addBtn from '../../assets/icons/addBtn.svg';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import PatientTopSection from '../../components/PatientTopSection';
import PrescriptionTable from '../../components/tables/prescription/PrescriptionTable';
import api from '../../api';
import EditPatient from '../../components/popups/patient/EditPatient';

export default function Prescription() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [patient, setPatient] = useState('');
  const [allClinicians, setAllClinicians] = useState('');
  const [openEditpatientModal, setOpenEditpatientModal] = useState(false);
  const [selectedClinician, setSelectedClinician] = useState('');

  const getPatients = async () => {
    await api('get', `/clinicians/getPatientDetail/${id}`)
      .then(async (res) => {
        setPatient(res?.data?.user);
        setSelectedClinician(res?.data?.user?.userData?.clinicians[0]?.id);
        const ClinicId = res?.data?.user?.userData?.clinicians[0]?.userData?.clinic;
        await api('get', `clinicians/getCliniciansByClinicId/${ClinicId}`)
          .then((res1) => {
            setAllClinicians(res1?.data?.users);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(`handleGetPatientData --> ${err}`);
          });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`handleGetPatientData --> ${err}`);
      });
  };
  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Grid container>
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
            onClick={() => navigate(`/patients/${id}/addPrescription/${selectedClinician}`)}
            role="presentation"
            alt=""
          />
        </div>
      </Grid>
      {openEditpatientModal && (
        <EditPatient
          openEditPatient={openEditpatientModal}
          setOpenEditPatient={setOpenEditpatientModal}
          patientDetails={patient}
          getPatients={getPatients}
        />
      )}
    </>
  );
}
