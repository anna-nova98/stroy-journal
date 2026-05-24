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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useCreateWorkLog, useUpdateWorkLog, useWorkTypes } from '@/hooks/useWorkLogs';
import { CreateWorkLogInput, WorkLogWithDetails } from '@/types';

const schema = yup.object({
  workDate: yup.date().required('Дата обязательна'),
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
    defaultValues: initialData || {
      workDate: new Date().toISOString().split('T')[0],
      workTypeId: '',
      quantity: 0,
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
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {mode === 'create' ? 'Добавить новую запись' : 'Редактировать запись'}
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ошибка: {(error as any).response?.data?.error || 'Неизвестная ошибка'}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Controller
                name="workDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Дата выполнения"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.workDate,
                        helperText: errors.workDate?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
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
                  >
                    {isLoadingTypes ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                      </MenuItem>
                    ) : (
                      workTypes?.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name} ({type.unit})
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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
                    rows={2}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                  disabled={isPending}
                >
                  Очистить
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  startIcon={isPending && <CircularProgress size={20} />}
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
      </Paper>
    </LocalizationProvider>
  );
};

export default WorkLogForm;