import React from "react";
import ReactDOM from "react-dom";
import AppRoot from "./AppRoot";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  document.getElementById("root")
);
