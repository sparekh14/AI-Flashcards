import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
      light: '#7c4dff',
      dark: '#5a67d8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#764ba2',
      light: '#9c27b0',
      dark: '#6b46c1',
      contrastText: '#ffffff',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
    },
    success: {
      main: '#48bb78',
    },
    warning: {
      main: '#ed8936',
    },
    error: {
      main: '#f56565',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#4a5568',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#718096',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.15)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.2)',
    '0px 24px 48px rgba(0, 0, 0, 0.2)',
    '0px 28px 56px rgba(0, 0, 0, 0.25)',
    '0px 32px 64px rgba(0, 0, 0, 0.25)',
    '0px 36px 72px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 44px 88px rgba(0, 0, 0, 0.35)',
    '0px 48px 96px rgba(0, 0, 0, 0.35)',
    '0px 52px 104px rgba(0, 0, 0, 0.4)',
    '0px 56px 112px rgba(0, 0, 0, 0.4)',
    '0px 60px 120px rgba(0, 0, 0, 0.45)',
    '0px 64px 128px rgba(0, 0, 0, 0.45)',
    '0px 68px 136px rgba(0, 0, 0, 0.5)',
    '0px 72px 144px rgba(0, 0, 0, 0.5)',
    '0px 76px 152px rgba(0, 0, 0, 0.55)',
    '0px 80px 160px rgba(0, 0, 0, 0.55)',
    '0px 84px 168px rgba(0, 0, 0, 0.6)',
    '0px 88px 176px rgba(0, 0, 0, 0.6)',
    '0px 92px 184px rgba(0, 0, 0, 0.65)',
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          minHeight: '64px',
          '& .MuiToolbar-root': {
            minHeight: '64px !important',
            height: '64px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px !important',
          height: '64px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            background: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(102, 126, 234, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#667eea',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'transparent !important',
          backdropFilter: 'none !important',
          borderRadius: 0,
          minHeight: 'auto',
          margin: 'auto',
          boxShadow: 'none !important',
          border: 'none !important',
          padding: '0 24px',
        },
      },
    },
  },
});

export default theme; 