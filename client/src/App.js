import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import PageNotFound from "./screens/PageNotFound";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import CustomSnackBar from "./components/snackbar/CustomSnackBar";
import DrawerComponent from "./components/maindrawer/DrawerComponent";
import AdminRoute from "./components/routes/AdminRoute";
import AdminScreen from "./screens/AdminScreen";
import AddAssetScreen from "./screens/AddAssetScreen";
import ViewAssetScreen from "./screens/ViewAssetScreen";
import BulkUploadScreen from "./screens/BulkUploadScreen";
import EmployeeScreen from "./screens/EmployeeScreen";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

const App = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <CustomSnackBar />
      <Router>
        <div className={classes.container}>
          {userInfo && Object.keys(userInfo).length !== 0 && (
            <DrawerComponent />
          )}
          <Switch>
            <PublicRoute path="/" exact component={LoginScreen} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/addasset" exact component={AddAssetScreen} />
            <PrivateRoute path="/viewasset" exact component={ViewAssetScreen} />
            <AdminRoute path="/admin" exact component={AdminScreen} />
            <PrivateRoute path="/bulk" exact component={BulkUploadScreen} />
            <PrivateRoute path="/employee" exact component={EmployeeScreen} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
