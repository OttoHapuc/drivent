import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function bookingsByUserId(userId: number) {
  return await prisma.booking.findFirst({ where: { userId: userId }, include: { Room: true } });
}

export async function findRoom(roomId: number): Promise<Room> {
  return await prisma.room.findUnique({ where: { id: roomId } });
}

export async function findBookingsOfRoom(roomId: number) {
  return await prisma.booking.count({ where: { roomId } });
}

export async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({ data: { userId, roomId } });
}

export async function upBooking(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: { id: bookingId },
    data: { roomId },
  });
}
