/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { React, useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Profile } from '../../../assets/components/Table/Profile.svg';
import { ReactComponent as Report } from '../../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar/Avatar.Component';
import EditPatient from '../../popups/patient/EditPatient.Popup';
import AddPatient from '../../popups/patient/AddPatient.Popup';
import request from '../../../request/index';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function PatientsByCliniciansTable({
  patients,
  getPatients,
  openAddPatient,
  setOpenAddPatient,
}) {
  const navigate = useNavigate();
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patient, setPatient] = useState('');
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
  const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#FF5151',
    },
  }));
  const YellowLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#FABB18',
    },
  }));
  const GreenLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#25CC7C',
    },
  }));
  const handlePatientProfile = (patientid) => {
    navigate(`/patients/${patientid}/prescription`);
  };

  return (
    <div className="bgClinicianTable" id="patientsByClinicianTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '84%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '100%',
          '@media (max-width: 1600px)': {
            maxHeight: '85.6%',
            width: '100%',
            overflowX: 'scroll',
          },
          '@media (min-width: 1536px)': {
            maxHeight: '85.6%',
            width: '100%',
          },
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
        <div className="iconAndHeading">
          <h1 className="clientTableHead">List of Patients</h1>
          <span onClick={() => setOpenAddPatient(true)} className="invitePatientBtn">
            Invite Patient
          </span>
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
                sx={{
                  width: '20%',
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
                Completion
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
            </TableRow>
          </TableHead>
          <TableBody>
            {patients?.users?.map((row) => (
              <>
                <StyledTableRow
                  key={row.id}
                  className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}
                  onClick={() => {
                    setPatient(row);
                    handleReportAndMsgCounter(row?.id);
                  }}
                >
                  <TableCell align="left"> {row?.id} </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      display: 'flex',
                      minHeight: '80%',
                      paddingTop: '23px',
                      '@media (max-width: 1600px)': { paddingBottom: '32px', paddingTop: '0px' },
                    }}
                  >
                    {row.profile_pic ? (
                      <div className="imgDivClinic">
                        <img
                          src={getMediaUrl(row.profile_pic)}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '100px',
                            objectFit: 'cover',
                          }}
                          alt=""
                        />
                      </div>
                    ) : (
                      <AvatarComponent
                        alt={`${row.first_name} ${row.last_name}`}
                        className="header_avatar"
                      />
                    )}
                    <div className="clinic_cell">{`${row.first_name} ${row.last_name}`}</div>
                  </TableCell>
                  <TableCell align="center" className="table_cells">
                    {row?.userData?.diagnosis}
                  </TableCell>
                  <TableCell align="center" className="table_cells">
                    {row?.prescription}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    id="completion_cell"
                    sx={{
                      padding: '3%',
                    }}
                  >
                    {row.completion ?? '0'}%
                  </TableCell>
                  <TableCell align="center">
                    <span className="linearProgress">{`${row?.performance ?? 0}%`}</span>
                    {row.performance <= 30 ? (
                      <RedLinearProgress
                        variant="determinate"
                        value={row.performance}
                        thickness="40"
                      />
                    ) : row.performance > 30 && row.performance <= 79 ? (
                      <YellowLinearProgress
                        variant="determinate"
                        value={row.performance}
                        thickness="40"
                      />
                    ) : (
                      <GreenLinearProgress
                        variant="determinate"
                        value={row.performance}
                        thickness="40"
                      />
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      transform: 'rotate(270deg)',
                      padding: '22px',
                      paddingRight: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100px',
                      marginLeft: '40px',
                      '@media (max-width: 1500px)': { marginTop: '22px' },
                    }}
                  >
                    <div className="circularBarCell">
                      <CircularProgress
                        variant="determinate"
                        thickness="4.5"
                        value={100}
                        size={55}
                        sx={{
                          color:
                            row.pain <= 30
                              ? '#FF5151'
                              : row.pain > 30 && row.pain <= 79
                              ? '#FABB18'
                              : '#25CC7C',
                        }}
                      />
                      <div className="percentageData">
                        <span className="circularProgress">{row?.pain ?? 0}%</span>
                      </div>
                    </div>
                  </TableCell>
                </StyledTableRow>
                {patient?.id === row?.id ? (
                  <TableRow className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}>
                    <TableCell width="2%" />
                    <TableCell>
                      <div className="notiCell">
                        <Report />
                        <p className="reportTxt">{counter?.report} Reports</p>
                      </div>
                    </TableCell>
                    <TableCell sx={{ '@media (max-width: 1600px)': { width: '30%' } }}>
                      <div className="notiCell">
                        <Message />
                        <p className="msgTxt">{counter?.unReadMsg} Messages</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="notiCell">{}</div>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell
                      style={{
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Edit
                        className="table_icons"
                        onClick={() => {
                          setOpenEditPatient(true);
                          setPatient(row);
                        }}
                      />

                      <Profile
                        className="table_icons"
                        onClick={() => handlePatientProfile(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  ''
                )}
              </>
            ))}
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

        {openAddPatient && (
          <AddPatient
            getPatients={getPatients}
            openAddPatient={openAddPatient}
            setOpenAddPatient={setOpenAddPatient}
          />
        )}
      </TableContainer>
    </div>
  );
}
