import { createTheme } from "@mui/material";
import { amber, purple } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    secondary: {
      main: amber[700],
      dark: amber[800],
      light: amber[500],
      contrastText: "#000",
    },

    primary: {
      main: purple[500],
      dark: purple[400],
      light: purple[300],
      contrastText: "#ffffff",
    },

    background: {
      paper: "#ffffff",
      default: "#f7f6f3",
    },
  },
});
