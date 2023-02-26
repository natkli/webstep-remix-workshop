import { PrismaClient } from "@prisma/client";
import { getHashedPassword, mockUsersList } from "./mocks";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const hashedPassword = await getHashedPassword("racheliscool");

  // Create test user
  const rachel = await prisma.user.create({
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

  const usersList = [];

  // Create nine more users
  for (let user of mockUsersList) {
    const { email, name, username, avatarId, password } = user;
    const hash = await getHashedPassword(password);

    const mockUser = await prisma.user.create({
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

    // Storing created usersId
    usersList.push(mockUser.id);
  }

  // Create Hemsedal events
  const hemsedalEvent = await prisma.event.create({
    data: {
      title: "Hemsedal - Save the date",
      location: "Hemsedal",
      userId: rachel.id,
    },
  });

  // Add first icing to Hemsedal event
  await prisma.icing.create({
    data: {
      event: {
        connect: {
          id: hemsedalEvent.id,
        },
      },
      winner: {
        connect: {
          id: usersList[0],
        },
      },
      loser: {
        connect: {
          id: usersList[1],
        },
      },
      owner: {
        connect: {
          id: rachel.id,
        },
      },
    },
  });

  // Add second icing to Hemsedal event
  await prisma.icing.create({
    data: {
      event: {
        connect: {
          id: hemsedalEvent.id,
        },
      },
      winner: {
        connect: {
          id: usersList[2],
        },
      },
      loser: {
        connect: {
          id: usersList[3],
        },
      },
      owner: {
        connect: {
          id: rachel.id,
        },
      },
    },
  });

  // Create Nice Event
  const niceEvent = await prisma.event.create({
    data: {
      title: "Nice - Save the date",
      location: "Nice",
      userId: rachel.id,
    },
  });

  // Add first icing to Nice event
  await prisma.icing.create({
    data: {
      event: {
        connect: {
          id: niceEvent.id,
        },
      },
      winner: {
        connect: {
          id: usersList[3],
        },
      },
      loser: {
        connect: {
          id: usersList[5],
        },
      },
      owner: {
        connect: {
          id: rachel.id,
        },
      },
    },
  });

  // Add second icing to Nice event
  await prisma.icing.create({
    data: {
      event: {
        connect: {
          id: niceEvent.id,
        },
      },
      winner: {
        connect: {
          id: usersList[3],
        },
      },
      loser: {
        connect: {
          id: usersList[8],
        },
      },
      owner: {
        connect: {
          id: rachel.id,
        },
      },
    },
  });

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
