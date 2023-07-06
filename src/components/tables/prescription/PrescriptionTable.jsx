/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
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
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as Action } from '../../../assets/components/Table/dots.svg';
import { ReactComponent as OpenArrow } from '../../../assets/components/Sidebar/openArrow.svg';
import { ReactComponent as Message } from '../../../assets/components/Table/email.svg';
import { ReactComponent as Complete } from '../../../assets/components/Table/check.svg';
import { ReactComponent as Pending } from '../../../assets/components/Table/uncheck.svg';
import { ReactComponent as Error } from '../../../assets/components/Table/Error.svg';
import { ReactComponent as Inprogress } from '../../../assets/components/Table/inprogress.svg';
import { ReactComponent as Incomplete } from '../../../assets/components/Table/Incomplete.svg';
import { ReactComponent as Edit } from '../../../assets/icons/editIcon.svg';
import { ReactComponent as Tick } from '../../../assets/components/Table/markTick.svg';
import AvatarComponent from '../../Avatar/Avatar.Component';
import EditPrescription from '../../popups/prescription/EditPrescription.Popup';
import request from '../../../request';

export default function PrescriptionTable({ patientId, selectedClinicianId }) {
  const navigate = useNavigate();
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [openPrescriptionMenu, setOpenPrescriptionMenu] = useState(false);
  const [openEditPrescription, setOpenEditPrescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, item) => {
    setOpenPrescriptionMenu(!openPrescriptionMenu);
    setSelectedPrescription(item);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSelectedPrescription({});
    setAnchorEl(null);
    setOpenPrescriptionMenu(false);
  };
  const handleCloseEdit = () => {
    setAnchorEl(null);
    setOpenEditPrescription(true);
    setOpenPrescriptionMenu(false);
  };
  const handleCloseCompleted = async (prescriptionId) => {
    await request('put', `/clinicians/prescriptions/completePrescription/${prescriptionId}`);
    setAnchorEl(null);
    setOpenPrescriptionMenu(false);
  };
  const handlePrescriptionList = async () => {
    setLoading(true);
    await request(
      'get',
      `/clinicians/prescriptions/getPrescriptionListByPatientIdAndClinicianId/${patientId}/${selectedClinicianId}`,
    )
      .then((res) => {
        setLoading(false);
        setPrescriptionList(res?.data?.prescriptions);
      })
      .catch((err) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error(`handlePrescriptionList---> ${err}`);
      });
  };
  const handleSearchLogoClick = (sessionId) => {
    navigate(`/patients/${sessionId}/exercise/exerciseDetails`);
  };
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

  useEffect(() => {
    handlePrescriptionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, selectedClinicianId]);

  const sessionStatus = {
    pending: <Pending />,
    'in-progress': <Inprogress />,
    completed: <Complete />,
    errored: <Error />,
    unchecked: <Incomplete />,
  };
  return (
    <div id="prescriptionTable">
      <h3 className="prescription_header">Prescription List</h3>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#136773' }} />
        </div>
      ) : prescriptionList && prescriptionList.length > 0 ? (
        prescriptionList?.map((mainRow, index) => (
          <TableContainer
            key={mainRow?.id}
            component={Paper}
            sx={{
              borderRadius: '20px',
              maxHeight: '84%',
              overflowX: 'hidden',
              width: '76vw',
              boxShadow: '0',
              margin: 'auto',
              marginBottom: '25px',
              '@media only screen and (max-width: 1400px)': {
                maxWidth: '73vw',
                overflowX: 'auto',
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
                    align="center"
                    size="small"
                    className="prescription_head"
                    sx={{
                      paddingTop: '20px',
                      minWidth: '8rem',
                      maxWidth: '8rem',
                      textTransform: 'capitalize',
                    }}
                  >
                    {mainRow?.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    size="small"
                    className="table_header"
                    sx={{
                      paddingTop: '20px',
                      minWidth: '8rem',
                      maxWidth: '8rem',
                      textAlign: 'center',
                    }}
                  >
                    <div className="exerciseItems">
                      <p>Exercise</p>
                      {mainRow?.sessions[0].exercises?.map((item) => {
                        return <li key={item?.name}>{item?.name}</li>;
                      })}
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
                      <p className="prescription_head">{mainRow?.duration} week</p>
                    </div>
                  </TableCell>
                  <TableCell align="left" size="small" className="table_header">
                    <div>
                      <p>Frequency</p>
                      <p className="prescription_head">{mainRow?.frequency} Time</p>
                    </div>
                  </TableCell>
                  <TableCell align="left" size="small" className="table_header">
                    <div>
                      <p>Assign by</p>
                      <div style={{ display: 'flex', marginTop: '7px', alignItems: 'center' }}>
                        <AvatarComponent
                          alt={`${mainRow?.clinician?.first_name} ${mainRow?.clinician?.last_name}`}
                          className="header_avatar"
                        />
                        <div className="prescription_cell">
                          {mainRow?.clinician?.first_name} {mainRow?.clinician?.last_name}
                          <br />
                          <span className="presSubtxt">{mainRow?.clinician?.role}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left" size="small" className="table_header">
                    <div>
                      <p>Date</p>
                      <p className="prescription_head">
                        {moment(mainRow?.start_date).format('DD/MM/YYYY')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div>
                      <Action
                        className="pointer"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => handleClick(e, mainRow)}
                      />
                      {openPrescriptionMenu ? (
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                          PaperProps={{
                            style: {
                              backgroundColor: '#F6FAFB',
                              boxShadow: '1',
                              border: '1px ',
                              borderColor: 'black',
                              borderRadius: '15px',
                            },
                          }}
                        >
                          <MenuItem
                            className="editMenuItem"
                            role="presentation"
                            onClick={() => {
                              handleCloseEdit();
                            }}
                          >
                            <Edit
                              className="pIcon"
                              style={{
                                filter:
                                  'brightness(0) saturate(100%) invert(66%) sepia(69%) saturate(1538%) hue-rotate(344deg) brightness(107%) contrast(97%)',
                              }}
                            />
                            <p className="actionMenus">Edit Prescription</p>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleCloseCompleted(mainRow?.id);
                            }}
                            // disabled={
                            //   !mainRow?.sessions?.some((item) => item.status === 'completed')
                            // }
                          >
                            <Tick className="pIcon" />
                            <p className="actionMenus">Mark as Completed</p>
                          </MenuItem>
                        </Menu>
                      ) : (
                        ''
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left" />
                  <TableCell align="left" />
                  <TableCell align="center">
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
                    {mainRow?.sessions?.map((row) => (
                      <StyledTableRow
                        className="tableRow"
                        key={row?.id}
                        onClick={() => handleSearchLogoClick(row?.id)}
                      >
                        <TableCell align="left">{moment(row?.date).format('DD/MM/YYYY')}</TableCell>
                        <TableCell align="left" className="table_cells">
                          <div
                            className={
                              0 < 5 ? 'scoreRed' : 0 <= 5 && 0 < 8 ? 'scoreYellow' : 'scoreGreen'
                            }
                          >
                            {`${0}/10`}
                          </div>
                        </TableCell>
                        <TableCell align="center" className="table_cells">
                          <span className="linearPresProgress">{`${0}%`}</span>
                          {0 <= 30 ? (
                            <RedLinearProgress
                              variant="determinate"
                              value={0}
                              thickness="40"
                              sx={{ width: '80%' }}
                            />
                          ) : 0 > 30 && 0 <= 79 ? (
                            <YellowLinearProgress
                              variant="determinate"
                              value={0}
                              thickness="40"
                              sx={{ width: '80%' }}
                            />
                          ) : (
                            <GreenLinearProgress
                              variant="determinate"
                              value={0}
                              thickness="40"
                              sx={{ width: '80%' }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center" className="table_cells">
                          {row?.survey ? 'Done' : 'Not Done'}
                        </TableCell>
                        <TableCell align="center" className="table_cells">
                          <Message />
                        </TableCell>
                        <TableCell align="center" sx={{ transform: 'rotate(270deg)' }}>
                          <div>
                            {0 <= 30 ? (
                              <CircularProgress
                                variant="determinate"
                                thickness="4.5"
                                value={0}
                                size={45}
                                sx={{ color: '#FF5151' }}
                              />
                            ) : 0 > 30 && 0 <= 79 ? (
                              <CircularProgress
                                variant="determinate"
                                thickness="4.5"
                                value={0}
                                size={45}
                                sx={{ color: '#FABB18' }}
                              />
                            ) : (
                              <CircularProgress
                                variant="determinate"
                                thickness="4.5"
                                value={0}
                                size={45}
                                sx={{ color: '#25CC7C' }}
                              />
                            )}
                            <span className="circularProgressPrescription">{`${0}%`}</span>
                          </div>
                        </TableCell>
                        <TableCell align="center">{sessionStatus[row.status]}</TableCell>
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
                selectedPrescription={selectedPrescription}
                handlePrescriptionList={handlePrescriptionList}
              />
            )}
          </TableContainer>
        ))
      ) : (
        <h1 className="NoPrescriptionTxt">No Prescription From This Clinician</h1>
      )}
    </div>
  );
}
