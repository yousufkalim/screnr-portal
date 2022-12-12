import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AvatarComponent from './Avatar';
import { ReactComponent as Edit } from '../assets/components/Dashboard_Table/Alert.svg';
import { ReactComponent as Delete } from '../assets/components/Dashboard_Table/Alert1.svg';

export default function TableComponent() {
  function createData(id, fullName, phone, email) {
    return { id, fullName, phone, email };
  }

  const rows = [
    createData('02', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('03', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('04', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('05', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
    createData('06', 'Ameer Hamza', '+1(223) 123-4463', 'ameerhamza@gmail.com'),
  ];
  const handleEditIcon = () => {
    console.log('Edit');
  };
  const handleDeleteIcon = () => {
    console.log('Delete');
  };
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '20px' }}>
      <div className="table_title">
        <h3 style={{ color: '#136773', fontWeight: '500' }}>List of staff members</h3>
        <Button className="dashboard_table_head_btn">Invite member</Button>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" size="small" className="table_header">
              ID
            </TableCell>
            <TableCell align="left" size="small" className="table_header">
              Full Name
            </TableCell>
            <TableCell align="left" size="small" className="table_header">
              Phone
            </TableCell>
            <TableCell align="right" size="small" className="table_header">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" className="table_cells">
                {row.id}
              </TableCell>
              <TableCell align="left" sx={{ display: 'flex' }}>
                <AvatarComponent alt="Rana Hamza" className="header_avatar" />
                <div style={{ marginLeft: 8 }} className="table_cells">
                  {row.fullName} <br />
                  {row.email}
                </div>
              </TableCell>
              <TableCell align="left" className="table_cells">
                {row.phone}
              </TableCell>
              <TableCell align="right">
                <div className="table_action_div">
                  <Edit className="table_icons" onClick={() => handleEditIcon()} />
                  <Delete className="table_icons" onClick={() => handleDeleteIcon()} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
