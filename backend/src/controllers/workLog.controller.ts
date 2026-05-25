import { Request, Response } from 'express';
import { workLogService } from '@/services/workLog.service';
import {
  createWorkLogSchema,
  updateWorkLogSchema,
  workLogQuerySchema,
} from '@/validators/workLog.validator';

export class WorkLogController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const query = workLogQuerySchema.parse(req.query);
      const result = await workLogService.findAll(query);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Неверные параметры запроса' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const workLog = await workLogService.findById(id);
      
      if (!workLog) {
        res.status(404).json({ error: 'Запись не найдена' });
        return;
      }
      
      res.json(workLog);
    } catch (error) {
      res.status(400).json({ error: 'Неверный формат ID' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = createWorkLogSchema.parse(req.body);
      const workLog = await workLogService.create(data);
      res.status(201).json(workLog);
    } catch (error) {
      res.status(400).json({ error: 'Неверные данные' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = updateWorkLogSchema.parse(req.body);
      
      const existingWorkLog = await workLogService.findById(id);
      if (!existingWorkLog) {
        res.status(404).json({ error: 'Запись не найдена' });
        return;
      }
      
      const updatedWorkLog = await workLogService.update(id, data);
      res.json(updatedWorkLog);
    } catch (error) {
      res.status(400).json({ error: 'Неверные данные' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const existingWorkLog = await workLogService.findById(id);
      if (!existingWorkLog) {
        res.status(404).json({ error: 'Запись не найдена' });
        return;
      }
      
      await workLogService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Неверный формат ID' });
    }
  }
}

export const workLogController = new WorkLogController();