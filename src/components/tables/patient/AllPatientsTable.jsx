/* eslint-disable no-nested-ternary */
import { React, useState, useRef, useEffect } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
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

// // assets import
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Report } from '../../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import { ReactComponent as Tick } from '../../../assets/components/Table/tick.svg';

// child component imports
import IconTextField from '../../../utils/CustomTextInput';
import AvatarComponent from '../../Avatar';
import useStyles from '../../../utils/RadioBtnStyle';
import EditPatient from '../../popups/patient/EditPatient';

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

export default function PatientTable({ patients, setOpenAddPatient }) {
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [patient, setPatient] = useState('');
  const [filter, setFilter] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const isSafari =
    navigator.vendor.match(/apple/i) &&
    !navigator.userAgent.match(/crios/i) &&
    !navigator.userAgent.match(/fxios/i) &&
    !navigator.userAgent.match(/Opera|OPT\//);
  const click = useRef(null);
  const filterRef = useRef(null);
  const classes = useStyles();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
          maxHeight: '100%',
          overflowX: 'hidden',
          width: '94vw',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">
            List of Patients <span className="countStyle">120</span>
          </h1>

          <div className="allTableTitle" style={{ flexGrow: !isSafari ? '0.15' : 'none' }}>
            <IconTextField />

            <Filter
              className="pointer"
              ref={filterRef}
              onClick={() => setOpenFilter(!openFilter)}
            />
            {console.log('openFilter', openFilter)}
            {openFilter && (
              <div className="patientFilterPoper" ref={click}>
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
                    value="All"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="All"
                  />
                  <FormControlLabel
                    value="Clinic Name"
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
                          borderColor: '#454238',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#454238',
                        },
                      },
                    }}
                    id="outlined-email"
                    placeholder="Enter Clinic Name"
                    size="normal"
                    // value={email}
                    // type={email}
                    // onChange={handleInput}
                  />
                  <div className="subFilters">
                    <FormControlLabel
                      value="Exercise"
                      control={
                        <Radio classes={{ root: classes.radio, checked: classes.checked }} />
                      }
                      label="Exercise"
                    />
                    <div className="innerSubFilters">
                      <FormControlLabel
                        sx={{
                          textAlign: 'left',
                          width: 'fit-content',
                        }}
                        control={
                          <Checkbox
                            // onChange={handleCheck}
                            // checked={checked}
                            classes={{ root: classes.checkBox, checked: classes.checked }}
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
                            Cat Camel
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        sx={{
                          textAlign: 'left',
                          width: 'fit-content',
                        }}
                        control={
                          <Checkbox
                            // onChange={handleCheck}
                            // checked={checked}
                            classes={{ root: classes.checkBox, checked: classes.checked }}
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
                            Supine Bridge
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                  <div className="subFilters">
                    <FormControlLabel
                      value="Diagnosis"
                      control={
                        <Radio classes={{ root: classes.radio, checked: classes.checked }} />
                      }
                      label="Diagnosis"
                    />
                    <div className="innerSubFilters">
                      <FormControlLabel
                        sx={{
                          textAlign: 'left',
                          width: 'fit-content',
                        }}
                        control={
                          <Checkbox
                            // onChange={handleCheck}
                            // checked={checked}
                            classes={{ root: classes.checkBox, checked: classes.checked }}
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
                            Knee joint
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        sx={{
                          textAlign: 'left',
                          width: 'fit-content',
                        }}
                        control={
                          <Checkbox
                            // onChange={handleCheck}
                            // checked={checked}
                            classes={{ root: classes.checkBox, checked: classes.checked }}
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
                            Back and Neck Pain
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                  <FormControlLabel
                    value="Injury type"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Injury type"
                  />
                  <FormControlLabel
                    value="Outstanding Errors"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Outstanding Errors"
                  />
                  <FormControlLabel
                    value="Outstanding Errors"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Outstanding Errors"
                  />
                  <FormControlLabel
                    value="% Accuracy of Recent Session"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="% Accuracy of Recent Session"
                  />
                  <FormControlLabel
                    value="% Completion of most recent session"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="% Completion of most recent session"
                  />
                  <FormControlLabel
                    value="Reviewed by Clinician"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Reviewed by Clinician"
                  />
                  <FormControlLabel
                    value="Messages Unread"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Messages Unread"
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
                Completion
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
            {patients.map((row) => (
              <>
                <StyledTableRow
                  key={row.name}
                  className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}
                  onClick={() => {
                    setPatient(row);
                  }}
                >
                  <TableCell align="left"> {row.id} </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', paddingTop: '12%' }}>
                    <AvatarComponent alt="Arooj Ishfaq" className="header_avatar" />
                    <div className="patient_cell">{row.name}</div>
                  </TableCell>

                  <TableCell align="center" className="table_cells">
                    {row.diagnosis}
                  </TableCell>
                  <TableCell align="center" className="table_cells">
                    {row.exercises}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    id="completion_cell"
                    sx={{
                      padding: '3%',
                    }}
                  >
                    {row.completion}
                  </TableCell>

                  <TableCell align="center">
                    <span className="linearProgress">{`${row.performance}%`}</span>
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
                        value={row.performance}
                        thickness="40"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ transform: 'rotate(270deg)' }}>
                    <div className="circularBarCell">
                      <CircularProgress
                        variant="determinate"
                        thickness="4.5"
                        value={50}
                        size={55}
                        sx={{ color: '#FABB18' }}
                      />

                      <span className="circularProgress">55%</span>
                    </div>
                  </TableCell>
                </StyledTableRow>
                {patient.id === row.id ? (
                  <TableRow className={patient.id === row.id ? 'clrTableRow' : 'tableRow'}>
                    <TableCell width="2%" />

                    <TableCell>
                      <div className="notiCell">
                        <Report /> <p className="reportTxt"> 2 Reports</p>
                      </div>
                    </TableCell>
                    <TableCell sx={{ '@media (max-width: 1600px)': { width: '30%' } }}>
                      <div className="notiCell">
                        <Message />
                        <p className="msgTxt"> 3 Messages</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="notiCell">
                        <Tick /> <p className="statusTxt">reviewed</p>
                      </div>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell align="left">
                      <Edit className="table_icons" onClick={() => setOpenEditPatient(true)} />
                    </TableCell>
                  </TableRow>
                ) : (
                  ''
                )}
              </>
            ))}
          </TableBody>
        </Table>

        <EditPatient openEditPatient={openEditPatient} setOpenEditPatient={setOpenEditPatient} />
      </TableContainer>
    </div>
  );
}
