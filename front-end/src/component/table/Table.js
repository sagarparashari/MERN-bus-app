import React from 'react';
import './table.css';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const THEME = createMuiTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 15,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const BusTable = (props) => {
  let { value: busData } = props
  const classes = useStyles();
  const changeIdx = (e, row) => {
    e.preventDefault()
    sessionStorage.setItem("bus-id", row)
    let { onChild2 } = props
    if (onChild2) {
      let e = 2
      onChild2(e)
    }
  }
  return (
    <div className="table-top">
      <h3>Select Bus</h3>
      <MuiThemeProvider theme={THEME}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow style={{ backgroundColor: "white" }}>
                <TableCell><strong>BusType</strong></TableCell>
                <TableCell align="center"><strong>Departure</strong></TableCell>
                <TableCell align="center"><strong>Arrival</strong></TableCell>
                <TableCell align="center"><strong>Date</strong></TableCell>
                <TableCell align="center"><strong>Available</strong></TableCell>
                <TableCell align="center"><strong>Fare</strong></TableCell>
                <TableCell align="right">&nbsp;&nbsp;&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {busData.bus.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.busType}
                  </TableCell>
                  <TableCell align="center">{row.departure}</TableCell>
                  <TableCell align="center">{row.arrival}</TableCell>
                  <TableCell align="center">{row.travelDate}</TableCell>
                  <TableCell align="center">{row.seatsAvailable - row.bookedSeats.length}</TableCell>
                  <TableCell align="center">{row.fare}</TableCell>
                  <TableCell align="center"><button className="btn btn-success" onClick={e => changeIdx(e, row._id)}>View Seats</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MuiThemeProvider>
    </div>
  );
};

export default BusTable;