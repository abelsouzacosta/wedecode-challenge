import { Router } from 'express';
import SpectatorsController from '../controllers/SpectatorsController';

const spectatorsRouter = Router();
const controller = new SpectatorsController();

spectatorsRouter.get('/', controller.index);

spectatorsRouter.post('/', controller.create);

export { spectatorsRouter };
