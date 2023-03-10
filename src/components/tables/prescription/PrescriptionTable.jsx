/* eslint-disable no-nested-ternary */
import { useState } from 'react';
// mui imports
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// assets import
import { ReactComponent as Action } from '../../../assets/components/Table/dots.svg';
import { ReactComponent as OpenArrow } from '../../../assets/components/Sidebar/openArrow.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { ReactComponent as Check } from '../../../assets/components/Table/check.svg';
import { ReactComponent as Uncheck } from '../../../assets/components/Table/uncheck.svg';
import { ReactComponent as Edit } from '../../../assets/icons/editIcon.svg';
import { ReactComponent as Tick } from '../../../assets/components/Table/tick.svg';

// child import
import AvatarComponent from '../../Avatar';
import EditPrescription from '../../popups/prescription/EditPrescription';

export default function PrescriptionTable() {
  const [isOpen, setIsOpen] = useState({});
  const [openPrescriptionMenu, setOpenPrescriptionMenu] = useState(false);
  const [openEditPrescription, setOpenEditPrescription] = useState(false);

  const toggleOpen = (category) => {
    setIsOpen({
      ...isOpen,
      [category]: !isOpen[category],
    });
  };

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

  function createPrescription(name, exercise, date) {
    return { name, exercise, date };
  }

  function createData(date, score, performance, survey, pain, status) {
    return { date, score, performance, survey, pain, status };
  }

  const prescription = [
    createPrescription(
      'Prescription Name 1',
      ['Supine Bridge', 'Cat and Camel', 'Bird and Dog'],
      '1 / 05 / 2022',
    ),
  ];

  const subPrescription = [
    createData('01 / 05 / 2022', 9, 55, 'Done', 97, 'check'),
    createData('06 / 05 / 2022', 2, 11, 'Not Done', 55, 'uncheck'),
    createData('21 / 05 / 2022', 5, 97, 'Done', 16, 'check'),
  ];

  return (
    <div id="prescriptionTable">
      <h3 className="prescription_header">Prescription List</h3>
      {prescription.map((mainRow, index) => (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '20px',
            maxHeight: '84%',
            overflowX: 'hidden',
            width: '76vw',
            margin: 'auto',
            marginBottom: '25px',
            '@media (max-width: 1535px)': {
              width: '73vw',
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  size="small"
                  className="prescription_head"
                  sx={{ paddingTop: '20px' }}
                >
                  {mainRow.name}
                </TableCell>
                <TableCell
                  align="left"
                  size="small"
                  className="table_header"
                  sx={{ paddingTop: '20px' }}
                >
                  <div className="exerciseItems">
                    <p>Exercise</p>

                    {mainRow.exercise.map((ex) => (
                      <li>{ex}</li>
                    ))}
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  size="small"
                  className="table_header"
                  style={{ width: '14%' }}
                >
                  <div>
                    <p>Duration</p>
                    <p className="prescription_head"> 2 week</p>
                  </div>
                </TableCell>
                <TableCell align="left" size="small" className="table_header">
                  <div>
                    <p>Frequency</p>
                    <p className="prescription_head"> 2 Time</p>
                  </div>
                </TableCell>
                <TableCell align="left" size="small" className="table_header">
                  <div>
                    <p>Assign by</p>
                    <div style={{ display: 'flex', marginTop: '7px', alignItems: 'center' }}>
                      <AvatarComponent alt="Dr Arooj" className="header_avatar" />
                      <div className="prescription_cell">
                        Dr Arooj <br />
                        <span className="presSubtxt">Muscular dystrophy</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left" size="small" className="table_header">
                  <div>
                    <p>Date</p>
                    <p className="prescription_head"> 11/05/2022</p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Action
                    className="pointer"
                    onClick={() => setOpenPrescriptionMenu(!openPrescriptionMenu)}
                  />
                  {openPrescriptionMenu ? (
                    <div className="prescriptionMenu">
                      <div
                        className="editMenuItem"
                        role="presentation"
                        onClick={() => {
                          setOpenEditPrescription(true);
                          setOpenPrescriptionMenu(false);
                        }}
                      >
                        <Edit
                          className="pIcon"
                          style={{
                            filter:
                              'brightness(0) saturate(100%) invert(66%) sepia(69%) saturate(1538%) hue-rotate(344deg) brightness(107%) contrast(97%)',
                          }}
                        />{' '}
                        <p>Edit Prescription</p>
                      </div>
                      <div
                        className="menuItem"
                        role="presentation"
                        onClick={() => {
                          setOpenPrescriptionMenu(false);
                        }}
                      >
                        <Tick className="pIcon" />
                        <p>Mark as Completeted</p>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left" />
                <TableCell align="right">
                  {' '}
                  {isOpen[index] ? (
                    <OpenArrow
                      onClick={() => {
                        toggleOpen(index);
                      }}
                      style={{
                        cursor: 'pointer',
                      }}
                    />
                  ) : (
                    <OpenArrow
                      onClick={() => {
                        toggleOpen(index);
                      }}
                      style={{
                        transform: 'rotateX(180deg)',
                        cursor: 'pointer',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="left" />
                <TableCell align="left" />
                <TableCell align="left" />
              </TableRow>
            </TableHead>
            {isOpen[index] && (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" size="small" className="table_header">
                      Date
                    </TableCell>
                    <TableCell align="left" size="small" className="table_header">
                      Score
                    </TableCell>
                    <TableCell align="left" size="small" className="table_header">
                      Avg.Performance
                    </TableCell>
                    <TableCell align="center" size="small" className="table_header">
                      Survey
                    </TableCell>
                    <TableCell align="center" size="small" className="table_header">
                      Messages
                    </TableCell>
                    <TableCell align="center" size="small" className="table_header">
                      Pain Scale
                    </TableCell>
                    <TableCell align="center" size="small" className="table_header">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subPrescription.map((row) => (
                    <StyledTableRow className="tableRow">
                      <TableCell align="left">{row.date}</TableCell>

                      <TableCell align="left" className="table_cells">
                        <div
                          className={
                            row.score < 5
                              ? 'scoreRed'
                              : row.score <= 5 && row.score < 8
                              ? 'scoreYellow'
                              : 'scoreGreen'
                          }
                        >
                          {`${row.score}/10`}
                        </div>
                      </TableCell>
                      <TableCell align="center" className="table_cells">
                        <span className="linearPresProgress">{`${row.performance}%`}</span>
                        {row.performance <= 30 ? (
                          <RedLinearProgress
                            variant="determinate"
                            value={row.performance}
                            thickness="40"
                            sx={{ width: '80%' }}
                          />
                        ) : row.performance > 30 && row.performance <= 79 ? (
                          <YellowLinearProgress
                            variant="determinate"
                            value={row.performance}
                            thickness="40"
                            sx={{ width: '80%' }}
                          />
                        ) : (
                          <GreenLinearProgress
                            variant="determinate"
                            value={row.performance}
                            thickness="40"
                            sx={{ width: '80%' }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" className="table_cells">
                        {row.survey}
                      </TableCell>
                      <TableCell align="center" className="table_cells">
                        <Message />
                      </TableCell>

                      <TableCell align="center" sx={{ transform: 'rotate(270deg)' }}>
                        <div>
                          {row.pain <= 30 ? (
                            <CircularProgress
                              variant="determinate"
                              thickness="4.5"
                              value={row.pain}
                              size={45}
                              sx={{ color: '#FF5151' }}
                            />
                          ) : row.pain > 30 && row.pain <= 79 ? (
                            <CircularProgress
                              variant="determinate"
                              thickness="4.5"
                              value={row.pain}
                              size={45}
                              sx={{ color: '#FABB18' }}
                            />
                          ) : (
                            <CircularProgress
                              variant="determinate"
                              thickness="4.5"
                              value={row.pain}
                              size={45}
                              sx={{ color: '#25CC7C' }}
                            />
                          )}

                          <span className="circularProgressPrescription">{`${row.pain}%`}</span>
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        {row.status === 'check' ? <Check /> : <Uncheck />}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
          {openEditPrescription && (
            <EditPrescription
              openEditPrescription={openEditPrescription}
              setOpenEditPrescription={setOpenEditPrescription}
            />
          )}
        </TableContainer>
      ))}
    </div>
  );
}
