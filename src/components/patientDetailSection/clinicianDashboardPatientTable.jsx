/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@mui/material/TableCell';
import moment from 'moment';
import { ReactComponent as VisibilityOff } from '../../assets/icons/eyess.svg';

import { ReactComponent as Edit } from '../../assets/components/Table/alert.svg';
// import { ReactComponent as Profile } from '../../assets/components/Table/Profile.svg';
import { ReactComponent as Report } from '../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../assets/components/Table/email.svg';
// import { ReactComponent as Delete } from '../../assets/components/Table/alert1.svg';
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
// const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 6,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: '#FF5151',
//   },
// }));
// const YellowLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 6,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: '#FABB18',
//   },
// }));
// const GreenLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 6,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: '#25CC7C',
//   },
// }));

function ClinicianDashboardPatientTable({
  row,
  patient,
  setPatient,
  handleReportAndMsgCounter,
  counter,
  handleDeletePatient,
  setOpenEditPatient,
  handlePatientProfile,
  checked,
  activateUser,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const percentageOfGraph = (targetRow) => {
    // eslint-disable-next-line no-unused-expressions
    if (targetRow?.performance > 0 && targetRow?.performance <= 10) {
      return '#FF5151';
    }
    if (targetRow?.performance > 10 && targetRow?.performance <= 30) {
      return '#C2623B';
    }
    if (targetRow?.performance > 30 && targetRow?.performance <= 40) {
      return '#D0A34D';
    }
    if (targetRow?.performance > 40 && targetRow?.performance <= 50) {
      return '#E7D270';
    }
    if (targetRow?.performance > 50 && targetRow?.performance <= 55) {
      return '#F0E570';
    }
    if (targetRow?.performance > 55 && targetRow?.performance <= 65) {
      return '#E0EE66';
    }
    if (targetRow?.performance > 65 && targetRow?.performance <= 70) {
      return '#CAE662';
    }
    if (targetRow?.performance > 70 && targetRow?.performance <= 75) {
      return '#A9D55D';
    }
    if (targetRow?.performance > 75 && targetRow?.performance <= 80) {
      return '#AED05D';
    }
    if (targetRow?.performance > 80 && targetRow?.performance <= 85) {
      return '#97C755';
    }
    if (targetRow?.performance > 85 && targetRow?.performance <= 90) {
      return '#7EB252';
    }
    if (targetRow?.performance > 90 && targetRow?.performance <= 95) {
      return '#7EB45A';
    }
    return '#669851';
  };
  return (
    <>
      <StyledTableRow key={row.id} className="tableRow">
        <TableCell align="left" onClick={() => handlePatientProfile(row.id)}>
          {row?.userData?.mrn_id}
        </TableCell>
        <TableCell align="left" onClick={() => handlePatientProfile(row.id)}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {row?.profile_pic ? (
              <div className="imgDivClinic">
                <img
                  src={getMediaUrl(row?.profile_pic)}
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
                alt={`${row?.first_name} ${row?.last_name}`}
                className="header_avatar"
              />
            )}
            <div className="patient_cell">{`${row.first_name} ${row.last_name}`}</div>
          </div>
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
          {row.completion ? moment(row.completion).format('MM/DD/YYYY') : '-'}
        </TableCell>
        <TableCell align="center" onClick={() => handlePatientProfile(row.id)}>
          {/* <span className="linearProgress">{`${row?.performance ?? 0}%`}</span>
          {row.performance <= 30 ? (
            <RedLinearProgress variant="determinate" value={row.performance} thickness="40" />
          ) : row.performance > 30 && row.performance <= 79 ? (
            <YellowLinearProgress variant="determinate" value={row.performance} thickness="40" />
          ) : (
            <GreenLinearProgress variant="determinate" value={row.performance} thickness="40" />
          )} */}
          <div style={{ position: 'relative' }}>
            <CircularProgress
              variant="determinate"
              thickness="6"
              value={row?.performance || 0}
              size={70}
              sx={{
                color: percentageOfGraph(row),
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '42%',
                bottom: '42%',
                fontSize: '15px',
              }}
            >
              {row?.userData?.performance ? Math.round(row?.userData?.performance) : 0}%
            </div>
          </div>
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
            {checked ? (
              <>
                <VisibilityOff
                  // style={{ color: '#FAA017' }}
                  className="table_icons"
                  onClick={() => handleDeletePatient(row)}
                />
                <Edit
                  className="table_icons"
                  onClick={() => {
                    setOpenEditPatient(true);
                    setPatient(row);
                  }}
                />
              </>
            ) : (
              <button type="button" onClick={() => activateUser(row.id)} className="action_btn">
                Activate
              </button>
            )}

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
