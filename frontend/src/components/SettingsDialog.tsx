import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogActions, Box, Typography,
  Button, IconButton, Select, MenuItem, FormControl, InputLabel,
  Switch, FormControlLabel, Divider, Alert, Snackbar,
  ToggleButton, ToggleButtonGroup, Slider, Tooltip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  RestartAlt as RestartAltIcon,
  Language as LanguageIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  TableRows as TableRowsIcon,
  TextFields as TextFieldsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

export interface AppSettings {
  language: 'ru' | 'en';
  timezone: string;
  dateFormat: 'dd.MM.yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd';
  rowsPerPage: 5 | 10 | 25 | 50;
  theme: 'light' | 'dark' | 'auto';
  notificationsEnabled: boolean;
  compactTable: boolean;
  fontSize: 'small' | 'medium' | 'large';
  showNotes: boolean;
  autoRefresh: boolean;
  autoRefreshInterval: number; // seconds
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'ru',
  timezone: 'Europe/Moscow',
  dateFormat: 'dd.MM.yyyy',
  rowsPerPage: 10,
  theme: 'light',
  notificationsEnabled: true,
  compactTable: false,
  fontSize: 'medium',
  showNotes: true,
  autoRefresh: false,
  autoRefreshInterval: 30,
};

const STORAGE_KEY = 'stroy-journal-settings';

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(s: AppSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

interface Props {
  open: boolean;
  onClose: () => void;
  onApply?: (settings: AppSettings) => void;
}

const Section = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, mt: 1 }}>
    <Icon sx={{ color: 'primary.main', fontSize: 18 }} />
    <Typography variant="subtitle2" fontWeight={700} color="primary.main">{title}</Typography>
  </Box>
);

