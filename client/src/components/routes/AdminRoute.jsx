import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && Object.keys(userInfo).length !== 0 ? (
          userInfo.role === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/dashboard" />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
