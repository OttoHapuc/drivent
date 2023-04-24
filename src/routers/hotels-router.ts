import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import * as hotelsController from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', hotelsController.findAll)
  .get('/:hotelId', hotelsController.findById);

export { hotelsRouter };