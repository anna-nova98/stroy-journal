import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { useWorkLogs, useDeleteWorkLog } from '@/hooks/useWorkLogs';
import WorkLogForm from './WorkLogForm';
import { WorkLogWithDetails } from '@/types';

const WorkLogList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [searchWorker, setSearchWorker] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWorkLog, setSelectedWorkLog] = useState<WorkLogWithDetails | null>(null);

  const { data, isLoading, error } = useWorkLogs({
    date: searchDate ? format(searchDate, 'yyyy-MM-dd') : undefined,
    workerName: searchWorker || undefined,
    page: page + 1,
    limit: rowsPerPage,
  });

  const { mutate: deleteWorkLog } = useDeleteWorkLog();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedWorkLog(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedWorkLog(null);
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка при загрузке данных: {(error as any).message}
      </Alert>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Журнал работ</Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Фильтр по дате"
              value={searchDate}
              onChange={setSearchDate}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
            
            <TextField
              size="small"
              label="Поиск по ФИО"
              value={searchWorker}
              onChange={(e) => setSearchWorker(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Вид работ</TableCell>
                    <TableCell align="right">Объем</TableCell>
                    <TableCell>Исполнитель</TableCell>
                    <TableCell>Примечания</TableCell>
                    <TableCell align="center">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data.map((workLog) => (
                    <TableRow key={workLog.id} hover>
                      <TableCell>
                        {format(new Date(workLog.workDate), 'dd.MM.yyyy')}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{workLog.workType.name}</Typography>
                          <Chip
                            label={workLog.workType.unit}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="medium">
                          {workLog.quantity} {workLog.workType.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>{workLog.workerName}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: 200,
                          }}
                        >
                          {workLog.notes || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Редактировать">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(workLog)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(workLog)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
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
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Строк на странице:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} из ${count !== -1 ? count : `больше чем ${to}`}`
              }
            />
          </>
        )}
      </Paper>

      {/* Диалог редактирования */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Редактировать запись</DialogTitle>
        <DialogContent>
          {selectedWorkLog && (
            <WorkLogForm
              initialData={selectedWorkLog}
              onSuccess={handleCloseEditDialog}
              mode="edit"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Отмена</Button>
        </DialogActions>
      </Dialog>

      {/* Диалог удаления */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить запись от{' '}
            {selectedWorkLog && format(new Date(selectedWorkLog.workDate), 'dd.MM.yyyy')}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Отмена</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default WorkLogList;