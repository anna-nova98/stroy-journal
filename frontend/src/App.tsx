import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography } from '@mui/material';
import { QueryProvider } from './contexts/QueryProvider';
import WorkLogList from './components/WorkLogList';
import WorkLogForm from './components/WorkLogForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Журнал работ на строительном объекте
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Учет выполненных работ за каждый день
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <WorkLogForm />
          </Box>

          <WorkLogList />
        </Container>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;