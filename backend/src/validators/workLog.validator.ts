import { z } from 'zod';

export const createWorkLogSchema = z.object({
  workDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата должна быть в формате YYYY-MM-DD'),
  workTypeId: z.string().uuid('Неверный формат ID вида работ'),
  quantity: z.number().positive('Количество должно быть положительным числом'),
  workerName: z.string().min(2, 'ФИО должно содержать минимум 2 символа').max(200, 'ФИО слишком длинное'),
  notes: z.string().optional(),
});

export const updateWorkLogSchema = createWorkLogSchema.partial();

export const workLogQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата должна быть в формате YYYY-MM-DD').optional(),
  workTypeId: z.string().uuid('Неверный формат ID вида работ').optional(),
  workerName: z.string().optional(),
  page: z.string().regex(/^\d+$/, 'Номер страницы должен быть числом').optional(),
  limit: z.string().regex(/^\d+$/, 'Лимит должен быть числом').optional(),
});

export type CreateWorkLogInput = z.infer<typeof createWorkLogSchema>;
export type UpdateWorkLogInput = z.infer<typeof updateWorkLogSchema>;
export type WorkLogQueryInput = z.infer<typeof workLogQuerySchema>;