import { TicketStatus } from '@prisma/client';
import {
  bookingsByUserId,
  createBooking,
  findRoom,
  findBookingsOfRoom,
  upBooking,
} from '@/repositories/bookings-repository';
import { unavailable, notFoundError, unauthorizedError } from '@/errors';
import * as hotelRepository from '@/repositories/hotels-repository';

export async function findAllBookingByUserId(userId: number) {
  const bookings = await bookingsByUserId(userId);
  if (!bookings) throw notFoundError();
  return { id: bookings.id, Room: bookings.Room };
}

export async function insertBooking(userId: number, roomId: number) {
  const ticketUser = await hotelRepository.verifyTicket(userId);
  if (
    ticketUser.status === TicketStatus.RESERVED ||
    ticketUser.TicketType.isRemote === true ||
    ticketUser.TicketType.includesHotel === false
  )
    throw unavailable();
  const Room = await findRoom(roomId);
  if (!Room) throw notFoundError();
  const capacity = await findBookingsOfRoom(roomId);
  if (Room.capacity <= capacity) throw unavailable();
  const booking = await createBooking(userId, roomId);
  return { bookingId: booking.id };
}

export async function upBookingById(userId: number, bookingId: number, roomId: number) {
  const ticketUser = await hotelRepository.verifyTicket(userId);
  if (
    ticketUser.status === TicketStatus.RESERVED ||
    ticketUser.TicketType.isRemote === true ||
    ticketUser.TicketType.includesHotel === false
  )
    throw unavailable();
  const Room = await findRoom(roomId);
  if (!Room) throw notFoundError();
  const capacity = await findBookingsOfRoom(roomId);
  if (Room.capacity <= capacity) throw unavailable();

  const bookings = await bookingsByUserId(userId);
  if (!bookings) throw unavailable();

  const bookingUp = await upBooking(bookings.id, roomId);
  return { bookingId: bookingUp.id };
}
