import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
    "/",
    errorChecked(async (req, res) => {
      const keys = await prisma.key.findMany();
      res.status(200).json({ keys, ok: true });
    })
  );
  
  router.post(
    "/",
    errorChecked(async (req, res) => {
      const newKey = await prisma.key.create({ data: req.body });
      res.status(201).json({ newKey, ok: true });
    })
  );
  
  router.get(
    "/:id",
    errorChecked(async (req, res) => {
      const key = await prisma.key.findUnique({ where: { id: Number(req.params.id) } });
      res.status(200).json(key);
    })
  );
  
  router.put(
    "/:id",
    errorChecked(async (req, res) => {
      const updatedKey = await prisma.key.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedKey);
    })
  );
  
  router.delete(
    "/:id",
    errorChecked(async (req, res) => {
      const deletedKey = await prisma.key.delete({ where: { id: Number(req.params.id) } });
      res.status(200).json(deletedKey);
    })
  );

  export default router;
