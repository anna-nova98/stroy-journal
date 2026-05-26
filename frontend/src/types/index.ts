export interface WorkType {
  id: string;
  name: string;
  description?: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkLog {
  id: string;
  workDate: string;
  workTypeId: string;
  quantity: number;
  workerName: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  workType: WorkType;
}

export interface WorkLogWithDetails extends WorkLog {
  workType: WorkType;
}

export interface CreateWorkLogInput {
  workDate: string;
  workTypeId: string;
  quantity: number;
  workerName: string;
  notes?: string;
}

export interface UpdateWorkLogInput extends Partial<CreateWorkLogInput> {}

export interface WorkLogQueryParams {
  date?: string;
  workTypeId?: string;
  workerName?: string;
  notes?: string;
  minQuantity?: string;
  maxQuantity?: string;
  page?: number;
  limit?: number;
  sortBy?: 'workDate' | 'quantity' | 'workerName' | 'workType.name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  dateRange?: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'completed' | 'pending';
  priority?: 'low' | 'medium' | 'high';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  details?: string;
}