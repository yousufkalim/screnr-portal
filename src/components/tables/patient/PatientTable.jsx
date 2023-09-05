/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import { React, useState, Fragment } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import EditPatient from '../../popups/patient/EditPatient.Popup';
import DeleteModal from '../../popups/general/Delete.Popup';
import request from '../../../request/index';
import ClinicianPatientDetails from '../../patientDetailSection/clinicianPatientDetails';

export default function PatientTable({
  patients,
  getPatients,
  loading,
  handleChangeCheck,
  checked,
  activateUser,
}) {
  const navigate = useNavigate();
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patient, setPatient] = useState('');
  const [page, setPage] = useState(0);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [counter, setCounter] = useState({
    report: '',
    unReadMsg: '',
  });

  const handleReportAndMsgCounter = (patientId) => {
    request('get', `/clinicians/unreadMesasgeAndUncheckedReport/${patientId}`)
      .then((res) => {
        setCounter({
          report: res?.data?.uncheckedReport?.count,
          unReadMsg: res?.data?.unreadMessage?.count,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const handleChangePage = async (event, newPage) => {
    await getPatients(newPage + 1);
    setPage(newPage);
  };
  const handleBackIconClick = () => {
    window.history.back();
  };

  const handlePatientProfile = (patientid) => {
    navigate(`/patients/${patientid}/prescription`);
  };

  const handleDeletePatient = (item) => {
    setOpenDeletePopup(true);
    setDeleteUser(item);
  };

  const editPatientPopup = openEditPatient && (
    <EditPatient
      openEditPatient={openEditPatient}
      setOpenEditPatient={setOpenEditPatient}
      patientDetails={patient}
      getPatients={getPatients}
    />
  );

  const DeleteUserPopup = openDeletePopup && (
    <DeleteModal
      openDeletePopup={openDeletePopup}
      setOpenDeletePopup={setOpenDeletePopup}
      item={deleteUser}
      getData={getPatients}
      txt="clinicians/deletePatient"
    />
  );

  return (
    <div
      style={{ marginTop: '0', position: 'unset', height: '66vh' }}
      className="activityTable"
      // id="clinicianTable"
    >
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '84%',
          overflowX: 'hidden',
          boxShadow: '0',
          '@media (max-width: 1850px)': {
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#f5f4f4',
            },
            '&::-webkit-scrollbar-track': {
              background: '#dddcdc',
            },
          },
        }}
      >
        <div className="iconAndHeading" id="spaceBetween">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="BackIconDiv" onClick={handleBackIconClick} aria-hidden="true">
              <BackIcon />
            </div>
            <h1 className="clientTableHead">List of Patients</h1>
          </div>

          <div className="button-container">
            <button
              className={checked ? 'button active' : 'button inactive'}
              onClick={handleChangeCheck}
            >
              Active Users
            </button>
            <button
              className={checked ? 'button inactive' : 'button active'}
              onClick={handleChangeCheck}
            >
              Inactive Users
            </button>
          </div>
        </div>

        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
            paddingBottom: '5%',
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ height: '20px' }}>
              <TableCell align="left" className="table_head" sx={{ width: '4%' }}>
                ID
              </TableCell>
              <TableCell
                align="left"
                className="table_head"
                sx={{
                  width: '18%',
                  '@media (max-width: 1600px)': { width: '34%' },
                }}
              >
                Name
              </TableCell>
              <TableCell className="table_head" align="center">
                Diagnosis
              </TableCell>
              <TableCell className="table_head" align="center">
                Prescription
              </TableCell>
              <TableCell className="table_head" align="center">
                Date of Last Activity
              </TableCell>
              <TableCell className="table_head" align="center">
                Performance
              </TableCell>
              <TableCell
                className="table_head"
                sx={{
                  '@media (max-width: 1600px)': { width: '13%' },
                  '@media (max-width: 1545px)': { minWidth: '90px' },
                }}
                align="center"
              >
                Pain (s)
              </TableCell>
              <TableCell className="table_head">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <LinearProgress
                    sx={{
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundColor: '#f6fafb',
                      },
                      '& .MuiLinearProgress-barColorSecondary': {
                        backgroundColor: '#f6fafb',
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : patients?.users?.length > 0 ? (
              patients?.users?.map((row) => (
                <ClinicianPatientDetails
                  row={row}
                  patient={patient}
                  counter={counter}
                  setPatient={setPatient}
                  setOpenEditPatient={setOpenEditPatient}
                  handleDeletePatient={handleDeletePatient}
                  handlePatientProfile={handlePatientProfile}
                  handleReportAndMsgCounter={handleReportAndMsgCounter}
                  activateUser={activateUser}
                  checked={checked}
                />
              ))
            ) : (
              <>
                <TableCell align="center" />
                <TableCell align="left" className="noDataTxt">
                  No Patient found
                </TableCell>
              </>
            )}
          </TableBody>
        </Table>
        {editPatientPopup}
        {DeleteUserPopup}
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={patients?.total?.count || 0}
        rowsPerPage={patients?.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
