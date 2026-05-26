import { Router } from 'express';
import { workTypeController } from '../controllers/workType.controller';

const router = Router();

router.get('/', workTypeController.getAll.bind(workTypeController));
router.get('/:id', workTypeController.getById.bind(workTypeController));

export default router;
