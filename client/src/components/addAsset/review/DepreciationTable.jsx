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

const DepreciationTable = ({ depreciationdata }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h5"
        color="initial"
        className={classes.tabletitlestyle}
      >
        Depreciation
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {depreciationdata.map((row) => (
              <TableRow key={Object.keys(row)}>
                <TableCell component="th" scope="row">
                  {Object.keys(row)}
                </TableCell>
                <TableCell>{Object.values(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DepreciationTable;
