import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";

import "./index.css";
import App from "./home/App";

let theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...{
            // background:
            //   "linear-gradient(to right, #e9e4fd, #e3dcfc, #dcd4fc, #d6ccfb, #cfc4fa)",
          },
        }),
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "text", screenactive: true },
          style: {
            color: "#6a3fe0",
            backgroundColor: "#e9e4fd",
          },
        },
        {
          props: { variant: "text", screenactive: false },
          style: {
            color: "#444444",
          },
        },
      ],
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "text" &&
            ownerState.screenactive === true && {
              backgroundColor: "#e9e4fd",
              color: "#6a3fe0",
              textDecorationColor: "#6a3fe0",
            }),
        }),
      },
    },
  },
  palette: {
    primary: {
      main: "#7a4ff5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#999999",
    },
  },
  typography: {
    fontFamily: [
      // "lyon",
      "-apple-system",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
