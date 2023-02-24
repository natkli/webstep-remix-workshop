import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEventList() {
  return prisma.event.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      creator: true,
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
      creator: true,
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
      creator: {
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
