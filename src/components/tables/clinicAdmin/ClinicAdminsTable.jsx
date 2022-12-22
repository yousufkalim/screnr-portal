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
import EditClinicAdmin from '../../popups/clinicAdmin/EditClinicAdmin';
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

export default function ClinicAdminTable() {
  const [openEditClinicAdmin, setOpenEditClinicAdmin] = useState(false);

  function createData(name, clinicians, patients) {
    return { name, clinicians, patients };
  }

  const rows = [
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
    createData('Ameer Hamza', '12', '3'),
  ];

  return (
    <div className="bg" id="clinicAdminTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '100%',
          overflowX: 'hidden',
          width: '77.8vw',
          '@media (max-width: 1600px)': {
            maxHeight: '98%',
            width: '73vw',
          },
        }}
      >
        <h1 className="clientTableHead">List of Clinic Admins</h1>
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
                Clinic Name
              </TableCell>
              <TableCell className="table_head" align="center">
                Clinicans
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
                  <AvatarComponent alt="Ameer Hamza" className="header_avatar" />
                  <div className="clinic_cell">
                    {row.name} <br />
                    <span className="clinicNametxt">
                      Clinic: <span className="clinicNameSubtxt">Line Pvt.</span>
                    </span>
                  </div>
                </TableCell>

                <TableCell align="center" className="table_cells">
                  {`${row.clinicians}`}
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
                  <Edit className="table_icons" onClick={() => setOpenEditClinicAdmin(true)} />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <EditClinicAdmin
          openEditClinicAdmin={openEditClinicAdmin}
          setOpenEditClinicAdmin={setOpenEditClinicAdmin}
        />
      </TableContainer>
    </div>
  );
}
