/* eslint-disable no-nested-ternary */
import { React, useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import EditClinicAdmin from '../../popups/clinicAdmin/EditClinicAdmin.Popup';
import AvatarComponent from '../../Avatar/Avatar.Component';
import { getMediaUrl } from '../../../config';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function AllClinicAdminTable({
  clinicAdmins,
  getClinicAdmins,
  loading,
  checked,
  handleChangeCheck,
  activateUser,
}) {
  const [openEditClinicAdmin, setOpenEditClinicAdmin] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [clinicAdmin, setClinicAdmin] = useState({});
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const click = useRef(null);

  useEffect(() => {
    const handleCloseFilter = (e) => {
      if (
        openFilter &&
        click.current &&
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        !click.current.contains(e.target)
      ) {
        setOpenFilter(false);
      }
    };
    document.addEventListener('mousedown', handleCloseFilter);

    return () => {
      document.removeEventListener('mousedown', handleCloseFilter);
    };
  }, [openFilter]);

  return (
    <div className="allClinicAdminTable" id="clinicAdminTable1">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '95%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '100%',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">List of Clinic Admins</h1>
          <div className="button-container">
            <button
              type="button"
              className={checked ? 'button active' : 'button inactive'}
              onClick={handleChangeCheck}
            >
              Active Users
            </button>
            <button
              type="button"
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
                    onClick={() => navigate(`/clinics/${row.id}`)}
                    align="center"
                    className="table_cells"
                    sx={{
                      padding: '3%',
                    }}
                  >
                    {row?.patient?.count}
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
              <>
                <TableCell align="center" />
                <TableCell align="left">
                  <p className="noDataTxt">No Clinic found</p>
                </TableCell>
              </>
            )}
          </TableBody>
        </Table>
        {openEditClinicAdmin && (
          <EditClinicAdmin
            openEditClinicAdmin={openEditClinicAdmin}
            setOpenEditClinicAdmin={setOpenEditClinicAdmin}
            getClinicAdmins={getClinicAdmins}
            clinicAdminDetails={clinicAdmin}
            table="allClinicAdminsTable"
          />
        )}
      </TableContainer>
    </div>
  );
}
