import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField as TextFieldMaterial,
  Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

//Import Validation Schema
import { onboardValidationSchema } from "../../schema/validationSchema";

//Formik Imports
import { Formik, Form, Field } from "formik";

//Formik Material ui
import { KeyboardDateTimePicker } from "formik-material-ui-pickers";

// Imports
import CustomTextField from "../customcomponents/CustomTextField";
import { onboard_update } from "../../reducers/onboardSlice";
import { option_update_continue } from "../../reducers/assetSelSlice";
import { getAssetType } from "../../reducers/assetTypeSlice";
import { location } from "../../reducers/locationSlice";

const useStyles = makeStyles({
  container: {
    paddingTop: "2rem",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const OnBoardForm = () => {
  const classes = useStyles();
  const [assetlvl1, setAssetlvl1] = useState("Computer");
  const { onboard } = useSelector((state) => state.onboard);
  const { enable } = useSelector((state) => state.assetSel);
  const { assetType } = useSelector((state) => state.assetType);
  const { locationList } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const initialValues = {
    assetId: onboard.assetId.value,
    assetStatus: onboard.assetStatus.value,
    assetType: onboard.assetType.value,
    assetClassification: onboard.assetClassification.value,
    cost: onboard.cost.value,
    invoiceNumber: onboard.invoiceNumber.value,
    putToUseDate: onboard.putToUseDate.value,
    invoiceDate: onboard.invoiceDate.value,
    model: onboard.model.value,
    purchaseOrderDate: onboard.purchaseOrderDate.value,
    purchaseOrder: onboard.purchaseOrder.value,
    vendor: onboard.vendor.value,
    location: onboard.location.value,
    purchaseDate: onboard.purchaseDate.value,
  };

  useEffect(() => {
    dispatch(getAssetType());
    dispatch(location());
  }, [dispatch]);

  const enableoncontinue = { ...enable, software: false };

  const assettlevel1 = assetType
    .map((item) => item.assettypelev1)
    .filter((value, index, self) => self.indexOf(value) === index);

  const clickassetTypeHandler = (assetLevel1) => {
    setAssetlvl1(assetLevel1);
  };

  const assettlevel2 = assetType.filter(
    (assetType) => assetType.assettypelev1 === assetlvl1
  );

  return (
    <Grid container direction="column">
      <Typography variant="h4" color="initial">
        Onboard
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={onboardValidationSchema}
        onSubmit={(values) => {
          const valuetobeuploaded = {
            assetId: {
              lable: "Asset Id",
              value: values.assetId,
            },
            assetStatus: {
              lable: "Asset Status",
              value: values.assetStatus,
            },
            assetType: {
              lable: "Asset Type",
              value: values.assetType,
            },
            assetClassification: {
              lable: "Asset Classification",
              value: values.assetClassification,
            },
            cost: {
              lable: "Cost",
              value: values.cost,
            },
            invoiceNumber: {
              lable: "Invoice Number",
              value: values.invoiceNumber,
            },
            putToUseDate: {
              lable: "Put To Use Date",
              value: values.putToUseDate
                ? values.putToUseDate.toString()
                : values.putToUseDate,
            },
            invoiceDate: {
              lable: "Invoice Date",
              value: values.invoiceDate
                ? values.invoiceDate.toString()
                : values.invoiceDate,
            },
            model: {
              lable: "Model",
              value: values.model,
            },
            purchaseOrderDate: {
              lable: "Purchase Order Date",
              value: values.purchaseOrderDate
                ? values.purchaseOrderDate.toString()
                : values.purchaseOrderDate,
            },
            purchaseOrder: {
              lable: "Purchase Order",
              value: values.purchaseOrder,
            },
            vendor: {
              lable: "Vendor",
              value: values.vendor,
            },
            location: {
              lable: "Location",
              value: values.location,
            },
            purchaseDate: {
              lable: "Purchase Date",
              value: values.purchaseDate
                ? values.purchaseDate.toString()
                : values.purchaseDate,
            },
          };
          dispatch(onboard_update(valuetobeuploaded));
          dispatch(
            option_update_continue({
              option: 2,
              enable: enableoncontinue,
            })
          );
        }}
      >
        {({ submitForm, setFieldValue }) => (
          <Form className={classes.formStyle}>
            <Grid
              container
              justify="space-evenly"
              className={classes.container}
            >
              <Grid
                item
                sm={4}
                container
                direction="column"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item container direction="column">
                  <FormControl fullWidth>
                    <Field
                      fullWidth
                      name="assetType"
                      label="Asset Type"
                      variant="outlined"
                      as={TextFieldMaterial}
                      select
                    >
                      {assettlevel1.map((assetLevel1, index) => (
                        <MenuItem
                          value={assetLevel1}
                          key={index}
                          onClick={() => clickassetTypeHandler(assetLevel1)}
                        >
                          {assetLevel1}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item container>
                  <CustomTextField name="model" label="Model" />
                </Grid>
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="purchaseOrderDate"
                      label="Purchase Order Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy/MM/dd hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <CustomTextField name="vendor" label="Vendor" />
                </Grid>
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="invoiceDate"
                      label="Invoice Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy/MM/dd hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <CustomTextField name="cost" label="Cost" />
                </Grid>
                <Grid item container>
                  
                  <FormControl fullWidth>
                    <Field
                      fullWidth
                      name="location"
                      label="Location"
                      variant="outlined"
                      as={TextFieldMaterial}
                      select
                    >
                      {locationList.map((locationin) => (
                        <MenuItem
                          value={locationin.locationname}
                          key={locationin.locationid}
                        >
                          {locationin.locationname}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                item
                sm={4}
                container
                direction="column"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item container direction="column">
                  <FormControl fullWidth>
                    <Field
                      fullWidth
                      name="assetClassification"
                      label="Asset Classification"
                      variant="outlined"
                      as={TextFieldMaterial}
                      select
                    >
                      {assettlevel2.map((assetLevel2) => (
                        <MenuItem
                          value={assetLevel2.assettypelev2}
                          key={assetLevel2.assettypeid}
                        >
                          {assetLevel2.assettypelev2}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item container>
                  <CustomTextField
                    name="purchaseOrder"
                    label="Purchase Order"
                  />
                </Grid>
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="purchaseDate"
                      label="Purchase Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy/MM/dd hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <CustomTextField
                    name="invoiceNumber"
                    label="Invoice Number"
                  />
                </Grid>
                <Grid item container direction="column">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      name="putToUseDate"
                      label="Put To Use Date"
                      autoOk
                      inputVariant="outlined"
                      format="yyyy/MM/dd hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item container>
                  <CustomTextField name="assetId" label="Asset Id" />
                </Grid>

                <Grid item container>
                  <CustomTextField
                    name="assetStatus"
                    label="Asset Status"
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justify="flex-end"
              className={classes.container}
              spacing={2}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={submitForm}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default OnBoardForm;
