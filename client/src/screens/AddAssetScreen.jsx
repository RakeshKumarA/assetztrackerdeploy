import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddAssetDrawer from '../components/addAsset/AddAssetDrawer';
import { Paper } from '@material-ui/core';
import OnBoardForm from '../components/addAsset/OnBoardForm';
import SoftwareForm from '../components/addAsset/SoftwareForm';
import HardwareForm from '../components/addAsset/HardwareForm';
import DepreciationForm from '../components/addAsset/DepreciationForm';
import Documents from '../components/addAsset/Documents';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
  },
  cardContainer: {
    height: '80%',
    width: '90%',
  },
  paperStyle: {
    width: '100%',
  },
  formcontainer: {
    padding: '2rem',
  },
});

const AddAssetScreen = () => {
  const classes = useStyles();

  const { option } = useSelector((state) => state.assetSel);

  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid item container className={classes.cardContainer} spacing={2}>
        <Grid item container sm={2}>
          <AddAssetDrawer />
        </Grid>
        <Grid item container sm={10}>
          <Paper className={classes.paperStyle}>
            <Grid item container className={classes.formcontainer}>
              {option === 1 && <OnBoardForm />}
              {option === 2 && <SoftwareForm />}
              {option === 3 && <HardwareForm />}
              {option === 4 && <DepreciationForm />}
              {option === 5 && <Documents />}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddAssetScreen;
