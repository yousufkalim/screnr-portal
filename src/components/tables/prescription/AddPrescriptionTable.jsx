import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { ReactComponent as MotionCapture } from '../../../assets/icons/motionCapture.svg';
import { ReactComponent as Program } from '../../../assets/icons/exProgram.svg';

export default function AddPrescriptionTable({ ExercisePrescriptionList }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '20px',
        background: '#F6FAFB',
        boxShadow: '0',
        ml: 5,
        maxHeight: '81%',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '93%',
        // width: '58.7vw',
        // paddingLeft: 2,
        '@media (max-width: 1600px)': {
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
          {ExercisePrescriptionList?.exercises?.map((row, index) => (
            <TableRow key={row.first_name}>
              <TableCell align="center" className="prescription_table_cells">
                {`${index + 1}.`}
              </TableCell>
              <TableCell align="center" className="table_cells">
                <div className="actionDiv">
                  {row?.type === 'motion' ? (
                    <MotionCapture className="actionIcon" />
                  ) : (
                    <Program className="actionIcon" />
                  )}
                  {row?.name}
                </div>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align="center" className="prescription_table_cells">
                {row?.sets}
              </TableCell>

              <TableCell align="center" className="prescription_table_cells">
                {row?.reps}
              </TableCell>
              <TableCell align="center" className="prescription_table_cells">
                {row?.rest}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
