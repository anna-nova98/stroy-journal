import { useState, useEffect, useRef } from 'react';
import {
  Box, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, TableSortLabel,
  IconButton, Tooltip, TextField, InputAdornment, Chip, Alert,
  CircularProgress, Dialog, DialogContent, DialogActions, Button,
  FormControl, InputLabel, Select, MenuItem, Badge, Drawer,
} from '@mui/material';
import {
  Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon,
  CalendarToday as CalendarIcon, Group, Warning as WarningIcon,
  FilterList as FilterListIcon, ClearAll as ClearAllIcon, Close as CloseIcon,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { useWorkLogs, useDeleteWorkLog, useWorkTypes } from '@/hooks/useWorkLogs';
import WorkLogForm from './WorkLogForm';
import { WorkLogWithDetails } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';

type SortField = 'workDate' | 'quantity' | 'workerName' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const SORT_LABELS: Record<SortField, string> = {
  workDate: 'Дата',
  quantity: 'Объём',
  workerName: 'Исполнитель',
  createdAt: 'Дата создания',
};

const WorkLogList = () => {
  const { settings } = useSettings();
  const queryClient = useQueryClient();

  // Pagination — default from settings
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(settings.rowsPerPage);

  // Sync rowsPerPage when settings change
  useEffect(() => {
    setRowsPerPage(settings.rowsPerPage);
    setPage(0);
  }, [settings.rowsPerPage]);

  // Auto-refresh
  const autoRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    if (settings.autoRefresh) {
      autoRefreshRef.current = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ['workLogs'] });
      }, settings.autoRefreshInterval * 1000);
    }
    return () => {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    };
  }, [settings.autoRefresh, settings.autoRefreshInterval, queryClient]);

  // Quick search event listener
  useEffect(() => {
    const handleQuickSearch = (event: CustomEvent) => {
      const query = event.detail.query;
      if (query) {
        // Apply quick search to multiple fields
        setAppliedSearchWorker(query);
        setAppliedSearchNotes(query);
        setPage(0);
      }
    };

    window.addEventListener('quick-search', handleQuickSearch as EventListener);
    
    return () => {
      window.removeEventListener('quick-search', handleQuickSearch as EventListener);
    };
  }, []);

  // Filters (local state for form inputs)
  const [localSearchDate, setLocalSearchDate] = useState<Date | null>(null);
  const [localSearchWorker, setLocalSearchWorker] = useState('');
  const [localSearchWorkType, setLocalSearchWorkType] = useState('');
  const [localSearchNotes, setLocalSearchNotes] = useState('');
  const [localMinQuantity, setLocalMinQuantity] = useState<number | ''>('');
  const [localMaxQuantity, setLocalMaxQuantity] = useState<number | ''>('');

  // Applied filters (used for API calls)
  const [appliedSearchDate, setAppliedSearchDate] = useState<Date | null>(null);
  const [appliedSearchWorker, setAppliedSearchWorker] = useState('');
  const [appliedSearchWorkType, setAppliedSearchWorkType] = useState('');
  const [appliedSearchNotes, setAppliedSearchNotes] = useState('');
  const [appliedMinQuantity, setAppliedMinQuantity] = useState<number | ''>('');
  const [appliedMaxQuantity, setAppliedMaxQuantity] = useState<number | ''>('');

  // Sort
  const [sortBy, setSortBy] = useState<SortField>('workDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Dialogs
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWorkLog, setSelectedWorkLog] = useState<WorkLogWithDetails | null>(null);

  const { data: workTypes } = useWorkTypes();

  const hasActiveFilters = !!(
    appliedSearchDate || appliedSearchWorker || appliedSearchWorkType ||
    appliedSearchNotes || appliedMinQuantity !== '' || appliedMaxQuantity !== ''
  );

  // Sync local filters with applied filters when drawer opens
  useEffect(() => {
    if (filterDrawerOpen) {
      setLocalSearchDate(appliedSearchDate);
      setLocalSearchWorker(appliedSearchWorker);
      setLocalSearchWorkType(appliedSearchWorkType);
      setLocalSearchNotes(appliedSearchNotes);
      setLocalMinQuantity(appliedMinQuantity);
      setLocalMaxQuantity(appliedMaxQuantity);
    }
  }, [filterDrawerOpen]);

  const { data, isLoading, error } = useWorkLogs({
    date: appliedSearchDate ? format(appliedSearchDate, 'yyyy-MM-dd') : undefined,
    workerName: appliedSearchWorker || undefined,
    workTypeId: appliedSearchWorkType || undefined,
    notes: appliedSearchNotes || undefined,
    minQuantity: appliedMinQuantity !== '' ? appliedMinQuantity : undefined,
    maxQuantity: appliedMaxQuantity !== '' ? appliedMaxQuantity : undefined,
    sortBy,
    sortOrder,
    page: page + 1,
    limit: rowsPerPage,
  });

  const { mutate: deleteWorkLog } = useDeleteWorkLog();

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(0);
  };

  const handleResetFilters = () => {
    // Reset both local and applied filters
    setLocalSearchDate(null);
    setLocalSearchWorker('');
    setLocalSearchWorkType('');
    setLocalSearchNotes('');
    setLocalMinQuantity('');
    setLocalMaxQuantity('');
    
    setAppliedSearchDate(null);
    setAppliedSearchWorker('');
    setAppliedSearchWorkType('');
    setAppliedSearchNotes('');
    setAppliedMinQuantity('');
    setAppliedMaxQuantity('');
    setPage(0);
  };

  const handleApplyFilters = () => {
    // Apply local filters to applied filters
    setAppliedSearchDate(localSearchDate);
    setAppliedSearchWorker(localSearchWorker);
    setAppliedSearchWorkType(localSearchWorkType);
    setAppliedSearchNotes(localSearchNotes);
    setAppliedMinQuantity(localMinQuantity);
    setAppliedMaxQuantity(localMaxQuantity);
    setPage(0);
    setFilterDrawerOpen(false);
  };

  const handleEdit = (workLog: WorkLogWithDetails) => {
    setSelectedWorkLog(workLog);
    setEditDialogOpen(true);
  };

  const handleDelete = (workLog: WorkLogWithDetails) => {
    setSelectedWorkLog(workLog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedWorkLog) {
      deleteWorkLog(selectedWorkLog.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedWorkLog(null);
        },
      });
    }
  };

  // Date formatting from settings
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), settings.dateFormat);
    } catch {
      return dateStr;
    }
  };

  // Row padding from compact setting
  const cellPy = settings.compactTable ? 0.75 : 1.5;

  // Font size from settings
  const fontVariant = settings.fontSize === 'small'
    ? 'caption'
    : settings.fontSize === 'large'
    ? 'body1'
    : 'body2';

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка при загрузке данных: {(error as any).message}
      </Alert>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box>

        {/* ── Toolbar ── */}
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          mb: 2, p: 2,
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(108, 142, 255, 0.08) 0%, rgba(88, 166, 255, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(26,35,126,0.06) 0%, rgba(40,53,147,0.06) 100%)',
          borderRadius: 2, flexWrap: 'wrap', gap: 2,
          border: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : 'none',
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              📋 Список работ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Найдено: {data?.meta.total ?? 0} записей
              {hasActiveFilters && (
                <Chip label="Фильтры активны" size="small" color="warning"
                  sx={{ ml: 1, height: 18, fontSize: '0.7rem' }} />
              )}
              {settings.autoRefresh && (
                <Chip label={`Авто-обновление ${settings.autoRefreshInterval}с`}
                  size="small" color="info" sx={{ ml: 1, height: 18, fontSize: '0.7rem' }} />
              )}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              size="small" label="Поиск по ФИО" value={appliedSearchWorker}
              onChange={(e) => { setAppliedSearchWorker(e.target.value); setPage(0); }}
              sx={{ minWidth: 180, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <DatePicker
              label="Дата" value={appliedSearchDate}
              onChange={(d) => { setAppliedSearchDate(d); setPage(0); }}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { minWidth: 160, '& .MuiOutlinedInput-root': { borderRadius: 2 } },
                },
              }}
            />

            <Tooltip title="Расширенные фильтры и сортировка">
              <Badge color="warning" variant="dot" invisible={!hasActiveFilters}>
                <Button size="small" variant="outlined" startIcon={<FilterListIcon />}
                  onClick={() => setFilterDrawerOpen(true)}
                  sx={{ borderRadius: 2, whiteSpace: 'nowrap' }}>
                  Фильтры
                </Button>
              </Badge>
            </Tooltip>

            {hasActiveFilters && (
              <Tooltip title="Сбросить все фильтры">
                <IconButton size="small" color="warning" onClick={handleResetFilters}
                  sx={{ border: '1px solid', borderColor: 'warning.main', borderRadius: 2 }}>
                  <ClearAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* ── Table ── */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} elevation={0}
              sx={{ border: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <Table size={settings.compactTable ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1c2128' : '#f5f7ff' }}>
                    <TableCell sx={{ fontWeight: 700, py: cellPy }}>
                      <TableSortLabel active={sortBy === 'workDate'}
                        direction={sortBy === 'workDate' ? sortOrder : 'asc'}
                        onClick={() => handleSort('workDate')}>
                        Дата
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, py: cellPy }}>Вид работ</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, py: cellPy }}>
                      <TableSortLabel active={sortBy === 'quantity'}
                        direction={sortBy === 'quantity' ? sortOrder : 'asc'}
                        onClick={() => handleSort('quantity')}>
                        Объём
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, py: cellPy }}>
                      <TableSortLabel active={sortBy === 'workerName'}
                        direction={sortBy === 'workerName' ? sortOrder : 'asc'}
                        onClick={() => handleSort('workerName')}>
                        Исполнитель
                      </TableSortLabel>
                    </TableCell>
                    {settings.showNotes && (
                      <TableCell sx={{ fontWeight: 700, py: cellPy }}>Примечания</TableCell>
                    )}
                    <TableCell align="center" sx={{ fontWeight: 700, py: cellPy }}>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={settings.showNotes ? 6 : 5} align="center" sx={{ py: 6 }}>
                        <Typography color="text.secondary">
                          {hasActiveFilters
                            ? 'Записей по заданным фильтрам не найдено'
                            : 'Записей пока нет'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {data?.data.map((workLog, index) => (
                    <TableRow key={workLog.id} hover
                      sx={{
                        backgroundColor: (theme) => 
                          index % 2 === 0 
                            ? 'transparent' 
                            : theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.02)' 
                              : 'rgba(0,0,0,0.015)',
                        transition: 'background-color 0.2s ease',
                        '&:last-child td': { borderBottom: 0 },
                        '&:hover': {
                          backgroundColor: (theme) => 
                            theme.palette.mode === 'dark' 
                              ? 'rgba(108, 142, 255, 0.08)' 
                              : 'rgba(26, 35, 126, 0.04)',
                        },
                      }}
                    >
                      <TableCell sx={{ py: cellPy }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                          <Typography variant={fontVariant} fontWeight={500}>
                            {formatDate(workLog.workDate)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: cellPy }}>
                        <Typography variant={fontVariant} fontWeight={500}>
                          {workLog.workType.name}
                        </Typography>
                        {!settings.compactTable && (
                          <Chip label={workLog.workType.unit} size="small" variant="outlined"
                            sx={{ mt: 0.5, borderColor: 'primary.light', color: 'primary.dark', fontSize: '0.7rem' }} />
                        )}
                      </TableCell>
                      <TableCell align="right" sx={{ py: cellPy }}>
                        <Typography variant={fontVariant} fontWeight={600}
                          sx={{ 
                            color: 'secondary.main', 
                            bgcolor: (theme) => theme.palette.mode === 'dark' 
                              ? 'rgba(255, 158, 74, 0.12)' 
                              : 'rgba(255,111,0,0.08)',
                            px: 1.5, py: 0.5, borderRadius: 1, display: 'inline-block' 
                          }}>
                          {workLog.quantity} {workLog.workType.unit}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: cellPy }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Group sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          <Typography variant={fontVariant} fontWeight={500}>
                            {workLog.workerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      {settings.showNotes && (
                        <TableCell sx={{ py: cellPy }}>
                          <Typography variant={fontVariant} color="text.secondary"
                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200,
                              fontStyle: workLog.notes ? 'normal' : 'italic' }}>
                            {workLog.notes || 'Без примечаний'}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="center" sx={{ py: cellPy }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Tooltip title="Редактировать">
                            <IconButton size="small" onClick={() => handleEdit(workLog)}
                              sx={{ 
                                bgcolor: (theme) => theme.palette.mode === 'dark' 
                                  ? 'rgba(108, 142, 255, 0.12)' 
                                  : 'rgba(26,35,126,0.08)', 
                                '&:hover': { 
                                  bgcolor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(108, 142, 255, 0.22)'
                                    : 'rgba(26,35,126,0.18)' 
                                } 
                              }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton size="small" onClick={() => handleDelete(workLog)}
                              sx={{ 
                                bgcolor: (theme) => theme.palette.mode === 'dark'
                                  ? 'rgba(248, 81, 73, 0.12)'
                                  : 'rgba(211,47,47,0.08)', 
                                '&:hover': { 
                                  bgcolor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(248, 81, 73, 0.22)'
                                    : 'rgba(211,47,47,0.18)' 
                                } 
                              }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={data?.meta.total || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={(e) => {
                const value = parseInt(e.target.value, 10) as 5 | 10 | 25 | 50;
                setRowsPerPage(value);
                setPage(0);
              }}
              labelRowsPerPage="Строк:"
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
            />
          </>
        )}
      </Box>

      {/* ── Filter Drawer ── */}
      <Drawer anchor="right" open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{ 
          sx: { 
            width: 340, 
            borderRadius: '12px 0 0 12px',
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #161b22 0%, #1c2128 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderLeft: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : 'none',
          } 
        }}>
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>Фильтры и сортировка</Typography>
            </Box>
            <IconButton size="small" onClick={() => setFilterDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

            {/* Sort */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 1.5 }}>
                📊 Сортировка
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                <InputLabel>Поле сортировки</InputLabel>
                <Select value={sortBy} label="Поле сортировки"
                  onChange={(e) => { setSortBy(e.target.value as SortField); setPage(0); }}
                  sx={{ borderRadius: 2 }}>
                  {(Object.keys(SORT_LABELS) as SortField[]).map(f => (
                    <MenuItem key={f} value={f}>{SORT_LABELS[f]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Направление</InputLabel>
                <Select value={sortOrder} label="Направление"
                  onChange={(e) => { setSortOrder(e.target.value as SortOrder); setPage(0); }}
                  sx={{ borderRadius: 2 }}>
                  <MenuItem value="asc">По возрастанию ↑</MenuItem>
                  <MenuItem value="desc">По убыванию ↓</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Date */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 1.5 }}>
                📅 Фильтр по дате
              </Typography>
              <DatePicker label="Конкретная дата" value={localSearchDate}
                onChange={(d) => { setLocalSearchDate(d); }}
                slotProps={{
                  textField: {
                    size: 'small', fullWidth: true,
                    sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } },
                  },
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {[{ label: 'Сегодня', days: 0 }, { label: '7 дней', days: 7 }, { label: '30 дней', days: 30 }]
                  .map(({ label, days }) => (
                    <Chip key={label} label={label} size="small" variant="outlined" clickable
                      onClick={() => {
                        const d = new Date();
                        if (days > 0) d.setDate(d.getDate() - days);
                        setLocalSearchDate(d);
                      }}
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
              </Box>
            </Box>

            {/* Worker */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 1.5 }}>
                👷 Исполнитель
              </Typography>
              <TextField size="small" fullWidth label="Поиск по ФИО" value={localSearchWorker}
                onChange={(e) => { setLocalSearchWorker(e.target.value); }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                }}
              />
            </Box>

            {/* Work type */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 1.5 }}>
                🔧 Вид работ
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Вид работ</InputLabel>
                <Select value={localSearchWorkType} label="Вид работ"
                  onChange={(e) => { setLocalSearchWorkType(e.target.value); }}
                  sx={{ borderRadius: 2 }}>
                  <MenuItem value=""><em>Все виды работ</em></MenuItem>
                  {workTypes?.map(wt => (
                    <MenuItem key={wt.id} value={wt.id}>{wt.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Notes */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 1.5 }}>
                📝 Примечания
              </Typography>
              <TextField size="small" fullWidth label="Поиск по примечаниям" value={localSearchNotes}
                onChange={(e) => { setLocalSearchNotes(e.target.value); }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>

            {/* Quantity range */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 1.5 }}>
                📏 Диапазон объёма
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <TextField size="small" label="От" type="number" fullWidth value={localMinQuantity}
                  onChange={(e) => { setLocalMinQuantity(e.target.value === '' ? '' : Number(e.target.value)); }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField size="small" label="До" type="number" fullWidth value={localMaxQuantity}
                  onChange={(e) => { setLocalMaxQuantity(e.target.value === '' ? '' : Number(e.target.value)); }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ 
            pt: 2, 
            borderTop: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)', 
            display: 'flex', gap: 1.5, mt: 2 
          }}>
            <Button fullWidth variant="outlined" onClick={handleResetFilters} sx={{ borderRadius: 2 }}>
              Сбросить
            </Button>
            <Button fullWidth variant="contained" onClick={handleApplyFilters} sx={{ borderRadius: 2 }}>
              Применить
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* ── Edit Dialog ── */}
      <Dialog open={editDialogOpen}
        onClose={() => { setEditDialogOpen(false); setSelectedWorkLog(null); }}
        maxWidth="md" fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 3, 
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #161b22 0%, #1c2128 100%)'
              : 'linear-gradient(135deg,#fff 0%,#f8f9fa 100%)',
            border: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : 'none',
          } 
        }}>
        <Box sx={{ 
          p: 3, 
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg,rgba(88, 166, 255, 0.12) 0%,rgba(108, 142, 255, 0.12) 100%)'
            : 'linear-gradient(135deg,rgba(2,136,209,0.08) 0%,rgba(3,169,244,0.08) 100%)',
          borderBottom: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon sx={{ mr: 2, color: 'info.main', fontSize: 26 }} />
            <Box>
              <Typography variant="h6" fontWeight={600} color="info.dark">✏️ Редактировать запись</Typography>
              <Typography variant="body2" color="text.secondary">Внесите изменения в существующую запись</Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={() => { setEditDialogOpen(false); setSelectedWorkLog(null); }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          {selectedWorkLog && (
            <WorkLogForm initialData={selectedWorkLog}
              onSuccess={() => { setEditDialogOpen(false); setSelectedWorkLog(null); }} mode="edit" />
          )}
        </DialogContent>
        <DialogActions sx={{ 
          p: 2, 
          borderTop: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)' 
        }}>
          <Button onClick={() => { setEditDialogOpen(false); setSelectedWorkLog(null); }}
            variant="outlined" sx={{ borderRadius: 2 }}>Отмена</Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Dialog ── */}
      <Dialog open={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setSelectedWorkLog(null); }}
        PaperProps={{ 
          sx: { 
            borderRadius: 3, 
            maxWidth: 480,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #161b22 0%, #1c2128 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : 'none',
          } 
        }}>
        <Box sx={{ 
          p: 3, 
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg,rgba(248, 81, 73, 0.12) 0%,rgba(218, 54, 51, 0.12) 100%)'
            : 'linear-gradient(135deg,rgba(211,47,47,0.08) 0%,rgba(244,67,54,0.08) 100%)',
          borderBottom: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DeleteIcon sx={{ mr: 2, color: 'error.main', fontSize: 26 }} />
            <Typography variant="h6" fontWeight={600} color="error.dark">🗑️ Удалить запись?</Typography>
          </Box>
          <IconButton size="small" onClick={() => { setDeleteDialogOpen(false); setSelectedWorkLog(null); }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <WarningIcon sx={{ color: 'warning.main', fontSize: 32, mt: 0.5 }} />
            <Box>
              <Typography variant="body1" gutterBottom>Это действие нельзя отменить.</Typography>
              {selectedWorkLog && (
                <Box sx={{ 
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.04)', 
                  p: 2, borderRadius: 2, mt: 1 
                }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">Дата</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatDate(selectedWorkLog.workDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">Исполнитель</Typography>
                      <Typography variant="body2" fontWeight={500}>{selectedWorkLog.workerName}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">Работа</Typography>
                      <Typography variant="body2" fontWeight={500}>{selectedWorkLog.workType.name}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2, 
          borderTop: (theme) => theme.palette.mode === 'dark' ? '1px solid #30363d' : '1px solid rgba(0,0,0,0.08)' 
        }}>
          <Button onClick={() => { setDeleteDialogOpen(false); setSelectedWorkLog(null); }}
            variant="outlined" sx={{ borderRadius: 2 }}>Отмена</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error"
            startIcon={<DeleteIcon />} sx={{ borderRadius: 2 }}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default WorkLogList;
