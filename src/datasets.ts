import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

// ---------- Dataset Routes ----------

router.get(
  "/",
  errorChecked(async (req, res) => {
    const datasets = await prisma.dataset.findMany();
    res.status(200).json({ datasets, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newDataset = await prisma.dataset.create({ data: req.body });
    res.status(201).json({ newDataset, ok: true });
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const dataset = await prisma.dataset.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(dataset);
  })
);

router.put(
  "/datasets/:id",
  errorChecked(async (req, res) => {
    const updatedDataset = await prisma.dataset.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedDataset);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const deletedDataset = await prisma.dataset.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(deletedDataset);
  })
);

router.get(
  "/:name",
  errorChecked(async (req, res) => {
    const dataset = await prisma.dataset.findUniqueOrThrow({where: {name: req.params.name}})
    if (dataset) {
      res.status(200).json(dataset);
    } else {
      res.status(404).json({ error: "Dataset not found" });
    }
  })
);

export default router;
