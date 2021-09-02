import { createMuiTheme } from "@material-ui/core/styles";

const themedark = createMuiTheme({
  palette: {
    background: {
      default: "#bbbbbb",
      paper: "#8d8d8d",
    },
    secondary: {
      main: "#343a40",
    },
    text: {
      primary: "#ffffff",
    },
  },
  props: {
    MuiSvgIcon: {
      htmlColor: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Nunito Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  // overrides: {
  //   MuiTableCell: {
  //     head: {
  //       color: "#fff",
  //     },
  //     body: {
  //       color: "#fff",
  //     },
  //   },
  // },
});

export default themedark;
