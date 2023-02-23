import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEvent({ id }: Pick<Event, "id">) {
  return prisma.event.findFirst({
    select: {
      id: true,
      title: true,
      location: true,
      createdAt: true,
      createdBy: true,
    },
    where: { id },
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
      createdBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteEvent({
  id,
  userId,
}: Pick<Event, "id"> & { userId: User["id"] }) {
  return prisma.event.deleteMany({
    where: { id, userId },
  });
}
