import { createTheme } from "@mui/material/styles";

const THEME = createTheme({
  typography: {
    fontFamily: `"Roboto", sans-serif`,
  },
  palette: {
    primary: {
      main: "#2563eb",
      light: "#93c5fd",
      dark: "#172554",
    },
    secondary: {
      main: "#0ea5e9",
    },
    background: {
      default: "#000000",
    },
  },
});

export default THEME;
