/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
// import { FormControlLabel, Switch, Typography } from '@mui/material';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/BackIcon.svg';
import EditClinicAdmin from '../../popups/clinicAdmin/EditClinicAdmin.Popup';
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar/Avatar.Component';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ClinicAdminTable({
  staffAdminId,
  clinicAdmins,
  getClinicAdmins,
  loading,
  handleChangeCheck,
  checked,
  activateUser,
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [clinicAdmin, setClinicAdmin] = useState({});
  const [openEditClinicAdmin, setOpenEditClinicAdmin] = useState(false);

  const handleBackIconClick = () => navigate('/admin/dashboard');
  const handleChangePage = async (event, newPage) => {
    await getClinicAdmins(newPage + 1);
    setPage(newPage);
  };

  return (
    <div className="bg" id="clinicAdminTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '88%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '73vw',
        }}
      >
        <div className="iconAndHeading" id="spaceBetween">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="BackIconDiv" onClick={handleBackIconClick} aria-hidden="true">
              <BackIcon />
            </div>
            <h1 className="clientTableHead">List of Clinic Admins</h1>
          </div>

          {/* <FormControlLabel
            required
            control={
              <>
                <Typography sx={{ color: checked ? '#919b9b' : '#136773', fontSize: '14px' }}>
                  Active Users
                </Typography>
                <Switch
                  size="small"
                  color="default"
                  checked={checked}
                  onChange={handleChangeCheck}
                  inputProps={{ 'aria-label': 'ant design' }}
                />
                <Typography sx={{ color: checked ? '#136773' : '#919b9b', fontSize: '14px' }}>
                  Inactive Users
                </Typography>
              </>
            }
          /> */}
          <div className="button-container">
            <button
              className={checked ? 'button active' : 'button inactive'}
              onClick={handleChangeCheck}
            >
              Active Users
            </button>
            <button
              className={checked ? 'button inactive' : 'button active'}
              onClick={handleChangeCheck}
            >
              Inactive Users
            </button>
          </div>
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
              <TableCell sx={{ width: '2%' }} />
              <TableCell align="left" sx={{ width: '20%' }} className="table_head">
                Clinic Name
              </TableCell>
              <TableCell className="table_head" align="center">
                Clinicians
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
            ) : clinicAdmins?.users?.length > 0 ? (
              clinicAdmins?.users?.map((row) => (
                <StyledTableRow key={row.id} className="tableRow">
                  <TableCell />
                  <TableCell
                    align="left"
                    sx={{ display: 'flex', paddingTop: '12%' }}
                    onClick={() => navigate(`/clinics/${row.id}`)}
                  >
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

                  <TableCell
                    align="center"
                    className="table_cells"
                    onClick={() => navigate(`/clinics/${row.id}`)}
                  >
                    {row.clinician.count}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    sx={{
                      padding: '3%',
                    }}
                    onClick={() => navigate(`/clinics/${row.id}`)}
                  >
                    {row.patient.count}
                  </TableCell>

                  <TableCell align="center">
                    {checked ? (
                      <Edit
                        className="table_icons"
                        onClick={() => {
                          setOpenEditClinicAdmin(true);
                          setClinicAdmin(row);
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => activateUser(row.id)}
                        className="action_btn"
                      >
                        Activate
                      </button>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="left"> </TableCell>
                <TableCell align="left">
                  <p className="noDataTxt">No Data Found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {openEditClinicAdmin && (
          <EditClinicAdmin
            staffAdminId={staffAdminId}
            openEditClinicAdmin={openEditClinicAdmin}
            setOpenEditClinicAdmin={setOpenEditClinicAdmin}
            getClinicAdmins={getClinicAdmins}
            clinicAdminDetails={clinicAdmin}
          />
        )}
      </TableContainer>
      <TablePagination
        sx={{ width: '73vw', color: '#919B9B' }}
        component="div"
        rowsPerPageOptions={[]}
        count={clinicAdmins?.total?.count || 0}
        rowsPerPage={clinicAdmins.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
