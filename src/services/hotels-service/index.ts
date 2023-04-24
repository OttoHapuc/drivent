import * as hotelsRepository from '@/repositories/hotels-repository';
import * as error from '@/errors';

export async function findAll(userId: number) {
  const Ticket = await hotelsRepository.verifyTicket(userId);
  if (!Ticket) throw error.notFoundError();
  if (
    Ticket.status !== 'PAID' ||
    Ticket.TicketType.includesHotel === false ||
    Ticket.TicketType.isRemote === true
  ) throw error.paymentRequired();
  const hotels = await hotelsRepository.getAll();
  if (hotels.length === 0 || !hotels) throw error.notFoundError();
  return hotels;
}

export async function findById(userId: number, hotelId: number) {
  const Ticket = await hotelsRepository.verifyTicket(userId);
  if (!Ticket) throw error.notFoundError();
  if (
    Ticket.status !== 'PAID' ||
    Ticket.TicketType.includesHotel === false ||
    Ticket.TicketType.isRemote === true
  ) throw error.paymentRequired();
  const hotels = await hotelsRepository.getById(hotelId);
  if (!hotels) throw error.notFoundError();

  return hotels;
}