// mui imports
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

// assets
import { ReactComponent as MotionCapture } from '../../../assets/icons/motionCapture.svg';
import { ReactComponent as Program } from '../../../assets/icons/exProgram.svg';

export default function AddPrescriptionTable() {
  function createData(number, name, sets, reps, rest, action) {
    return { number, name, sets, reps, rest, action };
  }
  const data = [
    createData(1, 'Quad Stretch', 6, 8, 30, 'motionCapture'),
    createData(2, 'Quad Stretch', 6, 8, 30, 'motionCapture'),
    createData(2, 'Quad Stretch', 6, 8, 30, 'exerciseProgram'),
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '20px',
        background: '#F6FAFB',
        ml: 5,
        overflowX: 'hidden',
        // width: '58.7vw',
        // paddingLeft: 2,
        '@media (max-width: 1600px)': {
          width: '93%',
          ml: 4,
        },
      }}
    >
      <h1 className="PrescriptionTableHead">Exercise Prescription</h1>
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
            <TableCell align="left" className="table_head" id="prescriptionTableHead">
              #no
            </TableCell>
            <TableCell className="table_head" id="prescriptionTableHead" align="left">
              Name
            </TableCell>

            <TableCell />
            <TableCell />
            <TableCell />

            <TableCell className="table_head" id="prescriptionTableHead" align="center">
              Sets
            </TableCell>
            <TableCell className="table_head" id="prescriptionTableHead" align="center">
              Reps
            </TableCell>
            <TableCell className="table_head" id="prescriptionTableHead" align="center">
              Rest
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.first_name}>
              <TableCell align="center" className="prescription_table_cells">
                {`${row.number}.`}
              </TableCell>

              <TableCell align="center" className="table_cells">
                <div className="actionDiv">
                  {row.action === 'motionCapture' ? (
                    <MotionCapture className="actionIcon" />
                  ) : (
                    <Program className="actionIcon" />
                  )}
                  {row.name}
                </div>
              </TableCell>

              <TableCell />
              <TableCell />
              <TableCell />

              <TableCell align="center" className="prescription_table_cells">
                {row.sets}
              </TableCell>

              <TableCell align="center" className="prescription_table_cells">
                {' '}
                {row.reps}
              </TableCell>
              <TableCell align="center" className="prescription_table_cells">
                {' '}
                {`${row.rest}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
