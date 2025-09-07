import { Router } from "express";
import {
  createAliment,
  listAliments,
  getAliment,
  updateAliment,
  deleteAliment,
} from "../controllers/aliment.controller.js";

const router = Router();

router.post("/", createAliment);
router.get("/", listAliments);
router.get("/:id", getAliment);
router.put("/:id", updateAliment);
router.delete("/:id", deleteAliment);

export default router;
