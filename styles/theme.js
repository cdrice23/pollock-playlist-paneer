import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#01579b",
    },
    secondary: {
      main: "#4f83cc",
    },
    background: {
      default: "#fbf7f5",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
