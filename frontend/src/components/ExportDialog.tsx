import { useState } from 'react';
import {
  Dialog, DialogContent, DialogActions, Box, Typography,
  Button, IconButton, CircularProgress, Alert, LinearProgress,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { workLogApi } from '@/api/workLog.api';
import { exportCSV, exportExcel, exportPDF } from '@/utils/export';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Format = 'excel' | 'csv' | 'pdf';

const FORMATS: { key: Format; label: string; ext: string; icon: string; desc: string; color: string }[] = [
  { key: 'excel', label: 'Excel', ext: '.xls', icon: '📊', desc: 'Таблица — открывается в Excel и LibreOffice', color: '#217346' },
  { key: 'csv',   label: 'CSV',   ext: '.csv', icon: '📄', desc: 'Текстовый формат — совместим с любой программой', color: '#0288d1' },
  { key: 'pdf',   label: 'PDF',   ext: '.pdf', icon: '📋', desc: 'Печать / сохранение через диалог браузера', color: '#c62828' },
];

const ExportDialog = ({ open, onClose }: Props) => {
  const [loading, setLoading] = useState<Format | null>(null);
  const [done, setDone] = useState<Format | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (fmt: Format) => {
    setLoading(fmt);
    setDone(null);
    setError(null);

    try {
      // Fetch ALL records (no pagination limit)
      const result = await workLogApi.getAll({ limit: 10000, page: 1 });
      const rows = result.data;

      if (rows.length === 0) {
        setError('Нет данных для экспорта.');
        setLoading(null);
        return;
      }

      if (fmt === 'csv')   exportCSV(rows);
      if (fmt === 'excel') exportExcel(rows);
      if (fmt === 'pdf')   exportPDF(rows);

      setDone(fmt);
    } catch (e: any) {
      setError(e?.message ?? 'Ошибка при экспорте данных');
    } finally {
      setLoading(null);
    }
  };

  const handleClose = () => {
    setDone(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}>

      {/* Header */}
      <Box sx={{
        p: 2.5,
        background: 'linear-gradient(135deg, rgba(2,136,209,0.08) 0%, rgba(3,169,244,0.08) 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DownloadIcon sx={{ mr: 1.5, color: 'info.main' }} />
          <Box>
            <Typography variant="h6" fontWeight={600}>Экспорт данных</Typography>
            <Typography variant="caption" color="text.secondary">
              Все записи журнала будут выгружены
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={handleClose}><CloseIcon /></IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {done && (
          <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2, borderRadius: 2 }}>
            Файл успешно скачан!
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Выберите формат:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {FORMATS.map(({ key, label, ext, icon, desc, color }) => {
            const isLoading = loading === key;
            const isDone = done === key;
            return (
              <Button
                key={key}
                variant={isDone ? 'contained' : 'outlined'}
                fullWidth
                disabled={loading !== null}
                onClick={() => handleExport(key)}
                sx={{
                  borderRadius: 2,
                  justifyContent: 'flex-start',
                  py: 1.5, px: 2,
                  borderColor: isDone ? color : undefined,
                  backgroundColor: isDone ? `${color}18` : undefined,
                  '&:hover': { borderColor: color, backgroundColor: `${color}10` },
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isLoading && (
                  <LinearProgress
                    sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2 }}
                  />
                )}
                <Box sx={{ mr: 2, fontSize: 22, lineHeight: 1 }}>{icon}</Box>
                <Box sx={{ textAlign: 'left', flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {label} <Typography component="span" variant="caption" color="text.secondary">{ext}</Typography>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{desc}</Typography>
                </Box>
                {isLoading && <CircularProgress size={18} sx={{ ml: 1 }} />}
                {isDone && <CheckCircleIcon sx={{ ml: 1, color: 'success.main', fontSize: 20 }} />}
              </Button>
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;
