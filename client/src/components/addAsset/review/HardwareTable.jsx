import React from 'react';

//Material UI
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  tabletitlestyle: {
    padding: '1rem',
  },
});

const HardwareTable = ({ hardware }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h5"
        color="initial"
        className={classes.tabletitlestyle}
      >
        Hardware
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Version</TableCell>
              <TableCell align="left">Expiry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hardware.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.hardwareName}
                </TableCell>
                <TableCell>{row.hardwareVersion}</TableCell>
                <TableCell>{row.expDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HardwareTable;
