import { Router } from "express";
import {
  createMealPlan,
  listMealPlans,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan,
} from "../controllers/mealPlan.controller.js";

const router = Router();

router.post("/", createMealPlan);
router.get("/", listMealPlans);
router.get("/:id", getMealPlan);
router.put("/:id", updateMealPlan);
router.delete("/:id", deleteMealPlan);

export default router;
