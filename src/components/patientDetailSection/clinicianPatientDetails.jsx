/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import { ReactComponent as VisibilityOff } from '../../assets/icons/eyess.svg';

import { ReactComponent as Edit } from '../../assets/components/Table/alert.svg';
import { ReactComponent as Report } from '../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../assets/components/Table/email.svg';
import { ReactComponent as OpenArrow } from '../../assets/components/Sidebar/openArrow.svg';
// import { ReactComponent as Profile } from '../../assets/components/Table/Profile.svg';
// import { ReactComponent as Delete } from '../../assets/components/Table/alert1.svg';
import PieChartComponent from '../charts/patient/PieChart.Component';
import { getMediaUrl } from '../../config';
import AvatarComponent from '../Avatar/Avatar.Component';

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

function ClinicianPatientDetails({
  row,
  setOpenEditPatient,
  setPatient,
  handleReportAndMsgCounter,
  patient,
  counter,
  handlePatientProfile,
  handleDeletePatient,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const fullName = `${row.first_name} ${row.last_name}`;
  return (
    <>
      <StyledTableRow
        key={row.id}
        className={
          // patient.id === row.id ? 'clrTableRow' :
          'tableRow'
        }
      >
        <TableCell align="left" onClick={() => handlePatientProfile(row.id)}>
          {row?.userData?.mrn_id.length > 4
            ? `${row?.userData?.mrn_id.slice(0, 4)}...`
            : row?.userData?.mrn_id}
        </TableCell>
        <TableCell align="left" onClick={() => handlePatientProfile(row.id)}>
          <div className="image_div">
            {row.profile_pic ? (
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
            <p className="clinic_cell">
              {fullName.length > 5
                ? `${fullName.slice(0, 5)}...`
                : `${row.first_name} ${row.last_name}`}
            </p>
          </div>
        </TableCell>
        <TableCell
          align="center"
          className="table_cells"
          onClick={() => handlePatientProfile(row.id)}
        >
          {row.userData?.diagnosis}
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
          {row.completion ? moment(row.completion).format('YYYY-MM-D') : '-'}
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
          onClick={() => handlePatientProfile(row.id)}
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
              <Report /> <p className="reportTxt">{counter?.report} Reports</p>
            </div>
          </TableCell>
          <TableCell sx={{ '@media (max-width: 1600px)': { width: '30%' } }}>
            <div className="notiCell">
              <Message />
              <p className="msgTxt">{counter?.unReadMsg} Messages</p>
            </div>
          </TableCell>
          <TableCell>{/* <div className="notiCell">{}</div> */}</TableCell>
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
            <VisibilityOff className="table_icons" onClick={() => handleDeletePatient(row)} />
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

export default ClinicianPatientDetails;
