/* eslint-disable no-nested-ternary */
import { React, useState, Fragment } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

// // assets import
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Profile } from '../../../assets/components/Table/Profile.svg';
import { ReactComponent as Report } from '../../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { ReactComponent as Tick } from '../../../assets/components/Table/tick.svg';

// child component imports
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar';
import EditPatient from '../../popups/patient/EditPatient';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function PatientTable({ patients, getPatients }) {
  const navigate = useNavigate();
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patient, setPatient] = useState('');
  const [page, setPage] = useState(0);

  const handleChangePage = async (event, newPage) => {
    await getPatients(newPage + 1);
    setPage(newPage);
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
    <div className="bgClinicianTable" id="clinicianTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '84%',
          overflowX: 'hidden',
          width: '58.7vw',
          '@media (max-width: 1600px)': {
            maxHeight: '85.6%',
            width: '54.7vw',
          },
        }}
      >
        <h1 className="clientTableHead">List of Patients</h1>
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
                sx={{ width: '20%', '@media (max-width: 1600px)': { width: '34%' } }}
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
                sx={{ '@media (max-width: 1600px)': { width: '13%' } }}
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
                  }}
                >
                  <TableCell align="left"> {row.id} </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', paddingTop: '12%' }}>
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
                    {row.userData?.diagnosis}
                  </TableCell>
                  <TableCell align="center" className="table_cells">
                    {row.prescription}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    id="completion_cell"
                    sx={{
                      padding: '3%',
                    }}
                  >
                    {row.completion}%
                  </TableCell>
                  <TableCell align="center">
                    <span className="linearProgress">{`${row.performance}%`}</span>
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
                  <TableCell align="center" sx={{ transform: 'rotate(270deg)' }}>
                    <div className="circularBarCell">
                      <CircularProgress
                        variant="determinate"
                        thickness="4.5"
                        value={row.pain}
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

                      <span className="circularProgress">{row.pain}%</span>
                    </div>
                  </TableCell>
                </StyledTableRow>
                {patient.id === row.id ? (
                  <TableRow className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}>
                    <TableCell width="2%" />

                    <TableCell>
                      <div className="notiCell">
                        <Report />{' '}
                        <p className="reportTxt">
                          {' '}
                          {`${patients?.uncheckedReport?.count || 0} Reports`}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell sx={{ '@media (max-width: 1600px)': { width: '30%' } }}>
                      <div className="notiCell">
                        <Message />
                        <p className="msgTxt">
                          {' '}
                          {`${patients?.unreadMessage?.count || 0} Messages`}{' '}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="notiCell">
                        <Tick /> <p className="statusTxt">reviewed</p>
                      </div>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell style={{ display: 'flex', gap: '5px' }}>
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
