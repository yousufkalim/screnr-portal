import { React, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/index';

// child components import
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import AddPrescription from '../../components/forms/prescription/AddPrescription';
import GeneratePrescription from '../../components/popups/prescription/PrescriptionGenerated';

export default function AddPatientPrescription() {
  const params = useParams();
  const { id } = params;
  const [openGeneratePrescription, setOpenGeneratePrescription] = useState(false);
  const [prescription, setPrescription] = useState({
    name: '',
    start_date: new Date(),
    duration: '',
    frequency: '',
    type: 'motion',
    clinician: 'vaf6q',
    patient: id,
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
    // eslint-disable-next-line no-unused-expressions
    prescription?.type === 'motion'
      ? setPrescription({
          name: '',
          start_date: '',
          duration: 0,
          frequency: 0,
          type: 'motion',
          clinician: 'vaf6q',
          patient: id,
          exercises: [],
        })
      : setPrescription({
          name: '',
          start_date: '',
          duration: 0,
          frequency: 0,
          type: 'simple',
          clinician: 'vaf6q',
          patient: id,
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
      await request('post', '/admins/prescriptions', prescription)
        .then(() => {
          setOpenGeneratePrescription(true);
          handlePrescriptionDetailsReset();
          toast.success('Prescription added successfully');
        })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      toast.error('Please fill all the fields');
    }
  };

  const validatingGeneratePrescriptionBtn =
    prescription.name &&
    prescription.start_date &&
    prescription.duration &&
    prescription.frequency &&
    prescription.type &&
    prescription.clinician &&
    prescription.patient &&
    prescription.exercises.length > 0;
  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar />
      </Grid>

      <Grid className="bgPrescription" xl={10} lg={9.5}>
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescribe Exercise
          &gt;
        </div>
        <div className="bgAddPrescription">
          <AddPrescription
            patientId={id}
            prescription={prescription}
            exerciseInformation={exerciseInformation}
            handleAddToList={handleAddToList}
            handlePrescriptionDetails={handlePrescriptionDetails}
            handleExerciseInformation={handleExerciseInformation}
            dateChange={dateChange}
          />
        </div>
      </Grid>

      <div className="addPrescriptionBtn">
        <Button
          variant="contained"
          className={
            validatingGeneratePrescriptionBtn
              ? 'generatePrescriptionBtn'
              : 'generatePrescriptionBtn_diaabled'
          }
          onClick={() => handleGeneratePrescription()}
        >
          Generate Prescription
        </Button>
      </div>
      {openGeneratePrescription && (
        <GeneratePrescription
          openGeneratePrescription={openGeneratePrescription}
          setOpenGeneratePrescription={setOpenGeneratePrescription}
        />
      )}
    </Grid>
  );
}
