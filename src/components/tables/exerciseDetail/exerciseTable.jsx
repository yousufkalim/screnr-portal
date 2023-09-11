/* eslint-disable no-nested-ternary */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Tick from '../../../assets/icons/tick.png';
import Cross from '../../../assets/icons/cancell.png';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F6F6',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

function ExerciseTable({ loading, feedback }) {
  return (
    <div
      style={{
        marginTop: '5vh',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          boxShadow: '0',
          maxHeight: '95%',
          overflowX: 'hidden',
          width: '74vw',
        }}
      >
        <div className="allTableHead">
          <h1 className="clientTableHead">Exercise details</h1>
        </div>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
            paddingBottom: '5%',
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ height: '20px' }}>
              {/* <TableCell
                align="left"
                sx={{ width: '20%', paddingLeft: '2.5%' }}
                className="table_head"
              >
                Body Part Name
              </TableCell> */}
              <TableCell
                className="table_head"
                align="left"
                sx={{ width: '20%', paddingLeft: '2.5%' }}
              >
                Performance Check
              </TableCell>
              <TableCell className="table_head" align="center">
                Results
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
                </TableCell>
              </TableRow>
            ) : feedback ? (
              Object?.values(feedback)?.length > 0 ? (
                Object?.values(feedback)?.map((item) => (
                  <StyledTableRow key={item} className="tableRow">
                    {/* <TableCell
                      align="left"
                      sx={{ display: 'flex', paddingTop: '12%', paddingLeft: '12%' }}
                    >
                      {item?.name.replace(/[0-9_]+/g, ' ').trim()}
                    </TableCell> */}
                    <TableCell
                      align="left"
                      className="table_cells"
                      sx={{ paddingLeft: '2.2%', whiteSpace: 'pre' }}
                    >
                      {item?.movement ? item?.movement : 'N/A'}
                    </TableCell>
                    <TableCell align="center" className="table_cells">
                      {item?.failed_rule ? (
                        <img
                          src={Cross}
                          alt=""
                          style={{
                            width: '1.5rem',
                          }}
                        />
                      ) : (
                        <img
                          src={Tick}
                          alt=""
                          style={{
                            width: '1.5rem',
                          }}
                        />
                      )}
                    </TableCell>
                  </StyledTableRow>
                ))
              ) : (
                <>
                  <TableCell align="center" />
                  <TableCell align="left" className="noDataTxt">
                    No feedback found
                  </TableCell>
                </>
              )
            ) : (
              <>
                <TableCell align="center" />
                <TableCell align="left" className="noDataTxt">
                  No feedback found
                </TableCell>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExerciseTable;
