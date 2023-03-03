// import { useState } from 'react';
// mui imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// navigation
// import { useNavigate } from 'react-router-dom';

// assets import
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { ReactComponent as Edit } from '../../../assets/components/Table/alert.svg';
import { ReactComponent as Delete } from '../../../assets/components/Table/alert1.svg';
import { ReactComponent as StaffMember } from '../../../assets/icons/staffMember.svg';
import { ReactComponent as ClinicsLogo } from '../../../assets/icons/ClinicsLogo.svg';
import { ReactComponent as ClinicianLogo } from '../../../assets/icons/ClinicianLogo.svg';
import { ReactComponent as PatientsLogo } from '../../../assets/icons/PatientsLogo.svg';

// child import
import AvatarComponent from '../../Avatar';

export default function SearchScreen() {
  return (
    <div
      className="main_div_searchScreen"
      style={{
        height: '100vh',
        background: 'rgb(246, 250, 251)',
        padding: '5%',
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
                type="search"
                placeholder="Enter Text to search"
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
            {/* <div>
              <CloseRoundedIcon />
            </div> */}
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
                <Button id="optionButtons">
                  <StaffMember style={{ width: '15%', marginRight: '8px' }} />
                  Staff Member
                </Button>
                <Button id="optionButtons">
                  {' '}
                  <ClinicsLogo className="buttonLogos" />
                  Clinics
                </Button>
                <Button id="optionButtons">
                  <ClinicianLogo className="buttonLogos" />
                  Clinician
                </Button>
                <Button id="optionButtons">
                  <PatientsLogo className="buttonLogos" />
                  Patients
                </Button>
              </div>
            </div>
            <Divider sx={{ width: '96%', marginRight: '2%', marginLeft: '2%' }} />

            <TableHead>
              {/* <TableRow>
                <IconTextField className="searchInputField" />
              </TableRow> */}
              {/* <TableRow> */}
              {/* <TableCell
                align="left"
                size="small"
                className="table_header"
                sx={{ width: 'fit-content' }}
              >
                ID
              </TableCell> */}
              {/* <TableCell align="left" size="small" className="table_header" sx={{ width: '40%' }}>
                Full Name
              </TableCell>
              <TableCell align="left" size="small" className="table_header">
                Phone
              </TableCell>
              <TableCell align="center" size="small" className="table_header">
                Action
              </TableCell> */}
              {/* </TableRow> */}
            </TableHead>
            <TableBody>
              <TableRow
                // key={row.name}
                key="numan"
                className="tableRow"
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TableCell
                  align="left"
                  sx={{
                    display: 'flex',
                    width: '30%',
                    marginLeft: '19px',
                  }}
                  // onClick={() => navigate(`/staff/${row.id}`)}
                >
                  <AvatarComponent
                    // alt={`${row.first_name} ${row.last_name}`}
                    alt="Numan Zahid"
                    className="header_avatar"
                  />
                  {/* )} */}
                  <div className="name_cell_SearchScreen" style={{ marginLeft: '2%' }}>
                    {/* {`${row.first_name} ${row.last_name}`}  */}
                    Numan Zahid
                    <br />
                    <span className="staffEmailCell">
                      {/* {row.email} */}
                      numan@gmail.com
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  className="table_cells"
                  sx={{ width: '30%', marginLeft: '0px' }}
                  // onClick={() => navigate(`/staff/${row.id}`)}
                >
                  {/* {row.phone_number && PhoneFormat(row.phone_number)} */} +1 (999) 786-7545
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
                  <Edit className="table_icons" />
                  <Delete className="table_icons" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
