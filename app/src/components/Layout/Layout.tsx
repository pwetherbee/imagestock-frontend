import { ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={5000}>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}
