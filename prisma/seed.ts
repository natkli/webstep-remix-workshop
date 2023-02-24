import { PrismaClient } from "@prisma/client";
import { getHashedPassword, usersList } from "./users.mocks";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  const hashedPassword = await getHashedPassword("racheliscool");

  const user = await prisma.user.create({
    data: {
      email,
      avatarId: "avatar0",
      name: "Rachel Jakobsen",
      username: "rach",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.event.create({
    data: {
      title: "Hemsedal - Save the date",
      location: "Hemsedal",
      userId: user.id,
    },
  });

  await prisma.event.create({
    data: {
      title: "Nice - Save the date",
      location: "Nice",
      userId: user.id,
    },
  });

  for (let user of usersList) {
    const { email, name, username, avatarId, password } = user;
    const hash = await getHashedPassword(password);

    await prisma.user.create({
      data: {
        email,
        name,
        username,
        avatarId,
        password: {
          create: {
            hash,
          },
        },
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
