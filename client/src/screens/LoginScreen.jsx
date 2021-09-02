import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//MUI Libs
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

//Modular imports
import { login } from "../reducers/userSlice";
import HomePage from "../assets/HomePage.svg";
import assetz from "../assets/assetzFinal.png";

//Formik Imports
import { Formik, Form, Field } from "formik";

//Formik Material ui
import { TextField } from "formik-material-ui";

//Import Validation Schema
import { loginValidationSchema } from "../schema/validationSchema";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
  },
  title: {
    marginTop: "5vh",
  },
  linkdeco: {
    textDecoration: "none",
  },
  homepage: {
    width: "65vw",
  },
  logo: {
    width: "20vw",
  },
  homepagecontainer: {
    minHeight: "90vh",
  },
  submitbuttonStyle: {
    paddingTop: "2vh",
  },
}));

const LoginScreen = () => {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.user);

  //React Router
  const location = useLocation();
  const history = useHistory();

  //Constants
  const initialValues = {
    email: "",
    password: "",
  };

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        sm={8}
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.homepagecontainer}
      >
        <Grid item>
          <img src={assetz} alt="Logo" className={classes.logo} />
        </Grid>
        <Grid item>
          <img src={HomePage} alt="Home Page" className={classes.homepage} />
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid item xs={12} sm={4} container>
          <Grid
            item
            container
            sm={10}
            direction="column"
            justify="center"
            spacing={2}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => {
                const { email, password } = values;
                dispatch(login(email, password));
              }}
            >
              {({ submitForm }) => (
                <Form>
                  <Grid item>
                    <Typography
                      variant="h4"
                      color="initial"
                      className={classes.title}
                    >
                      SIGN IN
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="initial">
                      Email
                    </Typography>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Enter Email"
                      fullWidth={true}
                      size={"small"}
                      variant="filled"
                    />
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle1" color="initial">
                      Password
                    </Typography>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Enter Password"
                      fullWidth={true}
                      size={"small"}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item className={classes.submitbuttonStyle}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                    >
                      SIGN IN
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default LoginScreen;
