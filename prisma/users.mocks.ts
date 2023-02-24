import bcrypt from "bcryptjs";

export async function getHashedPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export const usersList = [
  {
    name: "Odin Emmerhoff",
    username: "odem",
    avatarId: "avatar1",
    password: "odiniscool",
    email: "odin@remix.run",
  },
  {
    name: "Oda Lunde",
    username: "odld",
    avatarId: "avatar2",
    password: "odaiscool",
    email: "oda@remix.run",
  },
  {
    name: "Aksel Moe",
    username: "aksm",
    avatarId: "avatar3",
    password: "akseliscool",
    email: "aksel@remix.run",
  },
  {
    name: "Ellinor Eriksen",
    username: "elle",
    avatarId: "avatar4",
    password: "allinoriscool",
    email: "ellinor@remix.run",
  },
  {
    name: "Leo Rasmussen",
    username: "leor",
    avatarId: "avatar5",
    password: "leoiscool",
    email: "leo@remix.run",
  },
  {
    name: "Saga Lund",
    username: "saga",
    avatarId: "avatar6",
    password: "sagaiscool",
    email: "saga@remix.run",
  },
  {
    name: "Olav Lien",
    username: "olov",
    avatarId: "avatar7",
    password: "olaviscool",
    email: "olav@remix.run",
  },
  {
    name: "Hanna Holm",
    username: "hhnn",
    avatarId: "avatar8",
    password: "hanneiscool",
    email: "hanne@remix.run",
  },
  {
    name: "Oskar Henriksen ",
    username: "oska",
    avatarId: "avatar9",
    password: "oskariscool",
    email: "oskar@remix.run",
  },
];
