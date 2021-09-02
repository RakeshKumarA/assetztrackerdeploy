import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import { IconButton, TextField } from "@material-ui/core";
import { Grid, TableHead, Typography } from "@material-ui/core";
import { set_snackbar } from "../../reducers/snackSlice";

import TableRow from "@material-ui/core/TableRow";
//MUI Libs
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Import Validation Schema
import { useSelector, useDispatch } from "react-redux";
import {
  viewUsers,
  searchUsers,
  deleteUsers,
} from "../../reducers/viewUserSlice";

const useStyles = makeStyles({
  paperStyle: {
    width: "90%",
  },
  title: {
    paddingBottom: "1.5rem",
  },
  searchContainer: {
    width: "90%",
    paddingBottom: "2rem",
  },
});

const ViewUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { view } = useSelector((state) => state.viewUser);
  const { userInfo } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(viewUsers());
  }, [dispatch]);

  const resetUserHandler = () => {
    setSearchTerm("");
    dispatch(viewUsers());
  };

  const handleDelete = (id) => {
    dispatch(deleteUsers(id));
  };

  const onSubmitHandler = () => {
    if (searchTerm === "") {
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Please Enter Name",
          snackbarSeverity: "warning",
        })
      );
    } else {
      dispatch(searchUsers(searchTerm));
      setSearchTerm("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography variant="h4" color="initial" className={classes.title}>
          View Users
        </Typography>
      </Grid>
      <Grid item container className={classes.searchContainer} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Search By Name"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            size={"small"}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={onSubmitHandler}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={resetUserHandler}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
      <Grid item container justify="center">
        <Paper className={classes.paperStyle}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {view.map((row) => (
                  <TableRow key={row.userid}>
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                    <TableCell align="center" padding="none">
                      {row.role !== "admin" && userInfo.role === "admin" && (
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(row.userid)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewUser;
