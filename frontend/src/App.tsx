import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Container, 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fab,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Zoom,
  Fade,
  Grow,
  Slide,
  Badge,
  Tooltip,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  SwipeableDrawer,
  TextField,
  InputAdornment,
} from '@mui/material';
import { QueryProvider } from './contexts/QueryProvider';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import WorkLogList from './components/WorkLogList';
import WorkLogForm from './components/WorkLogForm';
import ExportDialog from './components/ExportDialog';
import SettingsDialog from './components/SettingsDialog';
import { 
  Construction, 
  Assignment, 
  Timeline, 
  Group, 
  Add as AddIcon, 
  Close as CloseIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarMonthIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  Inventory as InventoryIcon,
  Engineering as EngineeringIcon,
  SafetyCheck as SafetyCheckIcon,
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  AccessTime as AccessTimeIcon,
  Speed as SpeedIcon,
  RocketLaunch as RocketLaunchIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  ThumbUp as ThumbUpIcon,
  EmojiEvents as EmojiEventsIcon,
  MilitaryTech as MilitaryTechIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  Verified as VerifiedIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  VpnKey as VpnKeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  Replay as ReplayIcon,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  VolumeDown as VolumeDownIcon,
  VolumeMute as VolumeMuteIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  PresentToAll as PresentToAllIcon,
  Cast as CastIcon,
  CastConnected as CastConnectedIcon,
  Computer as ComputerIcon,
  Laptop as LaptopIcon,
  Phone as PhoneIcon,
  Tablet as TabletIcon,
  Watch as WatchIcon,
  Headset as HeadsetIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  TouchApp as TouchAppIcon,
  Gamepad as GamepadIcon,
  Memory as MemoryIcon,
  SdStorage as SdStorageIcon,
  Usb as UsbIcon,
  Power as PowerIcon,
  BatteryFull as BatteryFullIcon,
  BatteryChargingFull as BatteryChargingFullIcon,
  BatteryAlert as BatteryAlertIcon,
  BatteryUnknown as BatteryUnknownIcon,
  BatteryStd as BatteryStdIcon,
  SignalCellularAlt as SignalCellularAltIcon,
  SignalWifi4Bar as SignalWifi4BarIcon,
  SignalWifiOff as SignalWifiOffIcon,
  NetworkWifi as NetworkWifiIcon,
  NetworkCell as NetworkCellIcon,
  Bluetooth as BluetoothIcon,
  BluetoothDisabled as BluetoothDisabledIcon,
  BluetoothSearching as BluetoothSearchingIcon,
  BluetoothConnected as BluetoothConnectedIcon,
  BluetoothDrive as BluetoothDriveIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  WifiTethering as WifiTetheringIcon,
  WifiTetheringError as WifiTetheringErrorIcon,
  WifiTetheringOff as WifiTetheringOffIcon,
  SignalCellular4Bar as SignalCellular4BarIcon,
  SignalCellularConnectedNoInternet4Bar as SignalCellularConnectedNoInternet4BarIcon,
  SignalCellularNoSim as SignalCellularNoSimIcon,
  SignalCellularNull as SignalCellularNullIcon,
  SignalCellularOff as SignalCellularOffIcon,
  SignalWifi4BarLock as SignalWifi4BarLockIcon,
  SignalWifiBad as SignalWifiBadIcon,
  SignalWifiConnectedNoInternet4 as SignalWifiConnectedNoInternet4Icon,
  SignalWifiStatusbar4Bar as SignalWifiStatusbar4BarIcon,
  SignalWifiStatusbarConnectedNoInternet4 as SignalWifiStatusbarConnectedNoInternet4Icon,
  SignalWifiStatusbarNull as SignalWifiStatusbarNullIcon,
} from '@mui/icons-material';
import { useState } from 'react';

