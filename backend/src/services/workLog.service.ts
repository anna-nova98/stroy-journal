import prisma from '../utils/database';
import { CreateWorkLogInput, UpdateWorkLogInput, WorkLogQueryInput } from '../validators/workLog.validator';

export class WorkLogService {
  async findAll(query: WorkLogQueryInput) {
    const {
      date,
      workTypeId,
      workerName,
      notes,
      minQuantity,
      maxQuantity,
      page = '1',
      limit = '20',
      sortBy = 'workDate',
      sortOrder = 'desc',
      startDate,
      endDate,
    } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    // Handle date range (startDate and endDate)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Include the end date
      
      where.workDate = {
        gte: start,
        lt: end,
      };
    } else if (date) {
      // Single date filter
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      where.workDate = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (workTypeId) {
      where.workTypeId = workTypeId;
    }

    if (workerName) {
      where.workerName = {
        contains: workerName,
        mode: 'insensitive' as any,
      };
    }

    if (notes) {
      where.notes = {
        contains: notes,
        mode: 'insensitive' as any,
      };
    }

    if (minQuantity || maxQuantity) {
      where.quantity = {};
      
      if (minQuantity) {
        where.quantity.gte = parseFloat(minQuantity);
      }
      
      if (maxQuantity) {
        where.quantity.lte = parseFloat(maxQuantity);
      }
    }

    // Build orderBy based on sort parameters
    const orderBy: any = {};
    if (sortBy === 'workType.name') {
      orderBy.workType = {
        name: sortOrder,
      };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    const [workLogs, total] = await Promise.all([
      prisma.workLog.findMany({
        where,
        include: {
          workType: true,
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.workLog.count({ where }),
    ]);

    return {
      data: workLogs,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        sortBy,
        sortOrder,
      },
    };
  }

  async findById(id: string) {
    return prisma.workLog.findUnique({
      where: { id },
      include: {
        workType: true,
      },
    });
  }

  async create(data: CreateWorkLogInput) {
    const workDate = new Date(data.workDate);
    
    return prisma.workLog.create({
      data: {
        ...data,
        workDate,
      },
      include: {
        workType: true,
      },
    });
  }

  async update(id: string, data: UpdateWorkLogInput) {
    const updateData: any = { ...data };
    
    if (data.workDate) {
      updateData.workDate = new Date(data.workDate);
    }

    return prisma.workLog.update({
      where: { id },
      data: updateData,
      include: {
        workType: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.workLog.delete({
      where: { id },
    });
  }
}

export const workLogService = new WorkLogService();
