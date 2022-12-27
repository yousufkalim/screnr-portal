/* eslint-disable no-nested-ternary */
import { React, useState } from 'react';

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
import Paper from '@mui/material/Paper';

// // assets import
// import { ReactComponent as Edit } from '../../../assets/components/dashboardTable/alert.svg';

// child component imports
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

export default function PatientTable() {
  const [openEditPatient, setOpenEditPatient] = useState(false);

  function createData(id, name, diagnosis, exercises, completion, performance) {
    return { id, name, diagnosis, exercises, completion, performance };
  }

  const rows = [
    createData('01', 'Arooj Ishfaq', 'Back Pain', 'Strengthening', '100%', '97'),
    createData('02', 'Arooj Ishfaq', 'Muscular dystrophy', 'Strengthening', '100%', '7'),
    createData('03', 'Arooj Ishfaq', 'Muscular Pain', 'Strengthening', '100%', '55'),
  ];

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
                sx={{ width: '20%', '@media (max-width: 1600px)': { width: '33%' } }}
              >
                Name
              </TableCell>
              <TableCell className="table_head" align="center">
                Diagnosis
              </TableCell>
              <TableCell className="table_head" align="center">
                Exercises
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
            {rows.map((row) => (
              <StyledTableRow key={row.name} className="clientTableRow">
                <TableCell align="left"> {row.id} </TableCell>
                <TableCell align="left" sx={{ display: 'flex', paddingTop: '12%' }}>
                  <AvatarComponent alt="Arooj Ishfaq" className="header_avatar" />
                  <div className="patient_cell">{row.name}</div>
                </TableCell>

                <TableCell align="center" className="table_cells">
                  {row.diagnosis}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {row.exercises}
                </TableCell>
                <TableCell
                  align="center"
                  className="table_cells"
                  id="completion_cell"
                  sx={{
                    padding: '3%',
                  }}
                >
                  {row.completion}
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
                      value={50}
                      size={55}
                      sx={{ color: '#FABB18' }}
                    />

                    <span className="circularProgress">55%</span>
                  </div>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <EditPatient openEditPatient={openEditPatient} setOpenEditPatient={setOpenEditPatient} />
      </TableContainer>
    </div>
  );
}
