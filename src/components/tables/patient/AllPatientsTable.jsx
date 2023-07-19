/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { React, useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Table, Button, TextField } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Report } from '../../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import { ReactComponent as Profile } from '../../../assets/components/Table/Profile.svg';
import IconTextField from '../../CustomTextInput/CustomTextfield.Component';
import AvatarComponent from '../../Avatar/Avatar.Component';
import EditPatient from '../../popups/patient/EditPatient.Popup';
import request from '../../../request/index';
import PieChartComponent from '../../charts/patient/PieChart.Component';

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
const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#FF5151',
  },
}));
const YellowLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#FABB18',
  },
}));
const GreenLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#25CC7C',
  },
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
  const [counter, setCounter] = useState({
    report: '',
    unReadMsg: '',
  });

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

    await handleFilterAndSorting({ filterType: 'all' });
  };

  const handleReportAndMsgCounter = (patientId) => {
    request('get', `/clinicians/unreadMesasgeAndUncheckedReport/${patientId}`)
      .then((res) => {
        setCounter({
          report: res?.data?.uncheckedReport?.count,
          unReadMsg: res?.data?.unreadMessage?.count,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
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

  return (
    <div className="allClinicAdminTable" id="clinicianTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '98%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '94vw',
          '@media (max-width: 1284px)': {
            overflow: 'auto',
          },
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">
            List of Patients <span className="countStyle">{patients?.length}</span>
          </h1>

          <div
            id="allTabletitlePatnts"
            className="allTableTitle"
            style={{ flexGrow: !isSafari ? '0.35' : 'none' }}
          >
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
                  <p className="filterHead "> Sort By</p>

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
              Invite patient
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
              <TableCell
                align="left"
                className="table_head"
                sx={{ width: '20%', '@media (max-width: 1600px)': { width: '34%' } }}
              >
                Name
              </TableCell>
              <TableCell className="table_head" align="center">
                Diagnosis
              </TableCell>
              <TableCell className="table_head" align="center">
                Prescription
              </TableCell>
              <TableCell className="table_head" align="center">
                Completion rate
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
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
            ) : patients?.length > 0 ? (
              patients?.map((row) => (
                <>
                  <StyledTableRow
                    key={row?.id}
                    className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}
                    onClick={() => {
                      setPatient(row);
                      handleReportAndMsgCounter(row?.id);
                    }}
                  >
                    <TableCell align="left"> {row.id} </TableCell>
                    <TableCell align="left">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarComponent
                          alt={`${row.first_name} ${row.last_name}`}
                          className="header_avatar"
                        />

                        <div className="patient_cell">{`${row.first_name} ${row.last_name}`}</div>
                      </div>
                    </TableCell>

                    <TableCell align="center" className="table_cells">
                      {row?.userData?.diagnosis}
                    </TableCell>
                    <TableCell align="center" className="table_cells">
                      {row.prescription ?? 'N/A'}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="table_cells"
                      id="completion_cell"
                      sx={{
                        padding: '3%',
                      }}
                    >
                      {Math.round(row.completion) ?? '-'}%
                    </TableCell>

                    <TableCell align="center">
                      <span className="linearProgress">{`${row?.performance ?? 0}%`}</span>
                      {row.performance <= 30 ? (
                        <RedLinearProgress
                          variant="determinate"
                          value={row.performance}
                          thickness="40"
                        />
                      ) : row.performance > 30 && row.performance <= 79 ? (
                        <YellowLinearProgress
                          variant="determinate"
                          value={row.performance}
                          thickness="40"
                        />
                      ) : (
                        <GreenLinearProgress
                          variant="determinate"
                          value={row.performance ?? 0}
                          thickness="40"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <div className="circularBarCellAllPatients" style={{ alignItems: 'center' }}>
                        {row?.pain?.before > 0 && row?.pain?.after > 0 ? (
                          <PieChartComponent before={row?.pain?.before} after={row?.pain?.after} />
                        ) : (
                          'N/A'
                        )}
                      </div>
                    </TableCell>
                  </StyledTableRow>
                  {patient?.id === row?.id ? (
                    <TableRow className={patient?.id === row?.id ? 'clrTableRow' : 'tableRow'}>
                      <TableCell width="2%" />
                      <TableCell>
                        <div className="notiCell">
                          <Report /> <p className="reportTxt">{counter?.report} Reports</p>
                        </div>
                      </TableCell>
                      <TableCell sx={{ '@media (max-width: 1600px)': { width: '30%' } }}>
                        <div className="notiCell">
                          <Message />
                          <p className="msgTxt">{counter?.unReadMsg} Messages</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="notiCell" />
                      </TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell
                        style={{
                          display: 'flex',
                          gap: '15px',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Edit
                          className="table_icons"
                          onClick={() => {
                            setOpenEditPatient(true);
                            setEditPatient(row);
                          }}
                        />
                        <Profile
                          className="table_icons"
                          onClick={() => handlePatientProfile(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ) : (
                    ''
                  )}
                </>
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

        <EditPatient
          openEditPatient={openEditPatient}
          setOpenEditPatient={setOpenEditPatient}
          patientDetails={editPatient}
          getPatients={getPatients}
        />
      </TableContainer>
    </div>
  );
}
