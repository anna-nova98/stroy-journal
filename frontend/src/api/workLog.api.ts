import { apiClient } from './client';
import {
  WorkLog,
  WorkLogWithDetails,
  CreateWorkLogInput,
  UpdateWorkLogInput,
  WorkLogQueryParams,
  PaginatedResponse,
} from '@/types';

export const workLogApi = {
  // Получить список записей с пагинацией и фильтрацией
  getAll: async (params?: WorkLogQueryParams): Promise<PaginatedResponse<WorkLogWithDetails>> => {
    const response = await apiClient.get('/work-logs', { params });
    return response.data;
  },

  // Получить запись по ID
  getById: async (id: string): Promise<WorkLogWithDetails> => {
    const response = await apiClient.get(`/work-logs/${id}`);
    return response.data;
  },

  // Создать новую запись
  create: async (data: CreateWorkLogInput): Promise<WorkLogWithDetails> => {
    const response = await apiClient.post('/work-logs', data);
    return response.data;
  },

  // Обновить запись
  update: async (id: string, data: UpdateWorkLogInput): Promise<WorkLogWithDetails> => {
    const response = await apiClient.put(`/work-logs/${id}`, data);
    return response.data;
  },

  // Удалить запись
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/work-logs/${id}`);
  },
};