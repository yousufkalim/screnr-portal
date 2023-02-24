import { React, useState, useRef, useEffect } from 'react';

// mui imports
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

// navigation
import { useNavigate } from 'react-router-dom';

// assets import
import { ReactComponent as Filter } from '../../../assets/icons/filtersIcon.svg';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';

// child component imports
import IconTextField from '../../../utils/CustomTextInput';
import EditClinician from '../../popups/clinician/EditClinician';
import useStyles from '../../../utils/RadioBtnStyle';
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

export default function AllCliniciansTable({ clinicians, getClinicians }) {
  const [openEditClinician, setOpenEditClinician] = useState(false);
  const [clinician, setClinician] = useState({});
  const [filter, setFilter] = useState({
    sortBy: '',
    status: '',
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);
  const click = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleChangePage = async (event, newPage) => {
    await getClinicians('', '', newPage + 1);
    setPage(newPage);
  };

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };
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
          maxHeight: '100%',
          overflowX: 'hidden',
          width: '94vw',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">
            List of Clinicians <span className="countStyle">120</span>
          </h1>

          <div className="allTableTitle" style={{ flexGrow: '0.15' }}>
            <IconTextField />

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

                <div>
                  <p className="filterHead">Status</p>
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
                    value="patient-in-active"
                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Active Patients"
                  />
                  <FormControlLabel
                    value="patient-active"
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
            {clinicians.length > 0 ? (
              clinicians.map((row) => (
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
                <TableCell align="left">No Clinicians found</TableCell>
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
