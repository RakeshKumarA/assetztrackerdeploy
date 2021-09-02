import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AdminDrawer from "../components/admin/AdminDrawer";
import AdminForm from "../components/admin/AdminForm";
import { Paper } from "@material-ui/core";
import ViewUser from "../components/admin/ViewUser";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "90%",
  },
  paperStyle: {
    width: "100%",
  },
  formcontainer: {
    paddingTop: "2rem",
  },
});

const AdminScreen = () => {
  const classes = useStyles();
  const [menuselection, setMenuSelection] = useState(1);

  const handleSelection = (id) => {
    setMenuSelection(id);
  };

  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid item container className={classes.cardContainer} spacing={2}>
        <Grid item container sm={2}>
          <AdminDrawer handleSelection={handleSelection} />
        </Grid>
        <Grid item container sm={10}>
          <Paper className={classes.paperStyle}>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.formcontainer}
            >
              {menuselection === 1 && <AdminForm />}
              {menuselection === 2 && <ViewUser />}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminScreen;
