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
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
// import { FormControlLabel, Switch, Typography } from '@mui/material';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import EditClinician from '../../popups/clinician/EditClinician.Popup';
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar/Avatar.Component';
import PhoneFormat from '../../../utils/PhoneFormat';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ClinicianTable({
  clinicians,
  getClinicians,
  loading,
  handleChangeCheck,
  checked,
  activateUser,
}) {
  const navigate = useNavigate();
  const [clinician, setClinician] = useState({});
  const [openEditClinican, setOpenEditClinican] = useState(false);
  return (
    <div
      style={{ position: 'unset', marginTop: '0' }}
      className="bgClinicianTable"
      id="clinicianTable"
    >
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: window.location.pathname === '/clinic/dashboard' ? '68%' : '94%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '100%',
        }}
      >
        {/* <div className="iconAndHeading">
          <h1 className="clientTableHead">List of Clinicians</h1>
        </div> */}
        <div className="iconAndHeading" id="spaceBetween">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="clientTableHead">List of Clinicians</h1>
          </div>

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
            ) : clinicians?.users?.length > 0 ? (
              clinicians?.users?.map((row) => (
                <StyledTableRow key={row.id} className="tableRow">
                  <TableCell />
                  <TableCell
                    align="left"
                    sx={{ display: 'flex', paddingTop: '12%' }}
                    onClick={() => navigate(`/clinicians/${row.id}`)}
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
                      <span className="clinicNametxt">{`Clinic: ${row.userData.clinic.userData.clinic_name}`}</span>
                    </div>
                  </TableCell>

                  <TableCell
                    align="center"
                    className="table_cells"
                    onClick={() => navigate(`/clinicians/${row.id}`)}
                  >
                    {row.userData.title ? `${row.userData.title}.` : '-'}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    onClick={() => navigate(`/clinicians/${row.id}`)}
                  >
                    {PhoneFormat(row.phone_number)}
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/clinicians/${row.id}`)}
                    align="center"
                    className="table_cells"
                    sx={{
                      padding: '3%',
                    }}
                  >
                    {row.patient.count}
                  </TableCell>

                  <TableCell align="center">
                    {checked ? (
                      <Edit
                        className="table_icons"
                        onClick={() => {
                          setClinician(row);
                          setOpenEditClinican(true);
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
              <>
                <TableCell align="center" />
                <TableCell align="left" className="noDataTxt">
                  No Clinician found
                </TableCell>
              </>
            )}
          </TableBody>
        </Table>
        {openEditClinican && (
          <EditClinician
            clinicianDetails={clinician}
            openEditClinican={openEditClinican}
            setOpenEditClinican={setOpenEditClinican}
            getClinicians={getClinicians}
          />
        )}
      </TableContainer>
    </div>
  );
}
