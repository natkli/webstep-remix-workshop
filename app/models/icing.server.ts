import { User, Event } from "@prisma/client";
import { prisma } from "~/db.server";

export function createIcing(
  eventId: Event["id"],
  winnerId: User["id"],
  loserId: User["id"],
  userId: User["id"]
) {
  return prisma.icing.create({
    data: {
      event: {
        connect: {
          id: eventId,
        },
      },
      winner: {
        connect: {
          id: winnerId,
        },
      },
      loser: {
        connect: {
          id: loserId,
        },
      },
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
