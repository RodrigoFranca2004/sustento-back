import { Router } from "express";
import {
  createMealRecord,
  listMealRecords,
  getMealRecord,
  updateMealRecord,
  deleteMealRecord,
} from "../controllers/mealRecord.controller.js";

const router = Router();

router.post("/", createMealRecord);
router.get("/", listMealRecords);
router.get("/:id", getMealRecord);
router.put("/:id", updateMealRecord);
router.delete("/:id", deleteMealRecord);

export default router;
