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

// navigation
import { useNavigate } from 'react-router-dom';

// assets import
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';

// child component imports
import EditClinician from '../../popups/clinician/EditClinician';
import AvatarComponent from '../../Avatar';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ClinicianTable({ clinicians }) {
  const [openEditClinican, setOpenEditClinican] = useState(false);
  const navigate = useNavigate();

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
            {clinicians.map((row) => (
              <StyledTableRow key={row.name} className="tableRow">
                <TableCell />
                <TableCell
                  align="left"
                  sx={{ display: 'flex', paddingTop: '12%' }}
                  onClick={() => navigate(`/dashboard/staff/clinician/doctor/${row._id}`)}
                >
                  <AvatarComponent
                    alt={`${row.first_name} ${row.last_name}`}
                    className="header_avatar"
                  />
                  <div className="clinic_cell">
                    {`${row.first_name} ${row.last_name}`} <br />
                    <span className="clinicNametxt">{`Clinic: ${row.clinic_name}`}</span>
                  </div>
                </TableCell>

                <TableCell
                  align="center"
                  className="table_cells"
                  onClick={() => navigate(`/dashboard/staff/clinician/doctor/${row._id}`)}
                >
                  Muscular dystrophy
                </TableCell>
                <TableCell
                  align="center"
                  className="table_cells"
                  onClick={() => navigate(`/dashboard/staff/clinician/doctor/${row._id}`)}
                >
                  {row.phone}
                </TableCell>
                <TableCell
                  onClick={() => navigate(`/dashboard/staff/clinician/doctor/${row._id}`)}
                  align="center"
                  className="table_cells"
                  sx={{
                    padding: '3%',
                  }}
                >
                  {row.patient_count}
                </TableCell>

                <TableCell align="center">
                  <Edit className="table_icons" onClick={() => setOpenEditClinican(true)} />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <EditClinician
          openEditClinican={openEditClinican}
          setOpenEditClinican={setOpenEditClinican}
        />
      </TableContainer>
    </div>
  );
}
