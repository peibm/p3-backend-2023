import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

await prisma.user.create({
    data: {
        email: "pepito@g.com",
        group: "marketing",
        name: "Jose",
        surname: "Doe"
    }
})
await prisma.dataset.create({
    data: {
        name: "sells_2023",
        owner: "pepito@g.com",

    }
})