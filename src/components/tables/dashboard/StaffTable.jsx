import { useState } from 'react';
// mui imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';

// navigation
// import { useNavigate } from 'react-router-dom';

// assets import
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Delete } from '../../../assets/components/Table/alert1.svg';

// child import
import AvatarComponent from '../../Avatar';

import EditStaffMember from '../../popups/dashboard/EditStaffMember';
import { getMediaUrl } from '../../../config';
import PhoneFormat from '../../../utils/PhoneFormat';
import DeleteModal from '../../popups/general/DeletePopup';

export default function TableComponent({ setOpenAddStaffMember, staffMembers, getStaffMembers }) {
  const [openEditStaffMember, setOpenEditStaffMember] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [page, setPage] = useState(0);
  const [staffMember, setStaffMember] = useState();
  // const navigate = useNavigate();

  const handleChangePage = async (event, newPage) => {
    await getStaffMembers(newPage + 1);
    setPage(newPage);
  };

  return (
    <>
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
              <TableCell
                align="left"
                size="small"
                className="table_header"
                sx={{ width: 'fit-content' }}
              >
                ID
              </TableCell>
              <TableCell align="left" size="small" className="table_header" sx={{ width: '40%' }}>
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
            {staffMembers?.users?.map((row) => (
              <>
                <div style={{ margin: '20% 0' }} />

                <TableRow
                  key={row.name}
                  className="tableRow"
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell
                    align="left"
                    className="table_cells"
                    // onClick={() => navigate(`/staff/${row._id}`)}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: 'flex' }}
                    // onClick={() => navigate(`/staff/${row.id}`)}
                  >
                    {row.profile_pic ? (
                      <div className="imgDiv">
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
                    <div className="name_cell_dasdboard">
                      {`${row.first_name} ${row.last_name}`} <br />
                      <span className="staffEmailCell"> {row.email}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table_cells"
                    // onClick={() => navigate(`/staff/${row._id}`)}
                  >
                    {row.phone_number && PhoneFormat(row.phone_number)}
                  </TableCell>
                  <TableCell align="left">
                    <div className="table_action_div">
                      <Edit
                        className="table_icons"
                        onClick={() => {
                          setStaffMember(row);
                          setOpenEditStaffMember(true);
                        }}
                      />
                      <Delete
                        className="table_icons"
                        onClick={() => {
                          setStaffMember(row);
                          setOpenDeletePopup(true);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>

                <div style={{ margin: '20% 0' }} />
              </>
            ))}
          </TableBody>

          {openEditStaffMember && (
            <EditStaffMember
              openEditStaffMember={openEditStaffMember}
              setOpenEditStaffMember={setOpenEditStaffMember}
              staffMemberDetails={staffMember}
              getStaffMembers={getStaffMembers}
            />
          )}

          {openDeletePopup && (
            <DeleteModal
              openDeletePopup={openDeletePopup}
              setOpenDeletePopup={setOpenDeletePopup}
              item={staffMember}
              txt="admins/staff"
              getData={getStaffMembers}
            />
          )}
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={staffMembers.total?.count}
        rowsPerPage={staffMembers.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}
