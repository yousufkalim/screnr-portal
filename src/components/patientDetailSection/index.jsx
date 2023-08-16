/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { ReactComponent as VisibilityOff } from '../../assets/icons/eyess.svg';
import { ReactComponent as Edit } from '../../assets/components/Table/alert.svg';
import { ReactComponent as Report } from '../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../assets/components/Table/email.svg';
import { ReactComponent as OpenArrow } from '../../assets/components/Sidebar/openArrow.svg';
// import { ReactComponent as Delete } from '../../assets/components/Table/alert1.svg';
import PieChartComponent from '../charts/patient/PieChart.Component';
import { getMediaUrl } from '../../config';
import AvatarComponent from '../Avatar/Avatar.Component';
import request from '../../request/index';

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

function Index({
  row,
  // patient,
  setPatient,
  handleDeletePatient,
  handlePatientProfile,
  setOpenEditPatient,
  setEditPatient,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [counter, setCounter] = useState({
    report: '',
    unReadMsg: '',
  });

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
  const handleArrowClicked = () => {
    if (!openMenu) {
      setOpenMenu(!openMenu);
      setPatient(row);
      handleReportAndMsgCounter(row?.id);
    } else {
      setOpenMenu(!openMenu);
    }
  };

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
      <StyledTableRow
        key={row?.id}
        className={
          // patient.id === row.id ? 'clrTableRow' :
          'tableRow'
        }
      >
        <TableCell
          align="left"
          onClick={() => handlePatientProfile(row.id)}
          style={{ cursor: 'pointer' }}
        >
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
                alt={`${row.first_name} ${row.last_name}`}
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
          {row?.prescription ?? 'N/A'}
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
          {/* <span className="linearProgress">{`${row?.performance ?? 0}%`}</span> */}
          {/* {row.performance <= 30 ? (
            <RedLinearProgress variant="determinate" value={row.performance} thickness="40" />
          ) : row.performance > 30 && row.performance <= 79 ? (
            <YellowLinearProgress variant="determinate" value={row.performance} thickness="40" />
          ) : (
            <GreenLinearProgress
              variant="determinate"
              value={row.performance ?? 0}
              thickness="40"
            />
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
              {row?.performance ? Math.round(row?.performance) : 0}%
            </div>
          </div>
        </TableCell>
        <TableCell align="center" onClick={() => handlePatientProfile(row.id)}>
          <div className="circularBarCellAllPatients" style={{ alignItems: 'center' }}>
            {row?.pain?.before > 0 && row?.pain?.after > 0 ? (
              <PieChartComponent before={row?.pain?.before} after={row?.pain?.after} />
            ) : (
              'N/A'
            )}
          </div>
        </TableCell>
        <TableCell style={{ cursor: 'default' }}>
          <OpenArrow
            onClick={() => {
              handleArrowClicked();
            }}
            style={{
              transform: !openMenu ? 'rotateX(180deg)' : '',
              cursor: 'pointer',
            }}
          />
        </TableCell>
      </StyledTableRow>
      {openMenu ? (
        <TableRow className="tableRow">
          <TableCell />
          <TableCell sx={{ width: '15%' }}>
            <div className="notiCell">
              <Report /> <p className="reportTxt">{counter?.report} Reports</p>
            </div>
          </TableCell>
          <TableCell sx={{ width: '15%' }}>
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
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <VisibilityOff className="table_icons" onClick={() => handleDeletePatient(row)} />
            <Edit
              className="table_icons"
              onClick={() => {
                setOpenEditPatient(true);
                setEditPatient(row);
              }}
            />
          </TableCell>
          <TableCell />
          {/* <TableCell>
          <Profile
            className="table_icons"
            onClick={() => handlePatientProfile(row.id)}
          />
        </TableCell> */}
        </TableRow>
      ) : (
        ''
      )}
    </>
  );
}

export default Index;
