import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";

// Material Core
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

//FormiK
import { TextField } from "formik-material-ui";
import { KeyboardDateTimePicker } from "formik-material-ui-pickers";

//Formik
import { Formik, Form, Field } from "formik";

// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//Import Validation Schema
import { softwareValidationSchema } from "../../schema/validationSchema";

//Modular Imports
import { software_update, software_delete } from "../../reducers/softwareSlice";
import {
  option_update_continue,
  option_update_onclick,
} from "../../reducers/assetSelSlice";

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

const SoftwareForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { software } = useSelector((state) => state.software);
  const { enable } = useSelector((state) => state.assetSel);
  const dispatch = useDispatch();
  const enableoncontinue = { ...enable, hardware: false };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(software_delete(id));
  };

  const clickContinueHandler = () => {
    dispatch(
      option_update_continue({
        option: 3,
        enable: enableoncontinue,
      })
    );
  };

  const clickBackHandler = () => {
    dispatch(option_update_onclick({ option: 1 }));
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        Software
      </Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item sm={10} container justify="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Add Software
          </Button>
        </Grid>
        <Grid item sm={10}>
          <TableContainer component={Paper} elevation={8}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Software Name</TableCell>
                  <TableCell align="right">Version</TableCell>
                  <TableCell align="right">Expiry Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {software.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.softwareName}
                    </TableCell>
                    <TableCell align="right">{row.softwareVersion}</TableCell>
                    <TableCell align="right">{row.expDate}</TableCell>
                    <TableCell align="center" padding="none">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={10} container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              onClick={clickBackHandler}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={clickContinueHandler}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Software</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              softwareName: "",
              softwareVersion: "",
              expDate: null,
            }}
            validationSchema={softwareValidationSchema}
            onSubmit={(values) => {
              values.expDate =
                values.expDate &&
                format(values.expDate, "yyyy-MM-dd hh:mm:ss a");
              const datawithkey = { ...values, id: uuidv4() };
              dispatch(software_update(datawithkey));
              handleClose();
            }}
          >
            {({ submitForm }) => (
              <Form>
                <Grid container direction="column">
                  <Field
                    component={TextField}
                    name="softwareName"
                    type="text"
                    label="Software Name"
                    variant="outlined"
                  />
                  <br />
                  <Field
                    component={TextField}
                    name="softwareVersion"
                    type="text"
                    label="Software Version"
                    variant="outlined"
                  />
                  <br />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="expDate"
                      label="Expiry Date"
                      autoOk
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                  <br />
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SoftwareForm;
