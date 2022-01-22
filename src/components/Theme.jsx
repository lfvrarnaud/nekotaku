import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#003f4f",
      contrastText: "#c3f9ff",
    },
    secondary: {
      main: "#c3f9ff",
      contrastText: "#003f4f",
      light: "#ffffff",
    },
    white: {
      main: "#AADBEF",
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#000",
      secondary: "#ffffff",
    },
  },
});

export default Theme;
