/* eslint-disable no-nested-ternary */
import { React, useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import IconTextField from '../../CustomTextInput/CustomTextfield.Component';
import EditClinician from '../../popups/clinician/EditClinician.Popup';
import { getMediaUrl } from '../../../config';
import AvatarComponent from '../../Avatar/Avatar.Component';
import PhoneFormat from '../../../utils/PhoneFormat';

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

export default function AllCliniciansTable({ clinicians, getClinicians, loading }) {
  const [openEditClinician, setOpenEditClinician] = useState(false);
  const [clinician, setClinician] = useState({});

  const [filter, setFilter] = useState({
    sortBy: '',
    status: '',
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const click = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleChangePage = async (event, newPage) => {
    await getClinicians(filter.sortBy, search, filter.status, newPage + 1);
    setPage(newPage);
  };

  const handleFilterChange = async (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
    await getClinicians(filter.sortBy, search, filter.status);
  };

  const handleSearch = async (event) => {
    setSearch(event.target.value);
    await getClinicians(filter.sortBy, event.target.value, filter.status);
  };

  useEffect(() => {
    if (filter.sortBy || filter.status) {
      getClinicians(filter.sortBy, search, filter.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    const handleCloseFilter = (e) => {
      if (
        click.current &&
        filterRef.current &&
        openFilter &&
        !click.current.contains(e.target) &&
        !filterRef.current.contains(e.target)
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
    <div className="allClinicAdminTable" id="clinicAdminTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          boxShadow: '0',
          maxHeight: '95%',
          overflowX: 'hidden',
          width: '94vw',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">
            List of Clinician
            <span className="countStyle">{clinicians?.total?.count || 0}</span>
          </h1>

          <div className="allTableTitle" style={{ flexGrow: '0.15' }}>
            <IconTextField value={search} handleChange={handleSearch} name="search" />

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
                      setSearch('');
                    }}
                    className="pointer"
                  >
                    Clear All
                  </p>
                </div>

                <div>
                  <p className="filterHead">Status</p>
                  <div className="status_bottom" />
                  <div className="hl" />
                  <RadioGroup
                    aria-label="statusFilter"
                    name="status"
                    onChange={handleFilterChange}
                    value={filter.status}
                    sx={{
                      '.MuiFormControlLabel-label': {
                        fontSize: '14px',
                      },
                    }}
                  >
                    <FormControlLabel
                      value="active"
                      control={
                        <Radio classes={{ root: classes.radio, checked: classes.checked }} />
                      }
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={
                        <Radio classes={{ root: classes.radio, checked: classes.checked }} />
                      }
                      label="Inactive"
                    />
                  </RadioGroup>
                </div>

                <p className="filterHead">Sort By</p>
                <div className="hl" />
                <RadioGroup
                  aria-label="sortFilter"
                  name="sortBy"
                  onChange={handleFilterChange}
                  value={filter.sortBy}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px',
                    },
                  }}
                >
                  <FormControlLabel
                    value="clinician"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Clinician Name"
                  />

                  <FormControlLabel
                    value="clinic"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Clinic Name"
                  />
                  <FormControlLabel
                    value="patient"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Number of Patients"
                  />
                  <FormControlLabel
                    value="patient-active"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Active Patients"
                  />
                  <FormControlLabel
                    value="patient-in-active"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Inactive Patients"
                  />
                  <FormControlLabel
                    value="patient-error"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Patients Not Performing well"
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
              </TableCell>{' '}
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
                    {row?.profile_pic ? (
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
                        Clinic: <span className="clinicNameSubtxt">{row.clinic_name}</span>
                      </span>
                    </div>
                  </TableCell>

                  <TableCell
                    align="center"
                    className="table_cells"
                    onClick={() => navigate(`/clinicians/${row.id}`)}
                  >
                    {row.userData.title}.
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    onClick={() => navigate(`/clinicians/${row.id}`)}
                  >
                    {PhoneFormat(row.phone_number)}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    sx={{
                      padding: '3%',
                    }}
                    onClick={() => navigate(`/clinicians/${row.id}`)}
                  >
                    {row.patient.count}
                  </TableCell>

                  <TableCell align="center">
                    <Edit
                      className="table_icons"
                      onClick={() => {
                        setOpenEditClinician(true);
                        setClinician(row);
                      }}
                    />
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <>
                {' '}
                <TableCell align="center" />
                <TableCell align="left" className="noDataTxt">
                  No Clinicians found
                </TableCell>
              </>
            )}
          </TableBody>
        </Table>

        <EditClinician
          openEditClinican={openEditClinician}
          setOpenEditClinican={setOpenEditClinician}
          clinicianDetails={clinician}
          getClinicians={getClinicians}
        />
      </TableContainer>
      <TablePagination
        sx={{ color: '#919B9B' }}
        component="div"
        rowsPerPageOptions={[]}
        count={clinicians?.total?.count || 0}
        rowsPerPage={clinicians.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
