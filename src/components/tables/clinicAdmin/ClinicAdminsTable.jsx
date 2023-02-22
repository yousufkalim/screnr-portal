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
import TablePagination from '@mui/material/TablePagination';

// navigation
// import { useNavigate } from 'react-router-dom';

// assets import
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';

// child component imports
import EditClinicAdmin from '../../popups/clinicAdmin/EditClinicAdmin';
import { getMediaUrl } from '../../../config';
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

export default function ClinicAdminTable({ clinicAdminId, clinicAdmins, getClinicAdmins }) {
  const [openEditClinicAdmin, setOpenEditClinicAdmin] = useState(false);
  const [clinicAdmin, setClinicAdmin] = useState({});
  const [page, setPage] = useState(0);

  const handleChangePage = async (event, newPage) => {
    await getClinicAdmins(newPage + 1);
    setPage(newPage);
  };
  // const navigate = useNavigate();

  return (
    <div className="bg" id="clinicAdminTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '95%',
          overflowX: 'hidden',
          width: '77.8vw',
          '@media (max-width: 1600px)': {
            maxHeight: '92%',
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
            {clinicAdmins?.users?.length > 0 ? (
              clinicAdmins?.users?.map((row) => (
                <StyledTableRow
                  key={row.id}
                  className="tableRow"
                  // onClick={() => navigate(`/clinician/${row._id}`)}
                >
                  <TableCell />
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
                    <div className="clinic_cell">
                      {`${row.first_name} ${row.last_name}`} <br />
                      <span className="clinicNametxt">
                        Clinic: <span className="clinicNameSubtxt">{row.userData.clinic_name}</span>
                      </span>
                    </div>
                  </TableCell>

                  <TableCell align="center" className="table_cells">
                    {row.clinician.count}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    sx={{
                      padding: '3%',
                    }}
                  >
                    {row.patient.count}
                  </TableCell>

                  <TableCell align="center">
                    <Edit
                      className="table_icons"
                      onClick={() => {
                        setOpenEditClinicAdmin(true);
                        setClinicAdmin(row);
                      }}
                    />
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <>
                {' '}
                <TableCell align="center" />
                <TableCell align="left">No Clinic Admins found</TableCell>
              </>
            )}
          </TableBody>
        </Table>
        {openEditClinicAdmin && (
          <EditClinicAdmin
            clinicAdminId={clinicAdminId}
            openEditClinicAdmin={openEditClinicAdmin}
            setOpenEditClinicAdmin={setOpenEditClinicAdmin}
            getClinicAdmins={getClinicAdmins}
            clinicAdminDetails={clinicAdmin}
          />
        )}
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={clinicAdmins?.total?.count}
        rowsPerPage={clinicAdmins.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
