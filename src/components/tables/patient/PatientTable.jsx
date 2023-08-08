/* eslint-disable no-nested-ternary */
import { React, useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
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
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Profile } from '../../../assets/components/Table/Profile.svg';
import { ReactComponent as Report } from '../../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar/Avatar.Component';
import EditPatient from '../../popups/patient/EditPatient.Popup';
import request from '../../../request/index';
import PieChartComponent from '../../charts/patient/PieChart.Component';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function PatientTable({ patients, getPatients, loading }) {
  const navigate = useNavigate();
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patient, setPatient] = useState('');
  const [page, setPage] = useState(0);
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
          '@media (max-width: 1600px)': {
            overflowX: 'scroll',
          },
          '@media (max-width: 1535px)': {
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
        <div className="iconAndHeading">
          <div className="BackIconDiv" onClick={handleBackIconClick} aria-hidden="true">
            <BackIcon />
          </div>
          <h1 className="clientTableHead">List of Patients</h1>
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
                <>
                  <StyledTableRow
                    key={row.id}
                    className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}
                    onClick={() => {
                      setPatient(row);
                      handleReportAndMsgCounter(row?.id);
                    }}
                  >
                    <TableCell align="left"> {row?.userData?.mrn_id} </TableCell>
                    <TableCell align="left">
                      <div className="image_div">
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
                      </div>
                    </TableCell>

                    <TableCell align="center" className="table_cells">
                      {row.userData?.diagnosis}
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
                      {Math.round(row.completion) ?? '-'}%
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
                      // sx={{
                      //   padding: '22px',
                      //   paddingRight: '20px',
                      //   display: 'flex',
                      //   alignItems: 'center',
                      //   justifyContent: 'center',
                      //   width: '100px',
                      //   marginLeft: '40px',
                      //   '@media (max-width: 1500px)': { marginTop: '22px' },
                      // }}
                    >
                      <div className="circularBarCellAllPatients">
                        {row?.pain?.before > 0 && row?.pain?.after > 0 ? (
                          <PieChartComponent before={row?.pain?.before} after={row?.pain?.after} />
                        ) : (
                          'N/A'
                        )}
                      </div>
                    </TableCell>
                  </StyledTableRow>
                  {patient?.id === row?.id ? (
                    <TableRow className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}>
                      <TableCell width="2%" />
                      <TableCell>
                        <div className="notiCell">
                          <Report /> <p className="reportTxt">{counter?.report} Reports</p>
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
