import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import { randomInt } from "~/utils";

export type { User } from "@prisma/client";

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      avatarId: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  email: User["email"],
  username: User["username"],
  name: User["name"],
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const randomId = randomInt();
  const avatarId = `avatar${randomId}`;

  return prisma.user.create({
    data: {
      email,
      avatarId,
      name,
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export function getUsersRank() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      avatarId: true,
      icingWins: true,
      icingLoses: true,
    },
    orderBy: {
      icingWins: {
        _count: "desc",
      },
    },
  });
}
