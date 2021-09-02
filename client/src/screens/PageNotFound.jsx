import React from "react";
import Pagenotfound from "../assets/pagenotfound.svg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
  },
}));

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <img src={Pagenotfound} alt="Pagenotfound" className={classes.root} />
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
