import React from "react";
import { useDispatch } from "react-redux";

//MUI Libs
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  TextField as TextFieldMaterial,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Formik Imports
import { Formik, Form, Field } from "formik";

//Import Validation Schema
import { adminFormValidationSchema } from "../../schema/validationSchema";

//Modular Imports
import CustomTextField from "../customcomponents/CustomTextField";
import { addUser } from "../../reducers/addUserSlice";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "90%",
  },

  title: {
    padding: "1rem 0",
  },
  formStyle: {
    display: "flex",
    justifyContent: "center",
  },
});

const AdminForm = () => {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();

  //Constants
  const initialValues = {
    email: "",
    name: "",
    password: "",
    role: "view",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={adminFormValidationSchema}
      onSubmit={(values, { resetForm }) => {
        const { email, name, password, role } = values;
        dispatch(addUser(email, name, password, role));
        resetForm();
      }}
    >
      {({ submitForm }) => (
        <Form className={classes.formStyle}>
          <Grid item container sm={4} spacing={2}>
            <Grid item container direction="column">
              <Typography
                variant="h4"
                color="initial"
                align="center"
                className={classes.title}
              >
                Add New User
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <CustomTextField name="name" label="First Name" />
            </Grid>
            <Grid item container direction="column">
              <CustomTextField name="email" label="Email" type="email" />
            </Grid>
            <Grid item container direction="column">
              <CustomTextField
                name="password"
                label="Default Password"
                type="password"
              />
            </Grid>
            <Grid item container direction="column">
              <FormControl fullWidth>
                <Field
                  fullWidth
                  name="role"
                  label="Role"
                  variant="outlined"
                  as={TextFieldMaterial}
                  select
                >
                  <MenuItem value={"view"}>View</MenuItem>
                  <MenuItem value={"write"}>Write</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Field>
              </FormControl>
            </Grid>
            <Grid item container direction="column">
              <Button
                variant="contained"
                color="secondary"
                onClick={submitForm}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AdminForm;
