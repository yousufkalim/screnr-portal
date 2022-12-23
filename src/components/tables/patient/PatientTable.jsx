import { React, useState } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

// assets import
import { ReactComponent as Edit } from '../../../assets/components/dashboardTable/alert.svg';

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

  function createData(name, title, phone, patients) {
    return { name, title, phone, patients };
  }

  const rows = [
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
    createData('Arooj Ishfaq', 'Muscular dystrophy', '+1 (223) 123-4463', '12', '3'),
  ];

  return (
    <div className="bgClinicianTable" id="clinicianTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '96%',
          overflowX: 'hidden',
          width: '77.8vw',
          '@media (max-width: 1600px)': {
            maxHeight: '96.3%',
            width: '73vw',
          },
        }}
      >
        <h1 className="clientTableHead">List of Clinicians</h1>
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
              <TableCell sx={{ width: '2%' }} />
              <TableCell align="left" sx={{ width: '20%' }} className="table_head">
                Name
              </TableCell>
              <TableCell className="table_head" align="center">
                Title
              </TableCell>
              <TableCell className="table_head" align="center">
                Phone
              </TableCell>
              <TableCell className="table_head" align="center">
                Patients
              </TableCell>
              <TableCell className="table_head" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name} className="clientTableRow">
                <TableCell />
                <TableCell align="left" sx={{ display: 'flex', paddingTop: '12%' }}>
                  <AvatarComponent alt="Arooj Ishfaq" className="header_avatar" />
                  <div className="clinic_cell">
                    {row.name} <br />
                    <span className="clinicNametxt">Clinic: Line Pvt.</span>
                  </div>
                </TableCell>

                <TableCell align="center" className="table_cells">
                  {`${row.title}`}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {`${row.phone}`}
                </TableCell>
                <TableCell
                  align="center"
                  className="table_cells"
                  sx={{
                    padding: '3%',
                  }}
                >
                  {`${row.patients}`}
                </TableCell>

                <TableCell align="center">
                  <Edit className="table_icons" onClick={() => setOpenEditPatient(true)} />
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
