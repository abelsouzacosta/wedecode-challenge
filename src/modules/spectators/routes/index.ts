import { Router } from 'express';
import SpectatorsController from '../controllers/SpectatorsController';

const spectatorsRouter = Router();
const controller = new SpectatorsController();

spectatorsRouter.get('/', controller.index);

spectatorsRouter.post('/', controller.create);

spectatorsRouter.post('/:spectator_id/set_watched', controller.attach);

export { spectatorsRouter };
