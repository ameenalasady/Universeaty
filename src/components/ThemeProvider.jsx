// src/components/ThemeProvider.js

import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b8004d",
    },
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <div className="maincontainer">
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </div>
  );
};

export default ThemeProvider;
