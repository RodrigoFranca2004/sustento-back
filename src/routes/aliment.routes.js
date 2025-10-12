import { Router } from "express";
import {
  createAliment,
  listAliments,
  getAliment,
  updateAliment,
  deleteAliment,
  searchDbAliments,
  searchCombinedAliments,
} from "../controllers/aliment.controller.js";

const router = Router();

router.get("/search/combined", searchCombinedAliments);
router.get("/search/db", searchDbAliments);
router.post("/", createAliment);
router.get("/", listAliments);
router.get("/:id", getAliment);
router.put("/:id", updateAliment);
router.delete("/:id", deleteAliment);



export default router;
