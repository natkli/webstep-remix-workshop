import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEvent({
  id,
  userId,
}: Pick<Event, "id"> & {
  userId: User["id"];
}) {
  return prisma.event.findFirst({
    select: { id: true, title: true, location: true },
    where: { id, userId },
  });
}

export function createEvent({
  title,
  location,
  userId,
}: Pick<Event, "title" | "location"> & {
  userId: User["id"];
}) {
  return prisma.event.create({
    data: {
      title,
      location,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
