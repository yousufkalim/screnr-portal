/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState, Fragment } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TablePagination } from '@mui/material';
import EditPatient from '../../popups/patient/EditPatient.Popup';
import DeleteModal from '../../popups/general/Delete.Popup';
import AddPatient from '../../popups/patient/AddPatient.Popup';
import request from '../../../request/index';
import ClinicianDashboardPatientTable from '../../patientDetailSection/clinicianDashboardPatientTable';

export default function PatientsByCliniciansTable({
  loading,
  patients,
  getPatients,
  openAddPatient,
  setOpenAddPatient,
  checked,
  handleChangeCheck,
  activateUser,
  handleChangePage,
  page,
}) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState('');
  const [openEditPatient, setOpenEditPatient] = useState(false);
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

  const handlePatientProfile = (patientid) => navigate(`/patients/${patientid}/prescription`);
  const handleDeletePatient = (item) => {
    setOpenDeletePopup(true);
    setDeleteUser(item);
  };

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
    <div id="patientsByClinicianTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '95%',
          overflowX: 'auto',
          overflowY: 'auto',
          boxShadow: '0',
          width: '100%',
          '@media (max-width: 1535px)': {
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track:vertical': {
              background: '#f5f4f4',
            },
            '&::-webkit-scrollbar-track:horizontal': {
              background: '#dddcdc',
            },
          },
        }}
      >
        <div style={{ justifyContent: 'space-between' }} className="iconAndHeading">
          <h1 className="clientTableHead">List of Patients</h1>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div className="button-container">
              <button
                type="button"
                className={checked ? 'button active' : 'button inactive'}
                onClick={handleChangeCheck}
              >
                Active Users
              </button>
              <button
                type="button"
                className={checked ? 'button inactive' : 'button active'}
                onClick={handleChangeCheck}
              >
                Inactive Users
              </button>
            </div>

            <span onClick={() => setOpenAddPatient(true)} className="invitePatientBtn">
              Add new patient
            </span>
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
              <TableCell align="left" className="table_head" sx={{ width: '2%' }}>
                ID
              </TableCell>
              <TableCell
                align="left"
                className="table_head"
                // sx={{
                //   width: '20%',
                //   '@media (max-width: 1600px)': { width: '34%' },
                // }}
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
              <TableCell className="table_head">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
                <ClinicianDashboardPatientTable
                  row={row}
                  patient={patient}
                  setPatient={setPatient}
                  counter={counter}
                  handleReportAndMsgCounter={handleReportAndMsgCounter}
                  handleDeletePatient={handleDeletePatient}
                  setOpenEditPatient={setOpenEditPatient}
                  handlePatientProfile={handlePatientProfile}
                  checked={checked}
                  activateUser={activateUser}
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
        {openEditPatient && (
          <EditPatient
            openEditPatient={openEditPatient}
            setOpenEditPatient={setOpenEditPatient}
            patientDetails={patient}
            getPatients={getPatients}
          />
        )}
        {DeleteUserPopup}

        {openAddPatient && (
          <AddPatient
            getPatients={getPatients}
            openAddPatient={openAddPatient}
            setOpenAddPatient={setOpenAddPatient}
          />
        )}
      </TableContainer>
      <TablePagination
        sx={{ color: '#919B9B' }}
        component="div"
        rowsPerPageOptions={[]}
        count={patients?.total?.count || 0}
        rowsPerPage={patients.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
