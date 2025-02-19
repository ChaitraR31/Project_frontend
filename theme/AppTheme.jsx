import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const AppTheme = ({ children, disableCustomTheme }) => {
  const theme = createTheme({
    palette: {
      mode: 'light', // Default mode
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#f5f5f5',
        paper: '#fff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  // If custom theme is disabled, use the default MUI theme
  const appliedTheme = disableCustomTheme ? theme : theme;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
