import { Request, Response } from 'express';
import { workTypeService } from '@/services/workType.service';

export class WorkTypeController {
  async getAll(req: Request, res: Response) {
    try {
      const workTypes = await workTypeService.findAll();
      res.json(workTypes);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении видов работ' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const workType = await workTypeService.findById(id);
      
      if (!workType) {
        return res.status(404).json({ error: 'Вид работ не найден' });
      }
      
      res.json(workType);
    } catch (error) {
      res.status(400).json({ error: 'Неверный формат ID' });
    }
  }
}

export const workTypeController = new WorkTypeController();