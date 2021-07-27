import { Router } from 'express';
import MovieController from '../controllers/MovieController';

const movieRouter = Router();
const controller = new MovieController();

movieRouter.get('/', controller.index);

movieRouter.post('/', controller.create);

movieRouter.get('/:id', controller.details);

export { movieRouter };
