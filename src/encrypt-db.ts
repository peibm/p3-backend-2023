import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

const resources = ["user", "dataset", "datasetUserPermission", "key"];

router.get(
  "/:resources",
  errorChecked(async (req, res) => {
    const resource_plural = req.params.resources
    const resource = resource_plural.slice(0,-1);
    if (!resources.includes(resource)) {
      return res.status(404).json({ error: "Resource not found" });
    }
    const result = await prisma[resource].findMany({});
    res.status(200).json({ [resource_plural]: result, ok: true });
  })
);

export default router;
