import { useState } from 'react';
// mui imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// assets import
import { ReactComponent as Edit } from '../../../assets/components/dashboardTable/alert.svg';
import { ReactComponent as Delete } from '../../../assets/components/dashboardTable/alert1.svg';

// child import
import AvatarComponent from '../../Avatar';
import DeleteModal from '../../DeletePopup';
import EditStaffMember from '../../popups/dashboard/EditStaffMember';

export default function TableComponent({ setOpenAddStaffMember }) {
  const [openEditStaffMember, setOpenEditStaffMember] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  function createData(id, fullName, phone, email) {
    return { id, fullName, phone, email };
  }

  const rows = [
    createData('02', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('03', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('04', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('05', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('06', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('02', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('03', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('04', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('05', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('06', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('02', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('03', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('04', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('05', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('06', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('02', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('03', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('04', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('05', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('06', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '20px',
        maxHeight: '100%',
        overflowX: 'hidden',
        padding: '1% 2%',
        width: '58vw',
        '@media (max-width: 1600px)': {
          width: '54vw',
        },
      }}
    >
      <div className="table_title">
        <h3 className="dashboard-table-txt">List of staff members</h3>
        <Button className="dashboard_table_head_btn" onClick={() => setOpenAddStaffMember(true)}>
          Invite member
        </Button>
      </div>
      <Table
        aria-label="simple table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" size="small" className="table_header">
              ID
            </TableCell>
            <TableCell align="left" size="small" className="table_header">
              Full Name
            </TableCell>
            <TableCell align="left" size="small" className="table_header">
              Phone
            </TableCell>
            <TableCell align="center" size="small" className="table_header">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className="table_cells">
                {row.id}
              </TableCell>
              <TableCell align="left" sx={{ display: 'flex' }}>
                <AvatarComponent alt="Ameer Hamza" className="header_avatar" />
                <div className="name_cell_dasdboard">
                  {row.fullName} <br />
                  <span className="staffEmailCell"> {row.email}</span>
                </div>
              </TableCell>
              <TableCell align="left" className="table_cells">
                {row.phone}
              </TableCell>
              <TableCell align="left">
                <div className="table_action_div">
                  <Edit className="table_icons" onClick={() => setOpenEditStaffMember(true)} />
                  <Delete className="table_icons" onClick={() => setOpenDeletePopup(true)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <EditStaffMember
          openEditStaffMember={openEditStaffMember}
          setOpenEditStaffMember={setOpenEditStaffMember}
        />

        <DeleteModal openDeletePopup={openDeletePopup} setOpenDeletePopup={setOpenDeletePopup} />
      </Table>
    </TableContainer>
  );
}
