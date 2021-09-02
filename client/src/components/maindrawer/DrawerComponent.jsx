import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { set_snackbar } from "../../reducers/snackSlice";
import { user_logout } from "../../reducers/userSlice";
import { theme_update } from "../../reducers/themeSlice";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";
import ContactsIcon from "@material-ui/icons/Contacts";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { makeStyles } from "@material-ui/core/styles";

import assetzLogo from "../../assets/assetzlogo.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "16.66vw",
  },
  logo: {
    width: "5rem",
    background: "#C2CFE0",
    borderRadius: "1rem",
  },
  logocontainer: {
    padding: "2rem 0 1rem 0",
  },
  drawerPaper: {
    width: "16.66vw",
  },
});

const DrawerComponent = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const history = useHistory({
    forceRefresh: true,
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const drawerTopList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <DashboardIcon />,
      onClickHandler: () => history.push("/dashboard"),
    },
    {
      id: 2,
      name: "Add Assets",
      icon: <AddBoxIcon />,
      onClickHandler: () => history.push("/addasset"),
    },
    {
      id: 3,
      name: "View Assets",
      icon: <VisibilityIcon />,
      onClickHandler: () => history.push("/viewasset"),
    },

    {
      id: 4,
      name: "Bulk Upload",
      icon: <PublishIcon />,
      onClickHandler: () => history.push("/bulk"),
    },
  ];

  const drawerBottomList = [
    {
      id: 1,
      name: "Employee",
      icon: <ContactsIcon />,
      onClickHandler: () => history.push("/employee"),
    },
    {
      id: 2,
      name: "Notifications",
      icon: <NotificationsActiveIcon />,
      onClickHandler: () => history.push("/notifs"),
    },
    {
      id: 3,
      name: "Log Out",
      icon: <ExitToAppIcon />,
      onClickHandler: () => {
        dispatch(user_logout());
        history.push("/");
        dispatch(
          set_snackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: "Sucessfully logged out",
            snackbarSeverity: "success",
          })
        );
      },
    },
  ];

  const drawerAdminList = [
    {
      id: 1,
      name: "Admin",
      icon: <AssignmentIndIcon />,
      onClickHandler: () => history.push("/admin"),
    },
  ];

  const changeThemeHandler = () => {
    const themechanged = theme === "light" ? "dark" : "light";
    dispatch(theme_update(themechanged));
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Grid container justify="center" className={classes.logocontainer}>
            <img src={assetzLogo} alt="logo" className={classes.logo} />
          </Grid>
          <Grid container justify="center">
            <Typography variant="h5">{userInfo.name}</Typography>
          </Grid>
          <Divider />
          <List>
            {drawerTopList.map((draweritem) => (
              <ListItem
                button
                key={draweritem.id}
                onClick={draweritem.onClickHandler}
              >
                <ListItemIcon>{draweritem.icon}</ListItemIcon>
                <ListItemText primary={draweritem.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {drawerBottomList.map((draweritem) => (
              <ListItem
                button
                key={draweritem.id}
                onClick={draweritem.onClickHandler}
              >
                <ListItemIcon>{draweritem.icon}</ListItemIcon>
                <ListItemText primary={draweritem.name} />
              </ListItem>
            ))}
          </List>
          <Divider />

          <List>
            <ListItem button onClick={changeThemeHandler}>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText primary="Light/Dark" />
            </ListItem>
          </List>

          <Divider />
          {userInfo.role === "admin" && (
            <List>
              {drawerAdminList.map((draweritem) => (
                <ListItem
                  button
                  key={draweritem.id}
                  onClick={draweritem.onClickHandler}
                >
                  <ListItemIcon>{draweritem.icon}</ListItemIcon>
                  <ListItemText primary={draweritem.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
      )}
    </>
  );
};

export default DrawerComponent;
