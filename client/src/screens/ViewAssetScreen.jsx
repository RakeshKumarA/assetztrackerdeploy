import React, { useEffect, useState } from "react";
import CustomTable from "../components/customcomponents/CustomTable";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
//MUI Libs
import { makeStyles } from "@material-ui/core/styles";
import { searchAsset, viewAssets } from ".././reducers/viewAssetSlice";
import { useSelector, useDispatch } from "react-redux";
import { set_snackbar } from "../reducers/snackSlice";
import { assignEmployeeToAsset, unAssignAsset } from "../reducers/employeeSlice";

const useStyles = makeStyles({
  paperStyle: {
    width: "80%",
    minHeight: "95vh",
    margin: "4vh auto",
  },
  title: {
    padding: "1.5rem 0",
  },
  searchContainer: {
    width: "90%",
    paddingBottom: "2rem",
  },
});

const ViewAssetScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [checkboxres, setCheckboxres] = useState(false);

  // View Assets
  const { assets } = useSelector((state) => state.viewAsset);
  const { employeeViewed } = useSelector((state) => state.employee);

  //Dialog

  const [open, setOpen] = React.useState(false);
  const [unassignOpen, setUnassignOpen] = React.useState(false);
  const [reason, setReason] = React.useState('');
  const [method, setMethod] = React.useState('');

  const tableRows = assets.map((value) => ({
    id: value.id,
    assetId: value.onboard.assetId.value,
    cost: value.onboard.cost.value,
    vendor: value.onboard.vendor.value,
    empname: value.empname,
    assetStatus: value.assetstatus,
    name: value.name,
  }));
  // Search Asset
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(viewAssets());
  }, [dispatch]);

  const onSearchHandler = () => {
    if (searchTerm === "") {
      dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Please Enter AssetId",
          snackbarSeverity: "warning",
        })
      );
    } else {
      dispatch(searchAsset(searchTerm));
      setSearchTerm("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onResetHandler = () => {
    setSearchTerm("");
    dispatch(viewAssets());
  };



  const handleClickOpen = (selected) => {
    setSelectedAsset(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenToUnassign = (selected) => {
    setSelectedAsset(selected);
    setUnassignOpen(true);
  };

  const handleUnassignClose = () => {
    setUnassignOpen(false);
  };

  const handleAssign = () => {
    const assignEmployee = {
      id: selectedEmployee,
      assetid: selectedAsset[0],
    };
    dispatch(assignEmployeeToAsset(assignEmployee));
    handleClose();
    setCheckboxres(true);
    window.location.reload();
  };
  const handleUnAssign = () => {
    dispatch(unAssignAsset(selectedAsset[0], reason, method));
    handleUnassignClose();
    window.location.reload();
  };

  const handleEmployeeSelection = (event, values) => {
    setSelectedEmployee(values.id);
  };

  return (
    <>
      <Paper className={classes.paperStyle}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h4" color="initial" className={classes.title}>
              View Assets
            </Typography>
          </Grid>
          <Grid item container className={classes.searchContainer} spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Search By Asset ID"
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
                onClick={onSearchHandler}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={onResetHandler}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
          <CustomTable
            rows={tableRows}
            screen="viewScreen"
            assetSelected={handleClickOpen}
            checkboxres={checkboxres}
            assetUnassigned={handleClickOpenToUnassign}
          />
        </Grid>
      </Paper>  
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Assign Asset</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={employeeViewed}
            getOptionLabel={(employee) => employee.empname}
            style={{ width: 300 }}
            onChange={handleEmployeeSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employee"
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssign} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={unassignOpen}
        onClose={handleUnassignClose}
      >
        <DialogTitle>Unassign the Asset</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Return Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Return Method"
            fullWidth
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnassignClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUnAssign} color="primary">
            UnAssign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewAssetScreen;
