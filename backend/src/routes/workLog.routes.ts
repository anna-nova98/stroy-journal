import { Router } from 'express';
import { workLogController } from '@/controllers/workLog.controller';

const router = Router();

router.get('/', workLogController.getAll.bind(workLogController));
router.get('/:id', workLogController.getById.bind(workLogController));
router.post('/', workLogController.create.bind(workLogController));
router.put('/:id', workLogController.update.bind(workLogController));
router.delete('/:id', workLogController.delete.bind(workLogController));

export default router;