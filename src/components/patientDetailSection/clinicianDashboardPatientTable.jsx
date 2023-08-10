/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import TableCell from '@mui/material/TableCell';
import { ReactComponent as Edit } from '../../assets/components/Table/alert.svg';
// import { ReactComponent as Profile } from '../../assets/components/Table/Profile.svg';
import { ReactComponent as Report } from '../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../assets/components/Table/email.svg';
import { ReactComponent as Delete } from '../../assets/components/Table/alert1.svg';
import { ReactComponent as OpenArrow } from '../../assets/components/Sidebar/openArrow.svg';
import { getMediaUrl } from '../../config';
import AvatarComponent from '../Avatar/Avatar.Component';
import PieChartComponent from '../charts/patient/PieChart.Component';

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

function ClinicianDashboardPatientTable({
  row,
  patient,
  setPatient,
  handleReportAndMsgCounter,
  counter,
  handleDeletePatient,
  setOpenEditPatient,
  handlePatientProfile,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <StyledTableRow
        key={row.id}
        className={
          // patient.id === row.id ? 'clrTableRow' :
          'tableRow'
        }
        // onClick={() => {
        //   setPatient(row);
        //   handleReportAndMsgCounter(row?.id);
        // }}
      >
        <TableCell align="left" onClick={() => handlePatientProfile(row.id)}>
          {' '}
          {row?.userData?.mrn_id}{' '}
        </TableCell>
        <TableCell align="left" onClick={() => handlePatientProfile(row.id)}>
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
            <div style={{ display: 'flex' }}>
              <AvatarComponent
                alt={`${row.first_name} ${row.last_name}`}
                className="header_avatar"
              />
              <div className="clinic_cell">{`${row.first_name} ${row.last_name}`}</div>
            </div>
          )}
        </TableCell>
        <TableCell
          align="center"
          className="table_cells"
          onClick={() => handlePatientProfile(row.id)}
        >
          {row?.userData?.diagnosis}
        </TableCell>
        <TableCell
          align="center"
          className="table_cells"
          onClick={() => handlePatientProfile(row.id)}
        >
          {row?.prescription}
        </TableCell>
        <TableCell
          align="center"
          className="table_cells"
          id="completion_cell"
          sx={{
            padding: '3%',
          }}
          onClick={() => handlePatientProfile(row.id)}
        >
          {Math.round(row.completion) ?? '-'}%
        </TableCell>
        <TableCell align="center" onClick={() => handlePatientProfile(row.id)}>
          <span className="linearProgress">{`${row?.performance ?? 0}%`}</span>
          {row.performance <= 30 ? (
            <RedLinearProgress variant="determinate" value={row.performance} thickness="40" />
          ) : row.performance > 30 && row.performance <= 79 ? (
            <YellowLinearProgress variant="determinate" value={row.performance} thickness="40" />
          ) : (
            <GreenLinearProgress variant="determinate" value={row.performance} thickness="40" />
          )}
        </TableCell>
        <TableCell
          align="center"
          // sx={{
          //   padding: '22px',
          //   paddingRight: '20px',
          //   display: 'flex',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   width: '100px',
          //   marginLeft: '40px',
          //   '@media (max-width: 1500px)': { marginTop: '22px' },
          // }}
        >
          <div className="circularBarCellAllPatients">
            {row?.pain?.before > 0 && row?.pain?.after > 0 ? (
              <PieChartComponent before={row?.pain?.before} after={row?.pain?.after} />
            ) : (
              'N/A'
            )}
          </div>
        </TableCell>
        <TableCell style={{ cursor: 'default' }}>
          {openMenu ? (
            <OpenArrow
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenMenu(!openMenu);
                setPatient(row);
                // handleReportAndMsgCounter(row?.id);
              }}
            />
          ) : (
            <OpenArrow
              onClick={() => {
                setOpenMenu(!openMenu);
                setPatient(row);
                handleReportAndMsgCounter(row?.id);
              }}
              style={{
                transform: 'rotateX(180deg)',
                cursor: 'pointer',
              }}
            />
          )}
        </TableCell>
      </StyledTableRow>
      {openMenu && patient?.id === row?.id ? (
        <TableRow
          className={
            // patient.id === row.id ? 'clrTableRow' :
            'tableRow'
          }
        >
          <TableCell width="2%" />
          <TableCell>
            <div className="notiCell">
              <Report />
              <p className="reportTxt">{counter?.report} Reports</p>
            </div>
          </TableCell>
          <TableCell sx={{ '@media (max-width: 1600px)': { width: '30%' } }}>
            <div className="notiCell">
              <Message />
              <p className="msgTxt">{counter?.unReadMsg} Messages</p>
            </div>
          </TableCell>
          <TableCell>
            <div className="notiCell">{}</div>
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Delete className="table_icons" onClick={() => handleDeletePatient(row)} />
            <Edit
              className="table_icons"
              onClick={() => {
                setOpenEditPatient(true);
                setPatient(row);
              }}
            />

            {/* <Profile className="table_icons" onClick={() => handlePatientProfile(row.id)} /> */}
          </TableCell>
          <TableCell />
        </TableRow>
      ) : (
        ''
      )}
    </>
  );
}

export default ClinicianDashboardPatientTable;
