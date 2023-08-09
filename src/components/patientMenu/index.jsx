import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import { ReactComponent as Edit } from '../../assets/components/Table/alert.svg';
import { ReactComponent as Report } from '../../assets/components/Table/report.svg';
import { ReactComponent as Message } from '../../assets/components/Table/email.svg';
import { ReactComponent as OpenArrow } from '../../assets/components/Sidebar/openArrow.svg';
import { ReactComponent as Profile } from '../../assets/components/Table/Profile.svg';
import { ReactComponent as Delete } from '../../assets/components/Table/alert1.svg';

function Index({
  counter,
  handleDeletePatient,
  handlePatientProfile,
  setEditPatient,
  row,
  patient,
  setOpenEditPatient,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Collapse in={openMenu} timeout="auto">
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
            <Delete id="delete" className="table_icons" onClick={() => handleDeletePatient(row)} />
            <Edit
              className="table_icons"
              onClick={() => {
                setOpenEditPatient(true);
                setEditPatient(row);
              }}
            />
            <Profile className="table_icons" onClick={() => handlePatientProfile(row.id)} />
          </TableCell>
        </TableRow>
      </Collapse>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 2, paddingTop: 2 }} align="center">
          {openMenu ? (
            <OpenArrow style={{ cursor: 'pointer' }} onClick={() => setOpenMenu(!openMenu)} />
          ) : (
            <OpenArrow
              onClick={() => setOpenMenu(!openMenu)}
              style={{
                transform: 'rotateX(180deg)',
                cursor: 'pointer',
              }}
            />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

export default Index;
