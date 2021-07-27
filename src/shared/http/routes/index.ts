import { Router } from 'express';
import { movieRouter } from '@modules/movies/routes';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Olá mundo',
  });
});

router.use('/movies', movieRouter);

export { router };
