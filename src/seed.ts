import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const user1 = await prisma.user.create({
  data: {
    email: "jorgito@g.com",
    group: "pricing",
    name: "Jorge",
    surname: "Doe",
  },
});
const user2 = await prisma.user.create({
  data: {
    email: "pablito@g.com",
    group: "admin",
    name: "Pablo",
    surname: "Mena",
  },
});

console.log(`Created users: ${user1.email} , ${user2.email}`);

const dataset1 = await prisma.dataset.create({
  data: {
    name: "sells_2023",
    owner: "carlos@g.com",
  },
});
console.log(`Created dataset: ${dataset1.name}`);

const key1 = await prisma.key.create({
  data: {
    value: "dspihfuexampleds725sd@9x/",
    datasetId: dataset1.id,
  },
});
console.log(`Created key for dataset ${dataset1.name}!`);

await prisma.datasetUserPermission.create({
  data: {
    userId: user1.email,
    datasetId: dataset1.id,
  },
});
console.log(`Permission given to ${user1.email} for dataset ${dataset1.name}`);

await prisma.datasetUserPermission.create({
  data: {
    userId: user2.email,
    datasetId: dataset1.id,
  },
});
console.log(`Permission given to ${user2.email} for dataset ${dataset1.name}`);
