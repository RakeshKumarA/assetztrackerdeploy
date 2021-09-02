import { createMuiTheme } from '@material-ui/core/styles';

const themelight = createMuiTheme({
  palette: {
    primary: {
      main: '#343a40',
    },
    background: {
      default: '#e5e5e5',
    },
  },
  typography: {
    fontFamily: [
      'Nunito Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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

export default themelight;
