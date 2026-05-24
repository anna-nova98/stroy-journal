import prisma from '@/utils/database';

export class WorkTypeService {
  async findAll() {
    return prisma.workType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.workType.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; description?: string; unit: string }) {
    return prisma.workType.create({
      data,
    });
  }

  async update(id: string, data: { name?: string; description?: string; unit?: string }) {
    return prisma.workType.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.workType.delete({
      where: { id },
    });
  }
}

export const workTypeService = new WorkTypeService();