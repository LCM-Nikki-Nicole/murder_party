import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Palanquin, sans-serif',
    h1: {
      fontFamily: 'Palanquin Dark, sans-serif',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'Palanquin Dark, sans-serif',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: 'Palanquin Dark, sans-serif',
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: 'Palanquin Dark, sans-serif',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: 'Palanquin Dark, sans-serif',
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: 'Palanquin Dark, sans-serif',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: 'Palanquin, sans-serif',
    },
    body2: {
      fontFamily: 'Palanquin, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
    custom: {
      greyBlack: '#242424', // only for background on non-logged in pages
      darkGray: '#393939',
      darkRed: '#A12E2E',
      gray: '#ACA9A9',
      red: '#C24949',
      gold: '#E5B769',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          width: '322px',
          height: '58px',
          color: '#FFFFFF',
          border: '2px solid #E5B769',
          borderRadius: '10px',
          fontFamily: 'Palanquin, sans-serif',
          fontWeight: 700, // Bold
          fontSize: '20px',
          textTransform: 'uppercase',
          letterSpacing: '2px', // 10% letter spacing
          padding: '10px 20px',
          boxShadow: 'none', // No shadow (override mui)
          '&:hover': {
            backgroundColor: '#393939', // Darker background on hover
            boxShadow: 'none',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
