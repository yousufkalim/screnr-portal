/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
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
import moment from 'moment';

import { useNavigate } from 'react-router-dom';

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
import request from '../../../api/index';

export default function PrescriptionTable({ patientId, selectedClinicianId }) {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [openPrescriptionMenu, setOpenPrescriptionMenu] = useState(false);
  const [openEditPrescription, setOpenEditPrescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState({});

  const handleSelectedPrescription = (targetPrescription) => {
    setSelectedPrescription(targetPrescription);
  };

  const handlePrescriptionList = async () => {
    setLoading(true);
    await request(
      'get',
      `/admins/prescriptions/getPrescriptionByPatientIdAndClinicianId/${patientId}/${selectedClinicianId}`,
    )
      .then((res) => {
        setLoading(false);
        console.log('🚀 ~ file: PrescriptionTable.jsx:47 ~ .then ~ res:', res);
        setPrescriptionList(res?.data?.prescriptions);
      })
      .catch((err) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error(`handlePrescriptionList---> ${err}`);
      });
  };
  const navigate = useNavigate();
  const handleSearchLogoClick = () => {
    navigate('/staff/clinicAdmin/Clinician/Patient/Prescription/Session');
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
                    sx={{ paddingTop: '20px' }}
                  >
                    {mainRow?.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    size="small"
                    className="table_header"
                    sx={{ paddingTop: '20px' }}
                  >
                    <div className="exerciseItems">
                      <p>Exercise</p>

                      {mainRow?.sessions?.map((session) =>
                        session?.exercises?.map((item) => {
                          return <li key={item?.name}>{item?.name}</li>;
                        }),
                      )}
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
                          Dr {mainRow?.clinician?.first_name} {mainRow?.clinician?.last_name}
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
                            handleSelectedPrescription(mainRow);
                          }}
                        >
                          <Edit
                            className="pIcon"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(66%) sepia(69%) saturate(1538%) hue-rotate(344deg) brightness(107%) contrast(97%)',
                            }}
                          />
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
                    {mainRow?.sessions?.map((row, index2) => (
                      <StyledTableRow
                        className="tableRow"
                        key={row?.id}
                        onClick={handleSearchLogoClick}
                      >
                        <TableCell align="left">{moment(row?.date).format('DD/MM/YYYY')}</TableCell>
                        <TableCell align="left" className="table_cells">
                          <div
                            className={
                              index2 < 5
                                ? 'scoreRed'
                                : index2 <= 5 && index2 < 8
                                ? 'scoreYellow'
                                : 'scoreGreen'
                            }
                          >
                            {`${index2}/10`}
                          </div>
                        </TableCell>
                        <TableCell align="center" className="table_cells">
                          <span className="linearPresProgress">{`${index2}%`}</span>
                          {index2 <= 30 ? (
                            <RedLinearProgress
                              variant="determinate"
                              value={index2}
                              thickness="40"
                              sx={{ width: '80%' }}
                            />
                          ) : index2 > 30 && index2 <= 79 ? (
                            <YellowLinearProgress
                              variant="determinate"
                              value={index2}
                              thickness="40"
                              sx={{ width: '80%' }}
                            />
                          ) : (
                            <GreenLinearProgress
                              variant="determinate"
                              value={index2}
                              thickness="40"
                              sx={{ width: '80%' }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center" className="table_cells">
                          Done
                        </TableCell>
                        <TableCell align="center" className="table_cells">
                          <Message />
                        </TableCell>
                        <TableCell align="center" sx={{ transform: 'rotate(270deg)' }}>
                          <div>
                            {index2 <= 30 ? (
                              <CircularProgress
                                variant="determinate"
                                thickness="4.5"
                                value={index2}
                                size={45}
                                sx={{ color: '#FF5151' }}
                              />
                            ) : index2 > 30 && index2 <= 79 ? (
                              <CircularProgress
                                variant="determinate"
                                thickness="4.5"
                                value={index2}
                                size={45}
                                sx={{ color: '#FABB18' }}
                              />
                            ) : (
                              <CircularProgress
                                variant="determinate"
                                thickness="4.5"
                                value={index2}
                                size={45}
                                sx={{ color: '#25CC7C' }}
                              />
                            )}
                            <span className="circularProgressPrescription">{`${index2}%`}</span>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {row.status === 'pending' ? <Check /> : <Uncheck />}
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
                selectedPrescription={selectedPrescription}
                handlePrescriptionList={handlePrescriptionList}
              />
            )}
          </TableContainer>
        ))
      ) : (
        <h1
          style={{
            textAlign: 'center',
            fontWeight: '300',
            color: '#919B9B',
          }}
        >
          No Prescription From This Clinician
        </h1>
      )}
    </div>
  );
}
