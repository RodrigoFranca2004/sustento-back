import { Router } from "express";
import {
  createRestriction,
  listRestrictions,
  getRestriction,
  updateRestriction,
  deleteRestriction,
} from "../controllers/restriction.controller.js";

const router = Router();

router.post("/", createRestriction);
router.get("/", listRestrictions);
router.get("/:id", getRestriction);
router.put("/:id", updateRestriction);
router.delete("/:id", deleteRestriction);

export default router;
