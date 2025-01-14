import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // If user does not exist, create a new one
    const newUser = await prisma.user.create({
      data: req.body,
    });

    res.status(201).json(newUser);
  })
);

router.get(
  "/:email",
  errorChecked(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

router.put(
  "/:email",
  errorChecked(async (req, res) => {
    const updatedUser = await prisma.user.update({
      where: { email: req.params.email },
      data: req.body,
    });
    res.status(200).json(updatedUser);
  })
);

router.delete(
  "/:email",
  errorChecked(async (req, res) => {
    const deletedUser = await prisma.user.delete({
      where: { email: req.params.email },
    });
    res.status(200).json(deletedUser);
  })
);

export default router;
