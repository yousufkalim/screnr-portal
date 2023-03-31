import { React, useState } from 'react';

// mui imports
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ActivityTable() {
  const [page, setPage] = useState(0);

  function createCardData(description, date, type, time, timeSpent) {
    return { description, date, type, time, timeSpent };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const activity = [
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGIN',
      '10:08:13 GMT',
      '6 hours',
    ),
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGOUT',
      '10:08:13 GMT',
      '6 hours',
    ),
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGIN',
      '10:08:13 GMT',
      '6 hours',
    ),
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGOUT',
      '10:08:13 GMT',
      '6 hours',
    ),
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGIN',
      '10:08:13 GMT',
      '6 hours',
    ),
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGIN',
      '10:08:13 GMT',
      '6 hours',
    ),
    createCardData(
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      '11/05/2022',
      'USER LOGIN',
      '10:08:13 GMT',
      '6 hours',
    ),
  ];
  return (
    <div className="activityTable">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          maxHeight: '84%',
          overflowX: 'hidden',
          boxShadow: '0',
          width: '58.7vw',
          paddingLeft: 2,
          '@media (max-width: 1600px)': {
            maxHeight: '85.6%',
            width: '54.7vw',
          },
        }}
      >
        <h1 className="clientTableHead">Activity Log</h1>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
            padding: '20px',
            paddingBottom: '5%',
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" className="table_head">
                Description
              </TableCell>
              <TableCell className="table_head" align="center">
                Date
              </TableCell>
              <TableCell className="table_head" align="center">
                Type
              </TableCell>
              <TableCell className="table_head" align="center">
                Time
              </TableCell>
              <TableCell className="table_head" align="center">
                Spending Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activity.slice(page * 4, page * 4 + 4).map((row) => (
              <StyledTableRow key={row.first_name}>
                <TableCell
                  align="left"
                  className="table_cells"
                  sx={{
                    display: 'flex',
                    paddingTop: '6%',
                    paddingBottom: '6%',
                    fontWeight: '500!important',
                  }}
                >
                  {row.description}
                </TableCell>

                <TableCell align="center" className="table_cells">
                  {row.date}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {row.type}
                </TableCell>

                <TableCell align="center" className="table_cells">
                  {' '}
                  {row.time}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {' '}
                  {row.timeSpent}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ color: '#919B9B' }}
        component="div"
        rowsPerPageOptions={[]}
        count={activity.length}
        rowsPerPage={4}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
