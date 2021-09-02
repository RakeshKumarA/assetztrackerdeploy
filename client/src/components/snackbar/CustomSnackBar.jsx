import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { set_snackbar } from "../../reducers/snackSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    snackbarOpen,
    snackbarType,
    snackbarMessage,
    snackbarSeverity,
  } = useSelector((state) => state.snack);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      set_snackbar({
        snackbarOpen: false,
        snackbarType,
        snackbarMessage,
        snackbarSeverity,
      })
    );
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackBar;
