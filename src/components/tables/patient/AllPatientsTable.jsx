/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import { React, useState, useRef, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Table, Button, TextField, TablePagination } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import PatientDetailSection from '../../patientDetailSection';
import IconTextField from '../../CustomTextInput/CustomTextfield.Component';
import EditPatient from '../../popups/patient/EditPatient.Popup';
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

export default function PatientTable({
  patients,
  setOpenAddPatient,
  getPatients,
  handleFilterAndSorting,
  loading,
  exerciseFilter,
  diaganosisFilter,
  filter,
  setFilter,
  sorting,
  setSorting,
  checked,
  activateUser,
  handleChangeCheck,
}) {
  const navigate = useNavigate();
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patient, setPatient] = useState('');
  const [editPatient, setEditPatient] = useState('');
  const [search, setSearch] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const click = useRef(null);
  const filterRef = useRef(null);
  const classes = useStyles();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [page, setPage] = useState(0);

  const isSafari =
    navigator.vendor.match(/apple/i) &&
    !navigator.userAgent.match(/crios/i) &&
    !navigator.userAgent.match(/fxios/i) &&
    !navigator.userAgent.match(/Opera|OPT\//);

  const handleCheck = async (event, value) => {
    event.preventDefault();

    if (filter.filterType === 'exercise') {
      const updatedExerciseArray = event.target.checked
        ? [...filter.exerciseArray, value]
        : filter.exerciseArray.filter((item) => item !== value);

      setFilter((prevFilter) => ({
        ...prevFilter,
        exerciseArray: updatedExerciseArray,
      }));

      await handleFilterAndSorting({
        filterType: 'exercise',
        filterValueArray: updatedExerciseArray,
      });
    } else if (filter.filterType === 'diagnosis') {
      const updatedDiagnosisArray = event.target.checked
        ? [...filter.diagnosisArray, value]
        : filter.diagnosisArray.filter((item) => item !== value);

      setFilter((prevFilter) => ({
        ...prevFilter,
        diagnosisArray: updatedDiagnosisArray,
      }));

      await handleFilterAndSorting({
        filterType: 'diagnosis',
        filterValueArray: updatedDiagnosisArray,
      });
    }
  };

  const handleFilter = async (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value, clinicNamefilter: '' });
    if (event.target.value === 'all') {
      await handleFilterAndSorting({ filterType: event.target.value });
    }
  };

  const handlePatientProfile = (patientid) => {
    navigate(`/patients/${patientid}/prescription`);
  };
  const handleSearch = async (event) => {
    setSearch(event.target.value);
    await handleFilterAndSorting({ searchValue: event.target.value });
  };

  const handleFilterChange = async (event) => {
    setSorting({ ...sorting, [event.target.name]: event.target.value });
    await handleFilterAndSorting({ sort: event.target.value });
  };

  const handleClinicNamefilter = async (event) => {
    setFilter({ ...filter, clinicNamefilter: event.target.value });
    await handleFilterAndSorting({ filterType: 'clinic', clinicName: event.target.value });
  };

  const handleAllClear = async () => {
    setSorting({ ...sorting, sortBy: '' });
    setFilter({ ...filter, filterType: 'all', clinicNamefilter: '' });
    setOpenFilter(false);
    await handleFilterAndSorting({ filterType: 'all' });
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

  const handleDeletePatient = (item) => {
    setOpenDeletePopup(true);
    setDeleteUser(item);
  };

  const handleChangePage = async (event, newPage) => {
    getPatients(newPage + 1);
    setPage(newPage);
  };

  const DeleteUserPopup = openDeletePopup && (
    <DeleteModal
      openDeletePopup={openDeletePopup}
      setOpenDeletePopup={setOpenDeletePopup}
      item={deleteUser}
      getData={getPatients}
      txt="clinicians/deletePatient"
    />
  );
  const editPatientPopup = openEditPatient && (
    <EditPatient
      openEditPatient={openEditPatient}
      setOpenEditPatient={setOpenEditPatient}
      patientDetails={editPatient}
      getPatients={getPatients}
    />
  );
  return (
    <div className="allClinicAdminTable" id="clinicianTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '95%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '94vw',
          minHeight: '95%',
          '@media (max-width: 1284px)': {
            overflow: 'auto',
          },
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">
            List Of Patients <span className="countStyle">{patients?.total}</span>
          </h1>

          <div
            id="allTabletitlePatnts"
            className="allTableTitle"
            style={{ flexGrow: !isSafari ? '0.35' : 'none' }}
          >
            {/* <FormControlLabel
              required
              control={
                <>
                  <Typography sx={{ color: checked ? '#136773' : '', fontSize: '12px' }}>
                    Active Users
                  </Typography>
                  <Switch
                    size="small"
                    color="default"
                    checked={!checked}
                    onChange={handleChangeCheck}
                    inputProps={{ 'aria-label': 'ant design' }}
                  />
                  <Typography sx={{ color: checked ? '' : '#136773', fontSize: '12px' }}>
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

            <Filter
              className="pointer"
              id="filterPatientsTbl"
              ref={filterRef}
              onClick={() => setOpenFilter(!openFilter)}
            />
            {openFilter && (
              <div className="patientFilterPoper" ref={click}>
                <div className="filterHead">
                  <p>Filters</p>
                  <p role="presentation" className="pointer" onClick={handleAllClear}>
                    Clear All
                  </p>
                </div>

                <div className="hl" />
                <RadioGroup
                  aria-label="filter"
                  name="filterType"
                  onChange={handleFilter}
                  value={filter.filterType}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px',
                    },
                  }}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="All"
                  />

                  <FormControlLabel
                    value="clinic"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Clinic Name"
                  />
                  <TextField
                    sx={{
                      borderRadius: '20px !important',
                      input: {
                        color: '#000000',
                        fontSize: '14px',
                        marginLeft: '20px',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '22px',
                        },
                        '&:hover fieldset': {
                          borderColor: filter.filterType === 'clinic' ? '#454238' : '',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#454238',
                        },
                      },
                    }}
                    id="outlined-email"
                    placeholder="Enter Clinic Name"
                    size="normal"
                    value={filter.clinicNamefilter}
                    onChange={handleClinicNamefilter}
                    disabled={filter.filterType !== 'clinic'}
                  />
                  <div className="subFilters">
                    <FormControlLabel
                      value="exercise"
                      control={
                        <Radio classes={{ root: classes.radio, checked: classes.checked }} />
                      }
                      label="Exercise"
                    />
                    <div className="innerSubFilters">
                      {exerciseFilter?.map((item) => (
                        <FormControlLabel
                          key={item}
                          sx={{
                            textAlign: 'left',
                            width: 'fit-content',
                          }}
                          control={
                            <Checkbox
                              classes={{ root: classes.checkBox, checked: classes.checked }}
                              disabled={filter.filterType !== 'exercise'}
                              onChange={(event) => handleCheck(event, item)}
                              checked={
                                filter.exerciseArray.includes(item) &&
                                filter.filterType === 'exercise'
                              }
                            />
                          }
                          label={
                            <Typography
                              style={{
                                textAlign: 'left',
                                fontWeight: '500',
                                fontSize: '14px',
                              }}
                            >
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="subFilters">
                    <FormControlLabel
                      value="diagnosis"
                      control={
                        <Radio classes={{ root: classes.radio, checked: classes.checked }} />
                      }
                      label="Diagnosis"
                    />
                    <div className="innerSubFilters">
                      {diaganosisFilter?.map((item) => (
                        <FormControlLabel
                          key={item}
                          sx={{
                            textAlign: 'left',
                            width: 'fit-content',
                          }}
                          control={
                            <Checkbox
                              classes={{ root: classes.checkBox, checked: classes.checked }}
                              disabled={filter.filterType !== 'diagnosis'}
                              onChange={(event) => handleCheck(event, item)}
                              checked={
                                filter.diagnosisArray.includes(item) &&
                                filter.filterType === 'diagnosis'
                              }
                            />
                          }
                          label={
                            <Typography
                              style={{
                                textAlign: 'left',
                                fontWeight: '500',
                                fontSize: '14px',
                              }}
                            >
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </div>
                  </div>
                </RadioGroup>
                <RadioGroup
                  aria-label="sortFilter"
                  name="sortBy"
                  onChange={handleFilterChange}
                  value={sorting.sortBy}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px',
                    },
                  }}
                >
                  <p className="filterHead">Sort By</p>

                  <FormControlLabel
                    value="diagnosis"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Injury type"
                  />
                  <FormControlLabel
                    value="error"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Outstanding Errors"
                  />
                  <FormControlLabel
                    value="% Accuracy of Recent Session"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="% Accuracy of Recent Session"
                    disabled
                  />
                  <FormControlLabel
                    value="% Completion of most recent session"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="% Completion of most recent session"
                    disabled
                  />
                  <FormControlLabel
                    value="reviewed"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Reviewed by Clinician"
                  />
                  <FormControlLabel
                    value="Messages Unread"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Messages Unread"
                    disabled
                  />
                </RadioGroup>
              </div>
            )}
            <Button className="dashboard_table_head_btn" onClick={() => setOpenAddPatient(true)}>
              Add New Patient
            </Button>
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
              <TableCell align="left" className="table_head" sx={{ width: '2%' }}>
                ID
              </TableCell>
              <TableCell align="left" className="table_head" sx={{ width: '15%' }}>
                Name
              </TableCell>
              <TableCell className="table_head" align="center" sx={{ width: '15%' }}>
                Diagnosis
              </TableCell>
              <TableCell className="table_head" align="center" sx={{ width: '15%' }}>
                Prescription
              </TableCell>
              <TableCell className="table_head" align="center">
                Date of Last Activity
              </TableCell>
              <TableCell className="table_head" align="center">
                Performance
              </TableCell>
              <TableCell
                className="table_head"
                sx={{ '@media (max-width: 1600px)': { width: '13%' } }}
                align="center"
              >
                Pain (s)
              </TableCell>
              <TableCell
                className="table_head"
                style={{
                  paddingLeft: 1,
                  paddingRight: 1,
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
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
            ) : patients?.users?.length > 0 ? (
              patients?.users.map((row) => (
                <PatientDetailSection
                  row={row}
                  patient={patient}
                  // counter={counter}
                  setPatient={setPatient}
                  setOpenEditPatient={setOpenEditPatient}
                  handleDeletePatient={handleDeletePatient}
                  handlePatientProfile={handlePatientProfile}
                  // handleReportAndMsgCounter={handleReportAndMsgCounter}
                  setEditPatient={setEditPatient}
                  activateUser={activateUser}
                  checked={checked}
                />
              ))
            ) : (
              <>
                <TableCell align="center" />
                <TableCell align="left" className="noDataTxt">
                  No Patient found
                </TableCell>
              </>
            )}
          </TableBody>
        </Table>
        {editPatientPopup}
        {DeleteUserPopup}
      </TableContainer>
      <TablePagination
        sx={{ color: '#919B9B' }}
        component="div"
        rowsPerPageOptions={[]}
        count={patients?.total || 0}
        rowsPerPage={patients?.limit || 10}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
