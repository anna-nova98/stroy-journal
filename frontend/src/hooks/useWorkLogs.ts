import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workLogApi } from '@/api/workLog.api';
import { workTypeApi } from '@/api/workType.api';
import { WorkLogQueryParams, CreateWorkLogInput, UpdateWorkLogInput } from '@/types';

export const useWorkLogs = (params?: WorkLogQueryParams) => {
  return useQuery({
    queryKey: ['workLogs', params],
    queryFn: () => workLogApi.getAll(params),
  });
};

export const useWorkLog = (id: string) => {
  return useQuery({
    queryKey: ['workLog', id],
    queryFn: () => workLogApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateWorkLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workLogApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workLogs'] });
    },
  });
};

export const useUpdateWorkLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkLogInput }) =>
      workLogApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workLogs'] });
      queryClient.invalidateQueries({ queryKey: ['workLog', data.id] });
    },
  });
};

export const useDeleteWorkLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workLogApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workLogs'] });
    },
  });
};

export const useWorkTypes = () => {
  return useQuery({
    queryKey: ['workTypes'],
    queryFn: workTypeApi.getAll,
    staleTime: Infinity, // Справочник редко меняется
  });
};