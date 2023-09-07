import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
// import { ReactComponent as MotionCapture } from '../../../assets/icons/motionCapture.svg';
// import { ReactComponent as Program } from '../../../assets/icons/exProgram.svg';
import EditExerciseInfoPopup from '../../popups/prescription/EditExerciseInfo.Popup';
import MenuBtn from '../../MenuBtn/menuBtn';

export default function AddPrescriptionTable({ prescription, setPrescription }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [targetExercise, setTargetExercise] = useState({
    selectExercise: {},
    exerciseIndex: 0,
  });

  const handleDeleteFromList = (targetIndex) => {
    const tempList = [...prescription.exercises];
    tempList.splice(targetIndex, 1);
    setPrescription((prevExercisePrescriptionList) => ({
      ...prevExercisePrescriptionList,
      exercises: tempList,
    }));
  };

  function capitalizeFirstLetterOfEachWord(inputString) {
    const words = inputString?.split(' ');
    const capitalizedWords = words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords?.join(' ');
  }

  const handleClosePopup = () => setOpenPopup(false);
  const handleEditExerciseBtn = (sets, reps, restTime) => {
    setPrescription((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[targetExercise.exerciseIndex] = {
        ...updatedExercises[targetExercise.exerciseIndex],
        sets,
        reps,
        rest: restTime,
      };

      return { ...prev, exercises: updatedExercises };
    });
    handleClosePopup();
  };

  const editExerciseInfoPopup = openPopup && (
    <EditExerciseInfoPopup
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      targetExercise={targetExercise}
      prescription={prescription}
      setPrescription={setPrescription}
      handleClosePopup={handleClosePopup}
      handleEditExerciseBtn={handleEditExerciseBtn}
    />
  );

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          background: '#F6FAFB',
          boxShadow: '0',
          ml: 'auto',
          maxHeight: '380px',
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '97%',
          // width: '58.7vw',
          // paddingLeft: 2,
          // '@media (max-width: 1600px)': {
          //   ml: 4,
          // },
        }}
      >
        <h1 className="PrescriptionTableHead">Exercise Prescription</h1>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
            padding: '20px',
            paddingBottom: '5%',
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="table_head" id="prescriptionTableHead" align="center">
                No.
              </TableCell>
              <TableCell className="table_head" id="prescriptionTableHead" align="center">
                Name
              </TableCell>
              <TableCell className="table_head" id="prescriptionTableHead" align="center">
                Sets
              </TableCell>
              <TableCell className="table_head" id="prescriptionTableHead" align="center">
                Reps
              </TableCell>
              <TableCell className="table_head" id="prescriptionTableHead" align="center">
                Rest
              </TableCell>
              <TableCell className="table_head" id="prescriptionTableHead" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescription?.exercises?.map((row, index) => (
              <TableRow key={row.first_name}>
                <TableCell align="center" className="prescription_table_cells">
                  {`${index + 1}.`}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  <div className="actionDiv" style={{ display: 'flex', alignItems: 'center' }}>
                    {capitalizeFirstLetterOfEachWord(row?.name)}
                  </div>
                </TableCell>
                <TableCell align="center" className="prescription_table_cells">
                  {row?.sets}
                </TableCell>
                <TableCell align="center" className="prescription_table_cells">
                  {row?.reps}
                </TableCell>
                <TableCell align="center" className="prescription_table_cells">
                  {row?.rest}
                </TableCell>
                <TableCell align="center" className="prescription_table_cells">
                  <MenuBtn
                    row={row}
                    index={index}
                    setOpenPopup={setOpenPopup}
                    setTargetExercise={setTargetExercise}
                    handleDeleteFromList={handleDeleteFromList}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editExerciseInfoPopup}
    </>
  );
}
