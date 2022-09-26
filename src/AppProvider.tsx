import type { PropsWithChildren } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({ palette: { mode: "light" } });

type AppProviderProps = PropsWithChildren<{}>;

function AppProvider(props: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default AppProvider;
