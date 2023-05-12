import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../request';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import AddPrescription from '../../components/Forms/AddPrescription/AddPrescription.Component';
import GeneratePrescription from '../../components/popups/prescription/PrescriptionGenerated.popup';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';

export default function AddPatientPrescription() {
  const params = useParams();
  const { patientId, clinicianId } = params;
  const [openGeneratePrescription, setOpenGeneratePrescription] = useState(false);
  const [openEditpatientModal, setOpenEditpatientModal] = useState(false);
  const [patient, setPatient] = useState({});
  const [prescription, setPrescription] = useState({
    name: '',
    start_date: new Date(),
    duration: '',
    frequency: '',
    type: 'simple',
    clinician: clinicianId,
    patient: patientId,
    exercises: [],
  });

  const [exerciseInformation, setExerciseInformation] = useState({
    name: '',
    body_part: '',
    sets: '',
    reps: '',
    rest: '',
    instructions: '',
  });

  const getPatientDataById = async () => {
    await request('get', `/clinicians/getPatientDetail/${patientId}`).then((res) => {
      setPatient(res?.data?.user);
    });
  };
  useEffect(() => {
    getPatientDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExercideInfoReset = () => {
    setExerciseInformation({
      name: '',
      body_part: '',
      sets: '',
      reps: '',
      rest: '',
      instructions: '',
    });
  };
  const handleAddToList = () => {
    if (
      exerciseInformation.body_part &&
      exerciseInformation.name &&
      exerciseInformation.reps &&
      exerciseInformation.rest &&
      exerciseInformation.sets
    ) {
      setPrescription({
        ...prescription,
        exercises: [...prescription.exercises, exerciseInformation],
      });
      handleExercideInfoReset();
    }
  };

  const handlePrescriptionDetails = (name, value) => {
    setPrescription({ ...prescription, [name]: value });
  };

  const handleExerciseInformation = (name, value) => {
    setExerciseInformation({ ...exerciseInformation, [name]: value });
  };

  const dateChange = (e) => {
    setPrescription({
      ...prescription,
      start_date: e,
    });
  };

  const handlePrescriptionDetailsReset = () => {
    setPrescription({
      name: '',
      start_date: '',
      duration: 0,
      frequency: 0,
      type: prescription?.type === 'motion' ? 'motion' : 'simple',
      clinician: clinicianId,
      patient: patientId,
      exercises: [],
    });
  };

  const handleGeneratePrescription = async () => {
    if (
      prescription.clinician &&
      prescription.duration &&
      prescription.exercises &&
      prescription.frequency &&
      prescription.name &&
      prescription.patient &&
      prescription.start_date
    ) {
      await request('post', '/clinicians/prescriptions/createPrescription', prescription)
        .then(() => {
          setOpenGeneratePrescription(true);
          handlePrescriptionDetailsReset();
          toast.success('Prescription added successfully');
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      toast.error('Please fill all the fields');
    }
  };

  const validatingGeneratePrescriptionBtn =
    prescription?.name &&
    prescription?.start_date &&
    prescription?.duration &&
    prescription?.frequency &&
    prescription?.type &&
    prescription?.clinician &&
    prescription?.patient &&
    prescription?.exercises?.length > 0;

  const GeneratePrescriptionSection = openGeneratePrescription && (
    <GeneratePrescription
      openGeneratePrescription={openGeneratePrescription}
      setOpenGeneratePrescription={setOpenGeneratePrescription}
    />
  );

  const EditPatientPopup = openEditpatientModal && (
    <EditPatient
      openEditPatient={openEditpatientModal}
      setOpenEditPatient={setOpenEditpatientModal}
      patientDetails={patient}
      getPatients={getPatientDataById}
    />
  );

  const validatingGeneratePrescription = validatingGeneratePrescriptionBtn
    ? 'generatePrescriptionBtn'
    : 'generatePrescriptionBtn_diaabled';

  return (
    <>
      <Grid container className="gridish">
        <Grid xl={2} lg={2.5}>
          <Sidebar
            patientId={patientId}
            patientData={patient}
            selectedClinician={clinicianId}
            openEditpatientModal={openEditpatientModal}
            setOpenEditpatientModal={setOpenEditpatientModal}
          />
        </Grid>

        <Grid className="bgPrescription" xl={10} lg={9.5}>
          <div className="breadCrumb">
            Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescribe
            Exercise &gt;
          </div>
          <div className="main_div_addPrescription">
            <div className="bgAddPrescription">
              <AddPrescription
                patientId={patientId}
                prescription={prescription}
                exerciseInformation={exerciseInformation}
                handleAddToList={handleAddToList}
                handlePrescriptionDetails={handlePrescriptionDetails}
                handleExerciseInformation={handleExerciseInformation}
                dateChange={dateChange}
              />
            </div>
          </div>
        </Grid>

        <div className="addPrescriptionBtn">
          <Button
            variant="contained"
            className={validatingGeneratePrescription}
            onClick={() => handleGeneratePrescription()}
          >
            Generate Prescription
          </Button>
        </div>
        {GeneratePrescriptionSection}
      </Grid>
      {EditPatientPopup}
    </>
  );
}
