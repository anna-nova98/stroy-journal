import { apiClient } from './client';
import { WorkType } from '@/types';

export const workTypeApi = {
  // Получить все виды работ
  getAll: async (): Promise<WorkType[]> => {
    const response = await apiClient.get('/work-types');
    return response.data;
  },

  // Получить вид работ по ID
  getById: async (id: string): Promise<WorkType> => {
    const response = await apiClient.get(`/work-types/${id}`);
    return response.data;
  },
};