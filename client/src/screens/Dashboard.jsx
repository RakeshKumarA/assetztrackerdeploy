import React from "react";
import { useDispatch, useSelector } from "react-redux";
//MUI Libs
import { Grid, Typography, Card, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Other Libraries
import PieChart from "../components/charts/PieChart";
import { useEffect } from "react";
import { dashboardChart, dashboardTable } from "../reducers/dashboardSlice";
import CustomTable from "../components/customcomponents/CustomTable";

const useStyles = makeStyles({
  title: {
    padding: "1.5rem 0",
  },
  latestactstyle: {
    padding: "2rem",
  },
  cardStyle: {
    width: "90%",
    height: "40vh",
    padding: "1rem",
  },
  chartTitleStyle: {
    padding: "1rem 0",
  },
  paperStyle: {
    width: "97%",
    minHeight: "95vh",
    margin: "4vh auto",
  },
  tablePadding: {
    paddingTop: "1rem",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { assetsCountByStatus, assetsCountByCategory, assetsCountByPeriod } =
    useSelector((state) => state.dashboard.stats);
  const { assetsFilterList } = useSelector((state) => state.dashboard);
  const tableRows = assetsFilterList.map((value) => ({
    id: value.id,
    assetId: value.onboard.assetId.value,
    cost: value.onboard.cost.value,
    vendor: value.onboard.vendor.value,
    empname: value.empname,
    assetStatus: value.assetstatus,
    name: value.name,
  }));
  const statusCountLabel = ["Onboarded", "Assigned", "Inventory"];
  const categoryCountLabel = [
    "Computer",
    "Chair",
    "Table",
    "TV",
    "Coffee Maker",
    "Stationary",
  ];
  const periodLable = ["Today", "Week", "Month"];

  useEffect(() => {
    dispatch(dashboardChart());
    dispatch(
      dashboardTable({
        type: "assetByPeriod",
        criteria: "Monthly",
      })
    );
  }, [dispatch]);

  return (
    <Grid container direction="column">
      <Grid item container justify="center">
        <Grid item md={4} sm={8} container justify="center">
          <Typography
            variant="h5"
            color="initial"
            className={classes.chartTitleStyle}
          >
            Asset Count by Status
          </Typography>
          <Card className={classes.cardStyle}>
            <PieChart
              rawData={assetsCountByStatus}
              type="assetByStatus"
              labels={statusCountLabel}
            />
          </Card>
        </Grid>
        <Grid item md={4} sm={8} container justify="center">
          <Typography
            variant="h5"
            color="initial"
            className={classes.chartTitleStyle}
          >
            Asset Count by Category
          </Typography>
          <Card className={classes.cardStyle}>
            <PieChart
              rawData={assetsCountByCategory}
              type="assetByCategory"
              labels={categoryCountLabel}
            />
          </Card>
        </Grid>
        <Grid item md={4} sm={8} container justify="center">
          <Typography
            variant="h5"
            color="initial"
            className={classes.chartTitleStyle}
          >
            Asset Count by Period
          </Typography>
          <Card className={classes.cardStyle}>
            <PieChart
              rawData={assetsCountByPeriod}
              type="assetByPeriod"
              labels={periodLable}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <Paper className={classes.paperStyle}>
          <Grid
            container
            alignItems="center"
            direction="column"
            className={classes.tablePadding}
          >
            <CustomTable rows={tableRows} screen="dashboard" />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
