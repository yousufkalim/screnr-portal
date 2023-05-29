import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment';

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function ActivityTable({ activityLog }) {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
            {activityLog?.slice(page * 4, page * 4 + 4).map((row) => (
              <StyledTableRow key={row.id}>
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
                  {row?.description}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {moment(row?.time).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {row?.type}
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {moment(row?.time).format('hh:mm:ss')} GMT
                </TableCell>
                <TableCell align="center" className="table_cells">
                  {row?.time_spent}
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
        count={activityLog?.length}
        rowsPerPage={4}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
