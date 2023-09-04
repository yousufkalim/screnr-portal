import { React, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import request from '../../request';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import AddPrescription from '../../components/Forms/AddPrescription/AddPrescription.Component';
import GeneratePrescription from '../../components/popups/prescription/PrescriptionGenerated.popup';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ExpiryDateExtend from '../../components/popups/prescription/ExpiryDateExtend.Popup';

export default function AddPatientPrescription() {
  // const { user } = Store();
  const params = useParams();
  const navigate = useNavigate();
  const { patientId, clinicianId } = params;
  const [openGeneratePrescription, setOpenGeneratePrescription] = useState(false);
  const [openEditPatientModal, setOpenEditPatientModal] = useState(false);
  const [patient, setPatient] = useState({});
  const [allMotionExercise, setAllMotionExercise] = useState([]);
  const [exerciseType, setExerciseType] = useState('motion');
  const [disableBtn, setDisableBtn] = useState(false);
  const [openExtendDate, setOpenExtendDate] = useState(false);
  const [breadcrumb, setBreadCrumb] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
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
    exercise: 'default',
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
        setBreadCrumb(`${res?.data?.user?.first_name} ${res?.data?.user?.last_name}`);
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
    if (patient?.expiry_date) {
      if (moment(e).isAfter(moment(patient?.expiry_date))) {
        setOpenExtendDate(true);
        setSelectedStartDate(e);
      }
    } else {
      setPrescription({
        ...prescription,
        start_date: e,
      });
    }
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

  const goBackToProfile = () => navigate(`/patients/${patientId}/prescription`);

  const GeneratePrescriptionSection = openGeneratePrescription && (
    <GeneratePrescription
      goBackToProfile={goBackToProfile}
      openGeneratePrescription={openGeneratePrescription}
      setOpenGeneratePrescription={setOpenGeneratePrescription}
    />
  );

  const EditPatientPopup = openEditPatientModal && (
    <EditPatient
      patientDetails={patient}
      getPatients={handlePatientDataById}
      openEditPatient={openEditPatientModal}
      setOpenEditPatient={setOpenEditPatientModal}
    />
  );
  const ExpiryDateExtendPopup = openExtendDate && (
    <ExpiryDateExtend
      patientId={patientId}
      open={openExtendDate}
      setOpen={setOpenExtendDate}
      prescription={prescription}
      setPrescription={setPrescription}
      selectedStartDate={selectedStartDate}
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
      <div className="gridish">
        <div className="sideBar_div">
          <Sidebar
            patientId={patientId}
            patientData={patient}
            selectedClinician={clinicianId}
            openEditpatientModal={openEditPatientModal}
            setOpenEditpatientModal={setOpenEditPatientModal}
          />
        </div>
        <div className="bgPrescription">
          {/* {user?.role === 'clinician' ? (
            <div className="breadCrumb">
              Dashboard &gt; {patient?.first_name} {patient?.last_name} &gt; Prescribe Exercise &gt;
            </div>
          ) : (
            <div className="breadCrumb">
              Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Prescribe
              Exercise &gt;
            </div>
          )} */}
          <Breadcrumbs ClinicName={breadcrumb} />
          <div className="main_div_addPrescription">
            <div className="bgAddPrescription">
              <AddPrescription
                patientId={patientId}
                disableBtn={disableBtn}
                dateChange={dateChange}
                exerciseType={exerciseType}
                prescription={prescription}
                goBackToProfile={goBackToProfile}
                setExerciseType={setExerciseType}
                setPrescription={setPrescription}
                handleAddToList={handleAddToList}
                allMotionExercise={allMotionExercise}
                simpleExerciseInfo={simpleExerciseInfo}
                motionExerciseInfo={motionExerciseInfo}
                setMotionExerciseInfo={setMotionExerciseInfo}
                handleSimpleExerciseInfo={handleSimpleExerciseInfo}
                handleMotionExerciseInfo={handleMotionExerciseInfo}
                handlePrescriptionDetails={handlePrescriptionDetails}
                handleGeneratePrescription={handleGeneratePrescription}
                validatingGeneratePrescription={validatingGeneratePrescription}
              />
            </div>
          </div>
        </div>
        {GeneratePrescriptionSection}
      </div>
      {EditPatientPopup}
      {ExpiryDateExtendPopup}
    </>
  );
}
