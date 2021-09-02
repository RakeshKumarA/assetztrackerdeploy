import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  MenuItem,
  TextField as TextFieldMaterial,
} from "@material-ui/core";

//Modular Import
import { option_update_onclick } from "../../reducers/assetSelSlice";
import { depreciation_update } from "../../reducers/depreciationSlice";
import { addAsset, editAsset } from "../../reducers/submitAssetSlice";
import CustomTextField from "../customcomponents/CustomTextField";
import OnboardTable from "./review/OnboardTable";
import SoftwareTable from "./review/SoftwareTable";
import HardwareTable from "./review/HardwareTable";
import DepreciationTable from "./review/DepreciationTable";

//Import Validation Schema
import { depreciationValidationSchema } from "../../schema/validationSchema";

//Formik
import { Formik, Form, Field } from "formik";

//Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { format } from "date-fns/esm";
import { set_snackbar } from "../../reducers/snackSlice";

const useStyles = makeStyles({
  container: {
    paddingTop: "2rem",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "450px",
  },
  table: {
    minWidth: 400,
  },
  tabletitlestyle: {
    padding: "1rem",
  },
});

const DepreciationForm = () => {
  const classes = useStyles();
  const { depreciation } = useSelector((state) => state.depreciation);
  const { onboard } = useSelector((state) => state.onboard);
  const { software } = useSelector((state) => state.software);
  const { hardware } = useSelector((state) => state.hardware);
  const { assetOperation } = useSelector((state) => state.assetOperation);
  const { editassetid } = useSelector((state) => state.editAsset);

  const dispatch = useDispatch();
  const history = useHistory();

  //Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formattedOnboard = {
    ...onboard,
    putToUseDate: {
      lable: "Put to use Date",
      value: onboard.putToUseDate.value
        ? format(new Date(onboard.putToUseDate.value), "yyyy-mm-dd HH:MM:SS p")
        : onboard.putToUseDate.value,
    },
    invoiceDate: {
      lable: "Invoice Date",
      value: onboard.invoiceDate.value
        ? format(new Date(onboard.invoiceDate.value), "yyyy-mm-dd HH:MM:SS p")
        : onboard.invoiceDate.value,
    },
    purchaseOrderDate: {
      lable: "Purchase Order Date",
      value: onboard.purchaseOrderDate.value
        ? format(
            new Date(onboard.purchaseOrderDate.value),
            "yyyy-mm-dd HH:MM:SS p"
          )
        : onboard.purchaseOrderDate.value,
    },
    purchaseDate: {
      lable: "Purchase Date",
      value: onboard.purchaseDate.value
        ? format(new Date(onboard.purchaseDate.value), "yyyy-mm-dd HH:MM:SS p")
        : onboard.purchaseDate.value,
    },
  };

  const onboarddata = Object.entries({
    ...formattedOnboard,
  }).map((e) => ({ [e[1].lable]: e[1].value }));

  const depreciationdata = Object.entries({
    ...depreciation,
  }).map((e) => ({ [e[1].lable]: e[1].value }));

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleBackclick = () => {
    dispatch(option_update_onclick({ option: 3 }));
  };

  const handleSubmitAsset = () => {
    switch(assetOperation) {
      case 'Add':
          if (onboard.assetId.value !== '') {
            dispatch(addAsset(onboard, software, hardware, depreciation));
            handleClose();
            history.push("/dashboard");
            break;
          } else {
            dispatch(
              set_snackbar({
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage: 'Asset Id Missing',
                snackbarSeverity: "error",
              })
            );
          }
        break;
      case 'Edit':
        if (onboard.assetId.value !== '') {
          dispatch(editAsset(editassetid, onboard, software, hardware, depreciation));
          handleClose();
          history.push("/dashboard");
          break;
        } else {
          dispatch(
            set_snackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: 'Asset Id Missing',
              snackbarSeverity: "error",
            })
          );
        }
      break;
      case 'Clone':
        if (onboard.assetId.value !== '') {
          dispatch(addAsset(onboard, software, hardware, depreciation));
          handleClose();
          history.push("/dashboard");
          break;
        } else {
          dispatch(
            set_snackbar({
              snackbarOpen: true,
              snackbarType: "error",
              snackbarMessage: 'Asset Id Missing',
              snackbarSeverity: "error",
            })
          );
        }
      break;
      default:
        console.log('None')
    }
  };

  const initialValues = {
    shelflife: depreciation.shelflife.value,
    residualvalue: depreciation.residualvalue.value,
    depmethod: depreciation.depmethod.value,
  };

  return (
    <>
      <Typography variant="h4" color="initial">
        Depreciation
      </Typography>
      <Grid container justify="center" className={classes.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={depreciationValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const valuetobeuploaded = {
              shelflife: {
                lable: "Shelf Life",
                value: values.shelflife,
              },
              residualvalue: {
                lable: "Residual Value",
                value: values.residualvalue,
              },
              depmethod: {
                lable: "Depreciation Method",
                value: values.depmethod,
              },
            };
            dispatch(depreciation_update(valuetobeuploaded));
            resetForm(depreciation);
            handleClickOpen();
          }}
        >
          {({ submitForm }) => (
            <Form className={classes.formStyle}>
              <Grid item container sm={8} spacing={2} alignItems="center">
                <Grid item container direction="column">
                  <CustomTextField name="shelflife" label="Shelf Life" />
                </Grid>
                <Grid item container direction="column">
                  <CustomTextField
                    name="residualvalue"
                    label="Residual Value"
                  />
                </Grid>
                <Grid item container direction="column">
                  <FormControl fullWidth>
                    <Field
                      fullWidth
                      name="depmethod"
                      label="Depreciation Method"
                      variant="outlined"
                      as={TextFieldMaterial}
                      select
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="straightlinemethod">
                        Straight Line Method
                      </MenuItem>
                      <MenuItem value="writtendownmethod">
                        Written Down Method
                      </MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                item
                sm={10}
                container
                justify="flex-end"
                spacing={2}
                className={classes.container}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={handleBackclick}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={submitForm}
                  >
                    Review
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>Review</DialogTitle>
        <DialogContent
          dividers={true}
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <OnboardTable onboarddata={onboarddata} />
          <SoftwareTable software={software} />
          <HardwareTable hardware={hardware} />
          <DepreciationTable depreciationdata={depreciationdata} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAsset} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DepreciationForm;
