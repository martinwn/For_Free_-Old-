import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff665b"
    },
    secondary: {
      main: "#0044ff"
    },
    background: {
      paper: "#fff"
    }
  },
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(",")
  }
});

const ThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
