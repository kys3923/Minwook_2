import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#DB5A41',
      appbar: '#FFFFFF'
    },
    secondary: {
      main: '#2c3545',
    }
  },
  typography: {
    fontFamily: 'roboto',
  }
});

export default theme;