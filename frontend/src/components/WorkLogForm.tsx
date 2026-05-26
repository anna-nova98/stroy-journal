import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import {
  Assignment,
  Construction,
  Group,
  Description,
  Clear as ClearIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useCreateWorkLog, useUpdateWorkLog, useWorkTypes } from '@/hooks/useWorkLogs';
import { CreateWorkLogInput, WorkLogWithDetails } from '@/types';

// Helper function to format date for form (YYYY-MM-DD)
const formatDateForForm = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const schema = yup.object({
  workDate: yup.string().required('Дата обязательна'),
  workTypeId: yup.string().required('Вид работ обязателен'),
  quantity: yup
    .number()
    .positive('Количество должно быть положительным')
    .required('Количество обязательно'),
  workerName: yup
    .string()
    .min(2, 'ФИО должно содержать минимум 2 символа')
    .max(200, 'ФИО слишком длинное')
    .required('ФИО обязательно'),
  notes: yup.string(),
});

interface WorkLogFormProps {
  initialData?: WorkLogWithDetails;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

const WorkLogForm = ({ initialData, onSuccess, mode = 'create' }: WorkLogFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { data: workTypes, isLoading: isLoadingTypes } = useWorkTypes();
  const { mutate: createWorkLog, isPending: isCreating, error: createError } = useCreateWorkLog();
  const { mutate: updateWorkLog, isPending: isUpdating, error: updateError } = useUpdateWorkLog();

  const isPending = mode === 'create' ? isCreating : isUpdating;
  const error = mode === 'create' ? createError : updateError;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWorkLogInput>({
    resolver: yupResolver(schema),
    defaultValues: initialData ? {
      workDate: initialData.workDate.split('T')[0], // Extract YYYY-MM-DD from ISO string
      workTypeId: initialData.workTypeId,
      quantity: initialData.quantity,
      workerName: initialData.workerName,
      notes: initialData.notes || '',
    } : {
      workDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
      workTypeId: '',
      quantity: 1, // Changed from 0 to 1 to pass validation
      workerName: '',
      notes: '',
    },
  });

  const onSubmit = (data: CreateWorkLogInput) => {
    const formattedData = {
      ...data,
      workDate: data.workDate,
    };

    if (mode === 'create') {
      createWorkLog(formattedData, {
        onSuccess: () => {
          setSuccessMessage('Запись успешно добавлена!');
          reset();
          onSuccess?.();
          setTimeout(() => setSuccessMessage(''), 3000);
        },
      });
    } else if (mode === 'edit' && initialData?.id) {
      updateWorkLog(
        { id: initialData.id, data: formattedData },
        {
          onSuccess: () => {
            setSuccessMessage('Запись успешно обновлена!');
            onSuccess?.();
            setTimeout(() => setSuccessMessage(''), 3000);
          },
        }
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          p: 2,
          background: mode === 'create' 
            ? 'linear-gradient(135deg, #2e7d3215 0%, #4caf5015 100%)' 
            : 'linear-gradient(135deg, #0288d115 0%, #03a9f415 100%)',
          borderRadius: 2,
        }}>
          <Box sx={{ 
            backgroundColor: mode === 'create' ? 'success.main' : 'info.main',
            borderRadius: 2,
            p: 1.5,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {mode === 'create' ? (
              <Assignment sx={{ color: 'white', fontSize: 24 }} />
            ) : (
              <EditIcon sx={{ color: 'white', fontSize: 24 }} />
            )}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {mode === 'create' ? '➕ Добавить новую запись' : '✏️ Редактировать запись'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mode === 'create' 
                ? 'Заполните форму для добавления новой работы' 
                : 'Внесите изменения в существующую запись'}
            </Typography>
          </Box>
        </Box>

        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'success.light',
            }}
            icon={<Assignment />}
          >
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'error.light',
            }}
          >
            ��шибка: {(error as any).response?.data?.error || 'Неизвестная ошибка'}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Controller
                name="workDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Дата выполнения"
                    value={field.value ? new Date(field.value + 'T00:00:00') : null} // Add time to avoid timezone issues
                    onChange={(date) => {
                      if (date) {
                        // Format date as YYYY-MM-DD in local timezone
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        field.onChange(`${year}-${month}-${day}`);
                      } else {
                        field.onChange('');
                      }
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.workDate,
                        helperText: errors.workDate?.message,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Controller
                name="workTypeId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Вид работ"
                    fullWidth
                    error={!!errors.workTypeId}
                    helperText={errors.workTypeId?.message}
                    disabled={isLoadingTypes}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  >
                    {isLoadingTypes ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                      </MenuItem>
                    ) : (
                      workTypes?.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Construction sx={{ mr: 1, fontSize: 18, color: 'primary.main' }} />
                            <Box>
                              <Typography variant="body2">{type.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {type.unit}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Количество"
                    fullWidth
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="caption" color="text.secondary">
                            ед.
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="workerName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ФИО исполнителя"
                    fullWidth
                    error={!!errors.workerName}
                    helperText={errors.workerName?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Group sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Примечания"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Description sx={{ color: 'text.secondary', mt: 1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 2,
                pt: 2,
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                  disabled={isPending}
                  startIcon={<ClearIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Очистить
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  startIcon={isPending ? <CircularProgress size={20} /> : mode === 'create' ? <AddIcon /> : <SaveIcon />}
                  sx={{ 
                    borderRadius: 2,
                    background: mode === 'create' 
                      ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' 
                      : 'linear-gradient(135deg, #0288d1 0%, #03a9f4 100%)',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }
                  }}
                >
                  {isPending
                    ? mode === 'create'
                      ? 'Добавление...'
                      : 'Сохранение...'
                    : mode === 'create'
                    ? 'Добавить запись'
                    : 'Сохранить изменения'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default WorkLogForm;