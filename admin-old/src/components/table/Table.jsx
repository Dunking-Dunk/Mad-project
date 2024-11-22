import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({buses}) => {

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Route</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            {/* <TableCell className="tableCell">Arrival</TableCell> */}
            <TableCell className="tableCell">Depature</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buses.map((bus) => (
            <TableRow key={bus.id}>
              <TableCell className="tableCell">{bus.id}</TableCell>
              <TableCell className="tableCell">{bus.busNumber} {bus.busSet}</TableCell>
              <TableCell className="tableCell">{bus.busName}</TableCell>
              {/* <TableCell className="tableCell">{bus.stops[0].timings}</TableCell> */}
              <TableCell className="tableCell">{bus.returnAfter315 ? '3:15 pm' : bus.returnAfter1 ? '1:00 pm' : '5:00 pm'}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${bus.status ? 'active': 'passive'}`}>{bus.status ? 'active': 'passive'}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
