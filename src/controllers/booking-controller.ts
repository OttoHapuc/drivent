import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingsServices } from '@/services';

export async function findAllBookingByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const bookings = await bookingsServices.findAllBookingByUserId(userId);
    res.send(bookings);
  } catch (e) {
    if (e.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function insertBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const booking = await bookingsServices.insertBooking(userId, roomId);
    return res.send(booking);
  } catch (e) {
    if (e.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (e.name === 'this element is not available') return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.query;
  try {
    const upBooking = await bookingsServices.upBookingById(userId, Number(bookingId), roomId);
    return res.send(upBooking);
  } catch (e) {
    if (e.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (e.name === 'this element is not available') return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
