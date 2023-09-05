/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import { React, useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import Switch from '@mui/material/Switch';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import TablePagination from '@mui/material/TablePagination';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { ReactComponent as VisibilityOff } from '../../../assets/icons/eyess.svg';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import { ReactComponent as Cross } from '../../../assets/icons/crossIcon.svg';
import EditClinicAdmin from '../../popups/clinicAdmin/EditClinicAdmin.Popup';
import AvatarComponent from '../../Avatar/Avatar.Component';
import IconTextField from '../../CustomTextInput/CustomTextfield.Component';
import { getMediaUrl } from '../../../config';
import DeleteModal from '../../popups/general/Delete.Popup';

const useStyles = makeStyles(() => ({
  radio: {
    color: '#D1D1D6 !important',
    '&$checked': {
      color: '#136773 !important',
    },
  },
  checkBox: {
    color: ' #919B9B !important',
    '&$checked': {
      color: '#136773 !important',
    },
  },
  checked: {},
}));
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
  activateUser,
  checked,
  handleChangeCheck,
}) {
  const classes = useStyles();
  const click = useRef(null);
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [clinicAdmin, setClinicAdmin] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [openEditClinicAdmin, setOpenEditClinicAdmin] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});

  const handleChangePage = async (event, newPage) => {
    await getClinicAdmins('', '', newPage + 1);
    setPage(newPage);
  };

  const handleFilterChange = async (event) => {
    setFilter(event.target.value);
    await getClinicAdmins(event.target.value);
  };

  const handleSearch = async (event) => {
    setSearch(event.target.value);
    await getClinicAdmins('', event.target.value);
  };

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

  const handleDeleteClinician = (item) => {
    setOpenDeletePopup(true);
    setDeleteUser(item);
  };

  const DeleteUserPopup = openDeletePopup && (
    <DeleteModal
      openDeletePopup={openDeletePopup}
      setOpenDeletePopup={setOpenDeletePopup}
      item={deleteUser}
      getData={getClinicAdmins}
      txt="staff/deleteClinic"
    />
  );

  return (
    <div
      style={{
        marginTop: '10vh',
        height: '90vh',
      }}
      className="allClinicAdminTable"
      id="clinicAdminTable"
    >
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '95%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '94vw',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">
            List of Clinic Admins <span className="countStyle">{clinicAdmins?.total?.count}</span>
          </h1>
          <div className="allTableTitle" style={{ flexGrow: '0.15' }}>
            {/* <FormControlLabel
              required
              control={
                <>
                  <Typography sx={{ color: checked ? '' : '#136773', fontSize: '12px' }}>
                    Active Users
                  </Typography>
                  <Switch
                    size="small"
                    color="default"
                    checked={checked}
                    onChange={handleChangeCheck}
                    inputProps={{ 'aria-label': 'ant design' }}
                  />
                  <Typography sx={{ color: checked ? '#136773' : '', fontSize: '12px' }}>
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
            <IconTextField value={search} handleChange={handleSearch} name="search" />
            {filter && (
              <div className="selectedFilter">
                <p>{filter}</p>
                <Cross
                  className="crossIcon"
                  onClick={() => {
                    setFilter('');
                    setOpenFilter(false);
                  }}
                />
              </div>
            )}
            <Filter
              className="pointer"
              onClick={() => setOpenFilter(!openFilter)}
              ref={filterRef}
            />
            {openFilter && (
              <div className="filterPoper" ref={click}>
                <div className="filterHead">
                  <p>Filters</p>{' '}
                  <p
                    role="presentation"
                    onClick={() => {
                      setFilter('');
                    }}
                    className="pointer"
                  >
                    Clear All
                  </p>
                </div>

                <p className="filterHead">Sort By</p>
                <div className="status_bottom" />
                <div className="hl" />
                <RadioGroup
                  aria-label="filter"
                  name="filter"
                  onChange={handleFilterChange}
                  value={filter}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px',
                    },
                  }}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Admin Name"
                  />
                  <FormControlLabel
                    value="staff"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Staff"
                  />
                  <FormControlLabel
                    value="clinic"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Clinic Name"
                  />
                </RadioGroup>
              </div>
            )}
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
                    {row.patient.count}
                  </TableCell>

                  <TableCell align="center">
                    {checked ? (
                      <>
                        <Edit
                          className="table_icons"
                          onClick={() => {
                            setOpenEditClinicAdmin(true);
                            setClinicAdmin(row);
                          }}
                        />
                        <VisibilityOff
                          className="table_icons"
                          onClick={() => handleDeleteClinician(row)}
                          style={{ marginLeft: '.5rem' }}
                        />
                      </>
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
                {' '}
                <TableCell align="center" />
                <TableCell align="left" className="noDataTxt">
                  No Clinic Admins found
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
        {DeleteUserPopup}
      </TableContainer>
      <TablePagination
        sx={{ color: '#919B9B', width: '97%' }}
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
