/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Delete } from '../../../assets/components/Table/alert1.svg';
import { ReactComponent as StaffMember } from '../../../assets/icons/staffMember.svg';
import { ReactComponent as ClinicsLogo } from '../../../assets/icons/ClinicsLogo.svg';
import { ReactComponent as ClinicianLogo } from '../../../assets/icons/ClinicianLogo.svg';
import { ReactComponent as PatientsLogo } from '../../../assets/icons/PatientsLogo.svg';
import AvatarComponent from '../../Avatar/Avatar.Component';
import request from '../../../request/index';
import EditStaffMember from '../dashboard/EditStaff.Popup';
import EditClinicAdmin from '../clinicAdmin/EditClinicAdmin.Popup';
import EditClinician from '../clinician/EditClinician.Popup';
import EditPatient from '../patient/EditPatient.Popup';
import DeleteModal from './Delete.Popup';
import PhoneFormat from '../../../utils/PhoneFormat';

export default function SearchScreen() {
  const navigate = useNavigate();
  const [role, setRole] = useState('staff');
  const [searchQurrey, setSearchQurrey] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [staffPopup, setStaffPopup] = useState(false);
  const [clinicPopup, setClinicPopup] = useState(false);
  const [clinicianPopup, setClinicianPopup] = useState(false);
  const [patientPopup, setPatientPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRole = (event) => setRole(event.target.name);
  const removeUserFromArray = () => {
    const filtered = searchedData?.filter((item) => {
      return item?.id !== userData?.id;
    });
    setSearchedData(filtered);
  };

  const handleSearch = async () => {
    if (searchQurrey.length >= 1 && role) {
      setLoading(true);
      setTimeout(async () => {
        await request('get', `/clinicians/search?role=${role}&search=${searchQurrey}`)
          .then((res) => {
            setSearchedData(res?.data?.users);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setLoading(false);
          });
      }, 500);
    } else if (searchQurrey.length === 0) {
      setSearchedData([]);
    }
  };

  const handleEdit = (userRole) => {
    const popupMapping = {
      staff: setStaffPopup,
      clinic: setClinicPopup,
      clinician: setClinicianPopup,
      patient: setPatientPopup,
    };

    const setPopup = popupMapping[userRole];
    if (setPopup) {
      setPopup(true);
    }
  };

  const handleNaviagteToProfile = (userRole, userId) => {
    let path = '';
    if (userRole === 'staff') {
      path = `/staff/${userId}`;
    } else if (userRole === 'clinic') {
      path = `/clinics/${userId}`;
    } else if (userRole === 'clinician') {
      path = `/clinicians/${userId}`;
    } else if (userRole === 'patient') {
      path = `/patients/${userId}/prescription`;
    }
    navigate(path);
  };

  const EditStaffMemberPopup = staffPopup && (
    <EditStaffMember
      openEditStaffMember={staffPopup}
      setOpenEditStaffMember={setStaffPopup}
      staffMemberDetails={userData}
      getData={handleSearch}
    />
  );
  const EditClinicAdminPopup = clinicPopup && (
    <EditClinicAdmin
      openEditClinicAdmin={clinicPopup}
      setOpenEditClinicAdmin={setClinicPopup}
      clinicAdminDetails={userData}
      getClinicAdmins={handleSearch}
      // table="allClinicAdminsTable"
    />
  );
  const EditClinicianPopup = clinicianPopup && (
    <EditClinician
      clinicianDetails={userData}
      openEditClinican={clinicianPopup}
      setOpenEditClinican={setClinicianPopup}
      getClinicians={handleSearch}
    />
  );
  const EditPatientPopup = patientPopup && (
    <EditPatient
      openEditPatient={patientPopup}
      setOpenEditPatient={setPatientPopup}
      patientDetails={userData}
      getPatients={handleSearch}
    />
  );

  const DeleteUserPopup = openDeletePopup && (
    <DeleteModal
      openDeletePopup={openDeletePopup}
      setOpenDeletePopup={setOpenDeletePopup}
      item={userData}
      getData={removeUserFromArray}
      txt={
        role === 'staff'
          ? 'admins/deleteStaff'
          : role === 'clinic'
          ? 'staff/deleteClinic'
          : role === 'clinician'
          ? 'clinics/deleteClinician'
          : role === 'patient' && 'clinicians/deletePatient'
      }
    />
  );

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQurrey, role]);

  return (
    <div
      className="main_div_searchScreen"
      style={{
        height: '100vh',
        background: 'rgb(246, 250, 251)',
        padding: '5%',
        paddingTop: '2.7%',
        marginTop: '6.5vh',
        position: 'fixed',
      }}
    >
      <div
        className="namehere"
        style={{ height: '90vh', width: '90vw', background: 'rgb(246, 250, 251)' }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '20px',
            maxHeight: '100vh',
            overflowX: 'hidden',
            padding: '1% 0%',
            boxShadow: '0',
            width: '90vw',
            '@media (max-width: 1600px)': {
              width: '90vw',
            },
          }}
        >
          <div
            style={{
              width: '95%',
              background: '#F6FAFB',
              margin: '0 2%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '17px',
              marginTop: '1.5%',
            }}
          >
            {/* <IconTextField id="searchInputField" /> */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                // background: 'red',
                gap: '1%',
                height: '3.5rem',
              }}
            >
              <SearchIcon sx={{ marginLeft: '2%', color: '#919B9B' }} />
              <input
                name="search"
                value={searchQurrey}
                type="search"
                placeholder="Enter Text to search"
                onChange={(e) => setSearchQurrey(e.target.value)}
                style={{
                  border: 'none',
                  width: '90%',
                  color: 'grey',
                  fontSize: '15px',
                  outline: 'none',
                  background: 'transparent',
                  padding: '4px',
                }}
              />
            </div>
          </div>
          <div className="textLine">
            <p>I am looking for ....</p>
          </div>
          <Table
            aria-label="simple table"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
          >
            <div className="table_title">
              <div className="buttonDiv">
                <Button
                  id={role === 'staff' ? 'optionButtons_selected' : 'optionButtons'}
                  name="staff"
                  onClick={(e) => {
                    handleRole(e);
                  }}
                >
                  <StaffMember style={{ width: '15%', marginRight: '8px' }} />
                  Staff Member
                </Button>
                <Button
                  id={role === 'clinic' ? 'optionButtons_selected' : 'optionButtons'}
                  name="clinic"
                  onClick={(e) => {
                    handleRole(e);
                  }}
                >
                  <ClinicsLogo className="buttonLogos" />
                  Clinics
                </Button>
                <Button
                  id={role === 'clinician' ? 'optionButtons_selected' : 'optionButtons'}
                  name="clinician"
                  onClick={(e) => {
                    handleRole(e);
                  }}
                >
                  <ClinicianLogo className="buttonLogos" />
                  Clinician
                </Button>
                <Button
                  id={role === 'patient' ? 'optionButtons_selected' : 'optionButtons'}
                  name="patient"
                  onClick={(e) => {
                    handleRole(e);
                  }}
                >
                  <PatientsLogo className="buttonLogos" />
                  Patient
                </Button>
              </div>
            </div>
            <Divider sx={{ width: '96%', marginRight: '2%', marginLeft: '2%' }} />
            <TableBody>
              {loading ? (
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
              ) : searchedData && searchedData?.length === 0 ? (
                <TableRow
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <TableCell align="center">No results</TableCell>
                </TableRow>
              ) : (
                searchedData?.map((item) => (
                  <TableRow
                    key={item?.id}
                    className="tableRow"
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        display: 'flex',
                        width: '30%',
                        marginLeft: '19px',
                      }}
                      onClick={() => {
                        handleNaviagteToProfile(item?.role, item?.id);
                      }}
                    >
                      <AvatarComponent
                        alt={`${item?.first_name} ${item?.last_name}`}
                        className="header_avatar"
                      />
                      <div className="name_cell_SearchScreen" style={{ marginLeft: '2%' }}>
                        {`${item?.first_name} ${item?.last_name}`}
                        <br />
                        <span className="staffEmailCell">{item?.email}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      className="table_cells"
                      sx={{ width: '30%', marginLeft: '0px' }}
                    >
                      {item?.phone_number && PhoneFormat(item?.phone_number)}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        width: '12%',
                        marginRight: '10px',
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Edit
                        className="table_icons"
                        onClick={() => {
                          setUserData(item);
                          handleEdit(item?.role);
                        }}
                      />
                      <Delete
                        className="table_icons"
                        onClick={() => {
                          setOpenDeletePopup(true);
                          setUserData(item);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {EditStaffMemberPopup}
      {EditClinicAdminPopup}
      {EditClinicianPopup}
      {EditPatientPopup}
      {DeleteUserPopup}
    </div>
  );
}
