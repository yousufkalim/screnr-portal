import { React, useState, useEffect, useCallback } from 'react';
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
  const [openEditPatientModal, setOpenEditPatientModal] = useState(false);
  const [patient, setPatient] = useState({});
  const [allMotionExercise, setAllMotionExercise] = useState([]);
  const [exerciseType, setExerciseType] = useState('motion');
  const [disableBtn, setDisableBtn] = useState(false);
  const [prescription, setPrescription] = useState({
    name: '',
    start_date: new Date(),
    duration: '',
    frequency: '',
    clinician: clinicianId,
    patient: patientId,
    exercises: [],
  });
  const [simpleExerciseInfo, setSimpleExerciseInfo] = useState({
    type: 'simple',
    name: '',
    body_part: '',
    sets: '',
    reps: '',
    rest: '',
    instructions: '',
  });
  const [motionExerciseInfo, setMotionExerciseInfo] = useState({
    type: 'motion',
    name: '',
    body_part: '',
    sets: '',
    reps: '',
    rest: '',
    instructions: '',
    exercise: {},
    screenshot: false,
  });

  const handleMotionExerciseInfo = (name, value) => {
    setMotionExerciseInfo({ ...motionExerciseInfo, [name]: value });
  };

  const handleSimpleExerciseInfo = (name, value) => {
    setSimpleExerciseInfo({ ...simpleExerciseInfo, [name]: value });
  };

  const handlePatientDataById = useCallback(async () => {
    await request('get', `/clinicians/getPatientDetail/${patientId}`)
      .then((res) => {
        setPatient(res?.data?.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }, [patientId]);

  const handleExercideInfoReset = () => {
    setSimpleExerciseInfo({
      type: 'simple',
      name: '',
      body_part: '',
      sets: '',
      reps: '',
      rest: '',
      instructions: '',
    });
    setMotionExerciseInfo({
      type: 'motion',
      name: '',
      body_part: '',
      sets: '',
      reps: '',
      rest: '',
      instructions: '',
      exercise: {},
      screenshot: false,
    });
  };

  const handleAddToList = () => {
    if (exerciseType === 'simple') {
      if (
        simpleExerciseInfo.body_part &&
        simpleExerciseInfo.name &&
        simpleExerciseInfo.reps &&
        simpleExerciseInfo.rest &&
        simpleExerciseInfo.sets &&
        simpleExerciseInfo.type
      ) {
        setPrescription({
          ...prescription,
          exercises: [...prescription.exercises, simpleExerciseInfo],
        });
        handleExercideInfoReset();
      }
    } else if (exerciseType === 'motion') {
      if (
        motionExerciseInfo.body_part &&
        motionExerciseInfo.name &&
        motionExerciseInfo.reps &&
        motionExerciseInfo.rest &&
        motionExerciseInfo.sets &&
        motionExerciseInfo.exercise &&
        motionExerciseInfo.type
      ) {
        setPrescription({
          ...prescription,
          exercises: [...prescription.exercises, motionExerciseInfo],
        });
        handleExercideInfoReset();
      }
    }
  };

  const handlePrescriptionDetails = (name, value) => {
    setPrescription({ ...prescription, [name]: value });
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
      clinician: clinicianId,
      patient: patientId,
      exercises: [],
    });
  };

  const handleGeneratePrescription = async () => {
    setDisableBtn(true);
    if (
      prescription?.clinician &&
      prescription?.duration &&
      prescription?.exercises &&
      prescription?.frequency &&
      prescription?.name &&
      prescription?.patient &&
      prescription?.start_date
    ) {
      await request('post', '/clinicians/prescriptions/createPrescription', prescription)
        .then(() => {
          setOpenGeneratePrescription(true);
          handlePrescriptionDetailsReset();
          setDisableBtn(false);
          toast.success('Prescription added successfully');
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      setDisableBtn(false);
      toast.error('Please fill all the fields');
    }
  };

  const handleGetAllExercise = async () => {
    await request('get', '/exercises')
      .then((res) => {
        setAllMotionExercise(res?.data?.exercises);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const validatingGeneratePrescriptionBtn =
    prescription &&
    prescription.name &&
    prescription.start_date &&
    prescription.duration &&
    prescription.frequency &&
    prescription.clinician &&
    prescription.patient &&
    prescription.exercises &&
    prescription.exercises.length > 0;

  const validatingGeneratePrescription = validatingGeneratePrescriptionBtn
    ? 'generatePrescriptionBtn'
    : 'generatePrescriptionBtn_diaabled';

  const GeneratePrescriptionSection = openGeneratePrescription && (
    <GeneratePrescription
      openGeneratePrescription={openGeneratePrescription}
      setOpenGeneratePrescription={setOpenGeneratePrescription}
    />
  );

  const EditPatientPopup = openEditPatientModal && (
    <EditPatient
      openEditPatient={openEditPatientModal}
      setOpenEditPatient={setOpenEditPatientModal}
      patientDetails={patient}
      getPatients={handlePatientDataById}
    />
  );

  useEffect(() => {
    handleGetAllExercise();
  }, []);

  useEffect(() => {
    handlePatientDataById();
  }, [handlePatientDataById]);

  return (
    <>
      <Grid container className="gridish">
        <Grid xl={2} lg={2.5}>
          <Sidebar
            patientId={patientId}
            patientData={patient}
            selectedClinician={clinicianId}
            openEditpatientModal={openEditPatientModal}
            setOpenEditpatientModal={setOpenEditPatientModal}
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
                exerciseType={exerciseType}
                setExerciseType={setExerciseType}
                patientId={patientId}
                dateChange={dateChange}
                prescription={prescription}
                handleAddToList={handleAddToList}
                allMotionExercise={allMotionExercise}
                simpleExerciseInfo={simpleExerciseInfo}
                handlePrescriptionDetails={handlePrescriptionDetails}
                handleSimpleExerciseInfo={handleSimpleExerciseInfo}
                handleMotionExerciseInfo={handleMotionExerciseInfo}
                motionExerciseInfo={motionExerciseInfo}
                setMotionExerciseInfo={setMotionExerciseInfo}
              />
            </div>
          </div>
        </Grid>
        <div className="addPrescriptionBtn">
          <Button
            variant="contained"
            disabled={disableBtn}
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
