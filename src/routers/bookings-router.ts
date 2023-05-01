import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findAllBookingByUserId, insertBooking, updateBooking } from '@/controllers';

const BookingsRouter = Router();

BookingsRouter.all('/*', authenticateToken)
  .get('/', findAllBookingByUserId)
  .post('/', insertBooking)
  .put('/:bookingId', updateBooking);

export { BookingsRouter };
