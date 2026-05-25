import { Request, Response } from 'express';
import { workTypeService } from '@/services/workType.service';

export class WorkTypeController {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const workTypes = await workTypeService.findAll();
      res.json(workTypes);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении видов работ' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const workType = await workTypeService.findById(id);
      
      if (!workType) {
        res.status(404).json({ error: 'Вид работ не найден' });
        return;
      }
      
      res.json(workType);
    } catch (error) {
      res.status(400).json({ error: 'Неверный формат ID' });
    }
  }
}

export const workTypeController = new WorkTypeController();