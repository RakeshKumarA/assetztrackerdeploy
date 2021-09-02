import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import themelight from "./themelight";
import themedark from "./themedark";
import CssBaseline from "@material-ui/core/CssBaseline";

// Redux related components and libraries

import { useSelector } from "react-redux";

const AppRoot = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={theme === "light" ? themelight : themedark}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default AppRoot;
