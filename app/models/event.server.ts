import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEventList() {
  return prisma.event.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      owner: true,
      createdAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function getEvent(id: Event["id"]) {
  return prisma.event.findFirst({
    select: {
      id: true,
      title: true,
      location: true,
      createdAt: true,
      owner: true,
      icings: {
        select: {
          id: true,
          winner: {
            select: {
              name: true,
              username: true,
              avatarId: true,
            },
          },
          loser: {
            select: {
              name: true,
              username: true,
              avatarId: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where: { id },
  });
}

export function createEvent(
  userId: User["id"],
  title: Event["title"],
  location: Event["location"]
) {
  return prisma.event.create({
    data: {
      title,
      location,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteEvent(id: Event["id"], userId: User["id"]) {
  return prisma.event.deleteMany({
    where: { id, userId },
  });
}