// Theme factory — called with live settings inside the component
function buildTheme(mode: 'light' | 'dark', fontSize: 'small' | 'medium' | 'large') {
  const baseFontSize = fontSize === 'small' ? 13 : fontSize === 'large' ? 16 : 14;
  
  // Dark mode specific colors - sophisticated color scheme
  const isDark = mode === 'dark';
  
  return createTheme({
  palette: {
    mode,
    primary: {
      main: isDark ? '#6c8eff' : '#1a237e', // Softer blue for dark mode
      light: isDark ? '#9ab6ff' : '#534bae',
      dark: isDark ? '#3d5bcc' : '#000051',
    },
    secondary: {
      main: isDark ? '#ff9e4a' : '#ff6f00', // Softer orange for dark mode
      light: isDark ? '#ffc285' : '#ffa040',
      dark: isDark ? '#e67c00' : '#c43e00',
    },
    background: {
      default: isDark ? '#0d1117' : '#f8f9fa', // Dark blue-gray background
      paper: isDark ? '#161b22' : '#ffffff', // Slightly lighter paper
    },
    text: {
      primary: isDark ? '#e6edf3' : 'rgba(0, 0, 0, 0.87)', // Soft white
      secondary: isDark ? '#8b949e' : 'rgba(0, 0, 0, 0.6)', // Muted gray
    },
    success: {
      main: isDark ? '#3fb950' : '#2e7d32', // Brighter green
      light: isDark ? '#56d364' : '#4caf50',
      dark: isDark ? '#238636' : '#1b5e20',
    },
    info: {
      main: isDark ? '#58a6ff' : '#0288d1', // GitHub blue
      light: isDark ? '#79c0ff' : '#29b6f6',
      dark: isDark ? '#1f6feb' : '#01579b',
    },
    warning: {
      main: isDark ? '#d29922' : '#ed6c02',
      light: isDark ? '#e3b341' : '#ff9800',
      dark: isDark ? '#9e6a03' : '#e65100',
    },
    error: {
      main: isDark ? '#f85149' : '#d32f2f',
      light: isDark ? '#ff7b72' : '#ef5350',
      dark: isDark ? '#da3633' : '#c62828',
    },
    divider: isDark ? '#30363d' : 'rgba(0, 0, 0, 0.12)',
    action: {
      active: isDark ? '#8b949e' : 'rgba(0, 0, 0, 0.54)',
      hover: isDark ? 'rgba(110, 118, 129, 0.1)' : 'rgba(0, 0, 0, 0.04)',
      selected: isDark ? 'rgba(110, 118, 129, 0.2)' : 'rgba(0, 0, 0, 0.08)',
      disabled: isDark ? '#484f58' : 'rgba(0, 0, 0, 0.26)',
      disabledBackground: isDark ? '#21262d' : 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: baseFontSize,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          '@keyframes slideUp': {
            from: { transform: 'translateY(20px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
          '@keyframes slideDown': {
            from: { transform: 'translateY(-20px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'scale(0, 0)',
              opacity: 1,
            },
            '20%': {
              transform: 'scale(25, 25)',
              opacity: 1,
            },
            '100%': {
              transform: 'scale(40, 40)',
              opacity: 0,
            },
          },
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' },
          },
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          '@keyframes glow': {
            '0%, 100%': { boxShadow: '0 0 5px rgba(46, 125, 50, 0.5)' },
            '50%': { boxShadow: '0 0 20px rgba(46, 125, 50, 0.8)' },
          },
          '@keyframes wave': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-1000px)' },
          },
          '@keyframes zoomIn': {
            '0%': { transform: 'scale(0.8)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
          '@keyframes slideInRight': {
            '0%': { transform: 'translateX(100px)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
          '@keyframes slideInLeft': {
            '0%': { transform: 'translateX(-100px)', opacity: 0 },
            '100%': { transform: 'translateX(0)', opacity: 1 },
          },
          '@keyframes rotate3d': {
            '0%': { transform: 'rotate3d(0, 1, 0, 0deg)' },
            '100%': { transform: 'rotate3d(0, 1, 0, 360deg)' },
          },
          '.fade-in': {
            animation: 'fadeIn 0.5s ease-out',
          },
          '.slide-up': {
            animation: 'slideUp 0.5s ease-out',
          },
          '.slide-down': {
            animation: 'slideDown 0.5s ease-out',
          },
          '.pulse': {
            animation: 'pulse 2s infinite',
          },
          '.float': {
            animation: 'float 3s ease-in-out infinite',
          },
          '.shimmer': {
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)'
              : 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '1000px 100%',
            animation: 'shimmer 2s infinite',
          },
          '.bounce': {
            animation: 'bounce 1s infinite',
          },
          '.spin': {
            animation: 'spin 2s linear infinite',
          },
          '.glow': {
            animation: 'glow 1.5s ease-in-out infinite',
          },
          '.zoom-in': {
            animation: 'zoomIn 0.5s ease-out',
          },
          '.slide-in-right': {
            animation: 'slideInRight 0.5s ease-out',
          },
          '.slide-in-left': {
            animation: 'slideInLeft 0.5s ease-out',
          },
          '.rotate-3d': {
            animation: 'rotate3d 4s linear infinite',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.01)',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(0, 0, 0, 0.3)'
              : '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
        },
        contained: {
          boxShadow: (theme) => 
            theme.palette.mode === 'dark' 
              ? '0 4px 12px rgba(108, 142, 255, 0.2)' 
              : '0 4px 12px rgba(26, 35, 126, 0.2)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 20px rgba(108, 142, 255, 0.3)'
                : '0 8px 20px rgba(26, 35, 126, 0.3)',
          },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
          transition: 'all 0.2s ease',
        },
        body: {
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
    },
  },
});
}

const StatsCard = ({ icon: Icon, title, value, color }: any) => {
  // Function to add opacity to hex color
  const addOpacity = (hexColor: string, opacity: number) => {
    // Remove the # if present
    const hex = hexColor.replace('#', '');
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Return rgba
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  return (
    <Card className="fade-in">
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: addOpacity(color, 0.15),
              borderRadius: 2,
              p: 1.5,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(5deg)',
                backgroundColor: addOpacity(color, 0.25),
              }
            }}
          >
            <Icon sx={{ color, fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={600} className="pulse">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

function AppInner() {
  const { settings, applySettings } = useSettings();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [refreshSnackbar, setRefreshSnackbar] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Добавлена новая запись в журнал', time: '5 мин назад', color: '#2e7d32', read: false },
    { id: 2, text: 'Запись успешно обновлена', time: '1 час назад', color: '#0288d1', read: false },
    { id: 3, text: 'Выполнено 10 работ за сегодня', time: '3 часа назад', color: '#ff6f00', read: false },
  ]);

  // Resolve 'auto' theme using system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolvedMode =
    settings.theme === 'auto'
      ? (prefersDark ? 'dark' : 'light')
      : settings.theme;

  const theme = buildTheme(resolvedMode, settings.fontSize);
  const isDark = resolvedMode === 'dark';

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleOpenSettings = () => setSettingsDialogOpen(true);
  const handleCloseSettings = () => setSettingsDialogOpen(false);

  const handleOpenNotifications = () => setNotificationsOpen(true);
  const handleCloseNotifications = () => setNotificationsOpen(false);

  const handleOpenProfileMenu = () => setProfileMenuOpen(true);
  const handleCloseProfileMenu = () => setProfileMenuOpen(false);

  const handleOpenExportDialog = () => setExportDialogOpen(true);
  const handleCloseExportDialog = () => setExportDialogOpen(false);

  const handleOpenQuickSearch = () => setSearchDialogOpen(true);
  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false);
    setQuickSearchQuery('');
  };

  const handleQuickSearch = () => {
    if (quickSearchQuery.trim()) {
      // Dispatch a custom event that WorkLogList can listen to
      window.dispatchEvent(new CustomEvent('quick-search', { 
        detail: { query: quickSearchQuery.trim() } 
      }));
      handleCloseSearchDialog();
    }
  };

  const handleRefreshData = () => {
    setRefreshSnackbar(true);
    window.dispatchEvent(new Event('refetch-worklogs'));
    setTimeout(() => setRefreshSnackbar(false), 2500);
  };

  const handleExportData = () => setExportDialogOpen(true);

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens and redirect
    alert('Выход из системы выполнен. В реальном приложении здесь была бы переадресация на страницу входа.');
    handleCloseProfileMenu();
  };

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Enhanced Stylish Header with Animations */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: isDark
              ? 'linear-gradient(135deg, #0d2b5c 0%, #1a3a6c 100%)'
              : 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
            borderBottom: isDark
              ? '1px solid rgba(108, 142, 255, 0.2)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'slideDown 0.5s ease-out',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(108, 142, 255, 0.4), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              animation: 'wave 3s linear infinite',
            }
          }}
        >
          <Toolbar>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mr: 3,
              animation: 'bounce 2s infinite',
            }}>
              <Construction sx={{ 
                fontSize: 36, 
                animation: 'float 3s ease-in-out infinite, spin 20s linear infinite',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
              }} />
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="div" sx={{ 
                fontWeight: 700,
                background: isDark 
                  ? 'linear-gradient(90deg, #ffffff, #bbbbbb)' 
                  : 'linear-gradient(90deg, #ffffff, #e0e0e0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: isDark 
                  ? '0 2px 4px rgba(0, 0, 0, 0.5)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}>
                СТРОИТЕЛЬНЫЙ ЖУРНАЛ
              </Typography>
              <Typography variant="body2" sx={{ 
                opacity: 0.9,
                animation: 'fadeIn 1s ease-out',
              }}>
                🏗️ Учет и контроль строительных работ • Реальное время • Аналитика
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Уведомления">
                <IconButton 
                  color="inherit"
                  onClick={handleOpenNotifications}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'scale(1.1) rotate(10deg)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Badge 
                    badgeContent={notifications.filter(n => !n.read).length} 
                    color="error"
                    max={9}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Быстрый поиск">
                <IconButton 
                  color="inherit"
                  onClick={handleOpenQuickSearch}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Добавить запись">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddModal}
                  sx={{ 
                    borderRadius: 2,
                    background: isDark
                      ? 'linear-gradient(135deg, #3fb950 0%, #56d364 100%)'
                      : 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                    boxShadow: isDark
                      ? '0 4px 15px rgba(63, 185, 80, 0.4)'
                      : '0 4px 15px rgba(46, 125, 50, 0.4)',
                    '&:hover': {
                      background: isDark
                        ? 'linear-gradient(135deg, #238636 0%, #3fb950 100%)'
                        : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: isDark
                        ? '0 6px 20px rgba(63, 185, 80, 0.6)'
                        : '0 6px 20px rgba(46, 125, 50, 0.6)',
                    },
                    transition: 'all 0.3s ease',
                    animation: 'glow 2s infinite',
                  }}
                >
                  Добавить
                </Button>
              </Tooltip>
              
              <Tooltip title="Профиль пользователя">
                <IconButton 
                  color="inherit"
                  onClick={handleOpenProfileMenu}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Hero Section with Animations */}
          <Box sx={{ mb: 6 }} className="fade-in">
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Журнал работ на строительном объекте
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mb: 4 }}>
              Современная система учета выполненных работ, контроля сроков и анализа производительности
            </Typography>
            
            {/* Stats Cards with Hover Effects */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard icon={Assignment} title="Всего записей" value="0" color="#1a237e" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard icon={Timeline} title="Видов работ" value="10" color="#ff6f00" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard icon={Group} title="Исполнителей" value="0" color="#2e7d32" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard icon={Construction} title="Активных объектов" value="1" color="#0288d1" />
              </Grid>
            </Grid>
          </Box>

          {/* Main Content Area - Full Width Table */}
          <Box className="slide-up">
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                background: isDark
                  ? 'linear-gradient(135deg, #161b22 0%, #1c2128 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: isDark
                  ? '1px solid #30363d'
                  : '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: isDark
                    ? 'linear-gradient(90deg, #6c8eff 0%, #58a6ff 50%, #6c8eff 100%)'
                    : 'linear-gradient(90deg, #1a237e 0%, #283593 50%, #1a237e 100%)',
                  animation: 'shimmer 3s infinite linear',
                }
              }}
            >
              {/* Enhanced Header with Add Button */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 4,
                flexWrap: 'wrap',
                gap: 2,
              }}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                    📊 Журнал работ
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Управление и отслеживание всех строительных работ на объекте
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddModal}
                    sx={{ 
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      background: isDark
                        ? 'linear-gradient(135deg, #3fb950 0%, #56d364 100%)'
                        : 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                      boxShadow: isDark
                        ? '0 4px 20px rgba(63, 185, 80, 0.3)'
                        : '0 4px 20px rgba(46, 125, 50, 0.3)',
                      '&:hover': {
                        background: isDark
                          ? 'linear-gradient(135deg, #238636 0%, #3fb950 100%)'
                          : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: isDark
                          ? '0 8px 25px rgba(63, 185, 80, 0.4)'
                          : '0 8px 25px rgba(46, 125, 50, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    Добавить запись
                  </Button>
                </Box>
              </Box>
              
              {/* Quick Stats Bar */}
              <Box sx={{ 
                mb: 4, 
                p: 2, 
                background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.05) 0%, rgba(40, 53, 147, 0.05) 100%)',
                borderRadius: 2,
                border: '1px solid rgba(26, 35, 126, 0.1)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'space-around',
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Сегодня
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary.main">
                    0 работ
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    На этой неделе
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="secondary.main">
                    0 работ
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Общий объем
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    0 ед.
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Исполнителей
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="info.main">
                    0 чел.
                  </Typography>
                </Box>
              </Box>
              
              <WorkLogList />
            </Paper>
          </Box>

          {/* Floating Action Buttons */}
          <Box sx={{ 
            position: 'fixed', 
            bottom: 75, 
            right: 24, 
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-end',
          }}>
            {/* Main Floating Action Button */}
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
              <Tooltip title="Добавить новую запись" placement="left">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={handleOpenAddModal}
                  sx={{
                    background: isDark
                      ? 'linear-gradient(135deg, #3fb950 0%, #56d364 100%)'
                      : 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                    boxShadow: isDark
                      ? '0 8px 25px rgba(63, 185, 80, 0.4)'
                      : '0 8px 25px rgba(46, 125, 50, 0.4)',
                    width: 56,
                    height: 56,
                    '&:hover': {
                      background: isDark
                        ? 'linear-gradient(135deg, #238636 0%, #3fb950 100%)'
                        : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: isDark
                        ? '0 12px 30px rgba(63, 185, 80, 0.6)'
                        : '0 12px 30px rgba(46, 125, 50, 0.6)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: 'pulse 2s infinite',
                  }}
                >
                  <AddIcon sx={{ fontSize: 28 }} />
                </Fab>
              </Tooltip>
            </Zoom>
            
            {/* Secondary Action Buttons - Horizontal Layout */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: 2,
              mt: 2,
              backgroundColor: isDark
                ? 'rgba(30, 30, 30, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
              borderRadius: 3,
              p: 1.5,
              boxShadow: isDark
                ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(10px)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <Tooltip title="Быстрый поиск" placement="top">
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="search"
                    onClick={handleOpenQuickSearch}
                    sx={{
                      background: 'linear-gradient(135deg, #ff6f00 0%, #ffa040 100%)',
                      boxShadow: '0 4px 15px rgba(255, 111, 0, 0.3)',
                      width: 48,
                      height: 48,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #c43e00 0%, #ff6f00 100%)',
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: '0 6px 20px rgba(255, 111, 0, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <SearchIcon />
                  </Fab>
                </Tooltip>
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Tooltip title="Экспорт данных" placement="top">
                  <Fab
                    size="small"
                    color="info"
                    aria-label="export"
                    onClick={handleExportData}
                    sx={{
                      background: 'linear-gradient(135deg, #0288d1 0%, #03a9f4 100%)',
                      boxShadow: '0 4px 15px rgba(2, 136, 209, 0.3)',
                      width: 48,
                      height: 48,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #01579b 0%, #0288d1 100%)',
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: '0 6px 20px rgba(2, 136, 209, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <DownloadIcon />
                  </Fab>
                </Tooltip>
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                <Tooltip title="Настройки" placement="top">
                  <Fab
                    size="small"
                    color="default"
                    aria-label="settings"
                    onClick={handleOpenSettings}
                    sx={{
                      background: 'linear-gradient(135deg, #757575 0%, #9e9e9e 100%)',
                      boxShadow: '0 4px 15px rgba(117, 117, 117, 0.3)',
                      width: 48,
                      height: 48,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #424242 0%, #757575 100%)',
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: '0 6px 20px rgba(117, 117, 117, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <SettingsIcon />
                  </Fab>
                </Tooltip>
              </Zoom>
              
              <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                <Tooltip title="Обновить данные" placement="top">
                  <Fab
                    size="small"
                    color="success"
                    aria-label="refresh"
                    onClick={handleRefreshData}
                    sx={{
                      background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                      boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                      width: 48,
                      height: 48,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: '0 6px 20px rgba(46, 125, 50, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <RefreshIcon />
                  </Fab>
                </Tooltip>
              </Zoom>
            </Box>
          </Box>

          {/* Add Record Modal Dialog */}
          <Dialog 
            open={addModalOpen} 
            onClose={handleCloseAddModal} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                background: isDark
                  ? 'linear-gradient(135deg, #1e1e1e 0%, #252525 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
                maxHeight: '90vh',
                overflow: 'auto',
                animation: 'slideUp 0.3s ease-out',
              }
            }}
          >
            <Box sx={{ 
              p: 3, 
              background: isDark
                ? 'linear-gradient(135deg, rgba(63, 185, 80, 0.12) 0%, rgba(86, 211, 100, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)',
              borderBottom: isDark ? '1px solid #30363d' : '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AddIcon sx={{ mr: 2, color: 'success.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.dark' }}>
                    📝 Добавить новую запись
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Заполните форму для добавления новой работы в журнал
                  </Typography>
                </Box>
              </Box>
              
              <IconButton 
                onClick={handleCloseAddModal}
                size="small"
                sx={{ 
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  '&:hover': { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            <DialogContent sx={{ p: 3 }}>
              <WorkLogForm 
                onSuccess={handleCloseAddModal}
                mode="create"
              />
            </DialogContent>
            
            <DialogActions sx={{ p: 2, borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Button 
                onClick={handleCloseAddModal}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Отмена
              </Button>
            </DialogActions>
          </Dialog>

          {/* Search Dialog */}
          <Dialog 
            open={searchDialogOpen} 
            onClose={handleCloseSearchDialog} 
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                background: isDark
                  ? 'linear-gradient(135deg, #1e1e1e 0%, #252525 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
                animation: 'slideUp 0.3s ease-out',
              }
            }}
          >
            <Box sx={{ 
              p: 3, 
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 158, 74, 0.12) 0%, rgba(255, 194, 133, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(255, 111, 0, 0.1) 0%, rgba(255, 160, 64, 0.1) 100%)',
              borderBottom: isDark ? '1px solid #30363d' : '1px solid rgba(0, 0, 0, 0.08)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SearchIcon sx={{ mr: 2, color: 'secondary.main', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
                  🔍 Быстрый поиск
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Поиск по всем полям журнала работ
              </Typography>
            </Box>
            
            <DialogContent sx={{ p: 3 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Введите поисковый запрос"
                type="text"
                fullWidth
                variant="outlined"
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleQuickSearch();
                  }
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                InputProps={{
                  endAdornment: quickSearchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setQuickSearchQuery('')}
                        edge="end"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Поиск будет выполнен по: ФИО исполнителя, виду работ, примечаниям
              </Typography>
            </DialogContent>
            
            <DialogActions sx={{ p: 2, borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Button 
                onClick={handleCloseSearchDialog}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Отмена
              </Button>
              <Button 
                onClick={handleQuickSearch}
                variant="contained"
                color="secondary"
                disabled={!quickSearchQuery.trim()}
                sx={{ borderRadius: 2 }}
              >
                Искать
              </Button>
            </DialogActions>
          </Dialog>

          {/* Sort Dialog and Filter Drawer are now inside WorkLogList */}

          {/* Notifications Dialog */}
          <Dialog
            open={notificationsOpen}
            onClose={handleCloseNotifications}
            maxWidth="xs"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3 } }}
          >
            <Box sx={{ 
              p: 2.5, 
              background: isDark
                ? 'linear-gradient(135deg, rgba(108, 142, 255, 0.12) 0%, rgba(88, 166, 255, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(26,35,126,0.08) 0%, rgba(40,53,147,0.08) 100%)', 
              borderBottom: isDark ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)', 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge 
                  badgeContent={notifications.filter(n => !n.read).length} 
                  color="error" 
                  max={9}
                  sx={{ mr: 2 }}
                >
                  <NotificationsIcon sx={{ color: 'primary.main' }} />
                </Badge>
                <Typography variant="h6" fontWeight={600}>
                  Уведомления {notifications.filter(n => !n.read).length > 0 && `(${notifications.filter(n => !n.read).length})`}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleCloseNotifications}><CloseIcon /></IconButton>
            </Box>
            <DialogContent sx={{ p: 0 }}>
              {notifications.map((n) => (
                <Box 
                  key={n.id}
                  sx={{ 
                    px: 3, py: 2, 
                    borderBottom: isDark ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.06)', 
                    display: 'flex', alignItems: 'flex-start', gap: 2, 
                    '&:hover': { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.02)' }, 
                    cursor: 'pointer',
                    opacity: n.read ? 0.7 : 1,
                  }}
                  onClick={() => {
                    // Mark notification as read when clicked
                    setNotifications(prev => 
                      prev.map(notification => 
                        notification.id === n.id 
                          ? { ...notification, read: true } 
                          : notification
                      )
                    );
                  }}
                >
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: n.color, 
                    mt: 0.8, 
                    flexShrink: 0,
                    opacity: n.read ? 0.5 : 1,
                  }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: n.read ? 'normal' : 500 }}>
                      {n.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{n.time}</Typography>
                  </Box>
                </Box>
              ))}
              {notifications.length === 0 && (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Нет новых уведомлений
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={handleMarkAllNotificationsAsRead} 
                variant="outlined" 
                fullWidth 
                sx={{ borderRadius: 2 }}
                disabled={notifications.every(n => n.read)}
              >
                Отметить все как прочитанные
              </Button>
            </DialogActions>
          </Dialog>

          {/* Profile Dialog */}
          <Dialog
            open={profileMenuOpen}
            onClose={handleCloseProfileMenu}
            maxWidth="xs"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3 } }}
          >
            <Box sx={{ 
              p: 3, 
              background: isDark
                ? 'linear-gradient(135deg, rgba(108, 142, 255, 0.12) 0%, rgba(88, 166, 255, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(26,35,126,0.08) 0%, rgba(40,53,147,0.08) 100%)', 
              borderBottom: isDark ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)', 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
            }}>
              <Typography variant="h6" fontWeight={600}>Профиль</Typography>
              <IconButton size="small" onClick={handleCloseProfileMenu}><CloseIcon /></IconButton>
            </Box>
            <DialogContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar sx={{ 
                width: 72, 
                height: 72, 
                bgcolor: 'primary.main', 
                mx: 'auto', 
                mb: 2, 
                fontSize: 32,
                boxShadow: isDark 
                  ? '0 4px 12px rgba(108, 142, 255, 0.3)' 
                  : '0 4px 12px rgba(26, 35, 126, 0.2)',
              }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>Администратор</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>admin@stroy-journal.ru</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<PersonIcon />} 
                  fullWidth 
                  sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                  onClick={() => {
                    handleCloseProfileMenu();
                    alert('В реальном приложении здесь открывалась бы форма редактирования профиля.');
                  }}
                >
                  Редактировать профиль
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<SettingsIcon />} 
                  fullWidth 
                  sx={{ borderRadius: 2, justifyContent: 'flex-start' }} 
                  onClick={() => { 
                    handleCloseProfileMenu(); 
                    handleOpenSettings(); 
                  }}
                >
                  Настройки
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<ExitToAppIcon />} 
                  fullWidth 
                  sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Settings Dialog */}
          <SettingsDialog
            open={settingsDialogOpen}
            onClose={handleCloseSettings}
            onApply={applySettings}
          />

          {/* Export Dialog */}
          <ExportDialog open={exportDialogOpen} onClose={handleCloseExportDialog} />

          {/* Refresh Snackbar */}
          {refreshSnackbar && (
            <Box sx={{
              position: 'fixed', bottom: 110, left: '50%', transform: 'translateX(-50%)',
              zIndex: 2000, backgroundColor: '#2e7d32', color: 'white',
              px: 3, py: 1.5, borderRadius: 2,
              boxShadow: '0 4px 20px rgba(46,125,50,0.4)',
              display: 'flex', alignItems: 'center', gap: 1,
              animation: 'slideUp 0.3s ease-out',
            }}>
              <CheckCircleIcon fontSize="small" />
              <Typography variant="body2" fontWeight={500}>Данные успешно обновлены</Typography>
            </Box>
          )}

          {/* Footer */}
          <Box sx={{ mt: 6, pt: 3, borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)' }} className="fade-in">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  © 2024 Строительный журнал. Все права защищены.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" align="right">
                  Версия 1.0.0 • Разработано для строительных компаний
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </QueryProvider>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppInner />
    </SettingsProvider>
  );
}

export default App;