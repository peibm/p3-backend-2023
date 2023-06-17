import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const datasetUserPermissions =
      await prisma.datasetUserPermission.findMany();
    res.status(200).json({ datasetUserPermissions, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newDatasetUserPermission = await prisma.datasetUserPermission.create({
      data: req.body,
    });
    res.status(201).json({ newDatasetUserPermission, ok: true });
  })
);

router.delete(
  "/:datasetId/:userId",
  errorChecked(async (req, res) => {
    const deletedDatasetUserPermission =
      await prisma.datasetUserPermission.delete({
        where: {
          datasetId_userId: {
            datasetId: Number(req.params.datasetId),
            userId: req.params.userId,
          },
        },
      });
    res.status(200).json(deletedDatasetUserPermission);
  })
);

export default router;