const SettingsDialog = ({ open, onClose, onApply }: Props) => {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  // Reload from storage each time dialog opens
  useEffect(() => {
    if (open) setSettings(loadSettings());
  }, [open]);

  const set = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    saveSettings(settings);
    onApply?.(settings);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh' } }}>

        {/* Header */}
        <Box sx={{
          p: 2.5,
          background: 'linear-gradient(135deg, rgba(117,117,117,0.08) 0%, rgba(26,35,126,0.08) 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SettingsIcon sx={{ color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" fontWeight={600}>Настройки</Typography>
              <Typography variant="caption" color="text.secondary">
                Изменения сохраняются в браузере
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Сбросить к значениям по умолчанию">
              <IconButton size="small" onClick={handleReset} color="warning">
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
          </Box>
        </Box>

        <DialogContent sx={{ p: 3 }}>

          {/* ── Appearance ── */}
          <Section icon={PaletteIcon} title="Внешний вид" />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Тема оформления</InputLabel>
              <Select value={settings.theme} label="Тема оформления"
                onChange={e => set('theme', e.target.value as AppSettings['theme'])}
                sx={{ borderRadius: 2 }}>
                <MenuItem value="light"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LightModeIcon fontSize="small" />Светлая</Box></MenuItem>
                <MenuItem value="dark"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><DarkModeIcon fontSize="small" />Тёмная</Box></MenuItem>
                <MenuItem value="auto">Системная (авто)</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Размер шрифта
              </Typography>
              <ToggleButtonGroup
                value={settings.fontSize} exclusive size="small"
                onChange={(_, v) => v && set('fontSize', v)}
                sx={{ width: '100%' }}>
                <ToggleButton value="small" sx={{ flex: 1 }}>Мелкий</ToggleButton>
                <ToggleButton value="medium" sx={{ flex: 1 }}>Средний</ToggleButton>
                <ToggleButton value="large" sx={{ flex: 1 }}>Крупный</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <FormControlLabel
              control={<Switch checked={settings.compactTable}
                onChange={e => set('compactTable', e.target.checked)} color="primary" />}
              label={<Box><Typography variant="body2">Компактная таблица</Typography>
                <Typography variant="caption" color="text.secondary">Уменьшенные отступы в строках</Typography></Box>}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ── Table ── */}
          <Section icon={TableRowsIcon} title="Таблица" />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Записей на странице</InputLabel>
              <Select value={settings.rowsPerPage} label="Записей на странице"
                onChange={e => set('rowsPerPage', Number(e.target.value) as AppSettings['rowsPerPage'])}
                sx={{ borderRadius: 2 }}>
                {[5, 10, 25, 50].map(n => <MenuItem key={n} value={n}>{n} записей</MenuItem>)}
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Switch checked={settings.showNotes}
                onChange={e => set('showNotes', e.target.checked)} color="primary" />}
              label={<Box><Typography variant="body2">Показывать примечания</Typography>
                <Typography variant="caption" color="text.secondary">Колонка «Примечания» в таблице</Typography></Box>}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ── Date & Time ── */}
          <Section icon={CalendarTodayIcon} title="Дата и время" />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Формат даты</InputLabel>
              <Select value={settings.dateFormat} label="Формат даты"
                onChange={e => set('dateFormat', e.target.value as AppSettings['dateFormat'])}
                sx={{ borderRadius: 2 }}>
                <MenuItem value="dd.MM.yyyy">ДД.ММ.ГГГГ (31.12.2024)</MenuItem>
                <MenuItem value="MM/dd/yyyy">ММ/ДД/ГГГГ (12/31/2024)</MenuItem>
                <MenuItem value="yyyy-MM-dd">ГГГГ-ММ-ДД (2024-12-31)</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Часовой пояс</InputLabel>
              <Select value={settings.timezone} label="Часовой пояс"
                onChange={e => set('timezone', e.target.value)}
                sx={{ borderRadius: 2 }}>
                <MenuItem value="Europe/Moscow">UTC+3 — Москва</MenuItem>
                <MenuItem value="Europe/Kaliningrad">UTC+2 — Калининград</MenuItem>
                <MenuItem value="Asia/Yekaterinburg">UTC+5 — Екатеринбург</MenuItem>
                <MenuItem value="Asia/Novosibirsk">UTC+7 — Новосибирск</MenuItem>
                <MenuItem value="Asia/Vladivostok">UTC+10 — Владивосток</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ── Notifications & Refresh ── */}
          <Section icon={NotificationsIcon} title="Уведомления и обновление" />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FormControlLabel
              control={<Switch checked={settings.notificationsEnabled}
                onChange={e => set('notificationsEnabled', e.target.checked)} color="primary" />}
              label={<Box><Typography variant="body2">Уведомления</Typography>
                <Typography variant="caption" color="text.secondary">Показывать уведомления о действиях</Typography></Box>}
            />

            <FormControlLabel
              control={<Switch checked={settings.autoRefresh}
                onChange={e => set('autoRefresh', e.target.checked)} color="primary" />}
              label={<Box><Typography variant="body2">Автообновление данных</Typography>
                <Typography variant="caption" color="text.secondary">Периодически обновлять список работ</Typography></Box>}
            />

            {settings.autoRefresh && (
              <Box sx={{ px: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Интервал обновления: <strong>{settings.autoRefreshInterval} сек.</strong>
                </Typography>
                <Slider
                  value={settings.autoRefreshInterval}
                  onChange={(_, v) => set('autoRefreshInterval', v as number)}
                  min={10} max={120} step={10}
                  marks={[
                    { value: 10, label: '10с' },
                    { value: 30, label: '30с' },
                    { value: 60, label: '1м' },
                    { value: 120, label: '2м' },
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={v => `${v}с`}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            )}
          </Box>

        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)', gap: 1 }}>
          <Button onClick={handleReset} variant="text" color="warning"
            startIcon={<RestartAltIcon />} sx={{ borderRadius: 2, mr: 'auto' }}>
            По умолчанию
          </Button>
          <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
            Отмена
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{ borderRadius: 2, minWidth: 120 }}
            startIcon={saved ? <CheckCircleIcon /> : <SettingsIcon />}>
            {saved ? 'Сохранено!' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success toast */}
      <Snackbar open={saved} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" icon={<CheckCircleIcon />} sx={{ borderRadius: 2 }}>
          Настройки сохранены
        </Alert>
      </Snackbar>
    </>
  );
};

export default SettingsDialog;
