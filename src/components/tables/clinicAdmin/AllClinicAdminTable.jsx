import { React, useState, useEffect, useRef } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import { Table, Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// navigation
import { useNavigate } from 'react-router-dom';

// assets import
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import { ReactComponent as Cross } from '../../../assets/icons/crossIcon.svg';

// child component imports
import EditClinicAdmin from '../../popups/clinicAdmin/EditClinicAdmin';
import AvatarComponent from '../../Avatar';
import IconTextField from '../../../utils/CustomTextInput';
import useStyles from '../../../utils/RadioBtnStyle';

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
  setOpenAddClinicAdmin,
  clinicAdmins,
  getClinicAdmins,
}) {
  const [openEditClinicAdmin, setOpenEditClinicAdmin] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [clinicAdmin, setClinicAdmin] = useState({});
  const [filter, setFilter] = useState('');
  const click = useRef(null);
  const classes = useStyles();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const handleCloseFilter = (e) => {
      if (click.current && openFilter && !click.current.contains(e.target)) {
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
          maxHeight: '100%',
          overflowX: 'hidden',
          width: '94vw',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">List of Clinic Admins</h1>
          <div className="allTableTitle">
            <IconTextField />
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
            <Filter className="pointer" onClick={() => setOpenFilter(!openFilter)} />
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
                <div className="hl" />
                <RadioGroup
                  aria-label="filter"
                  name="filter"
                  onChange={handleFilterChange}
                  value={filter}
                  sx={{
                    fontSize: '14px',
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px',
                    },
                    MuiIcon: {
                      root: {
                        color: '#136773',
                        '&$checked': {
                          color: '#136773',
                        },
                      },
                    },
                  }}
                >
                  <FormControlLabel
                    value="Admin Name"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Admin Name"
                  />
                  <FormControlLabel
                    value="Staff"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Staff"
                  />
                  <FormControlLabel
                    value="Clinic Name"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Clinic Name"
                  />
                </RadioGroup>
              </div>
            )}
            <Button
              className="dashboard_table_head_btn"
              onClick={() => setOpenAddClinicAdmin(true)}
            >
              Invite clinic admin
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
            {clinicAdmins.length > 0 ? (
              clinicAdmins.map((row) => (
                <StyledTableRow key={row.first_name} className="tableRow">
                  <TableCell />
                  <TableCell
                    align="left"
                    sx={{ display: 'flex', paddingTop: '12%' }}
                    onClick={() => navigate(`/clinician/${row._id}`)}
                  >
                    <AvatarComponent
                      alt={`${row.first_name} ${row.last_name}`}
                      className="header_avatar"
                    />
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
                    onClick={() => navigate(`/clinician/${row._id}`)}
                  >
                    {row.therapist_count}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="table_cells"
                    sx={{
                      padding: '3%',
                    }}
                    onClick={() => navigate(`/clinician/${row._id}`)}
                  >
                    {row.patient_count}
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

        <EditClinicAdmin
          openEditClinicAdmin={openEditClinicAdmin}
          setOpenEditClinicAdmin={setOpenEditClinicAdmin}
          getClinicAdmins={getClinicAdmins}
          clinicAdminDetails={clinicAdmin}
        />
      </TableContainer>
    </div>
  );
}
