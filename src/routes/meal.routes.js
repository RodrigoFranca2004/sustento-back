import { Router } from "express";

import {
    createMeal,
    listMeals,
    getMeal,
    updateMeal,
    deleteMeal,
    getMealAliments
} from "../controllers/meal.controller.js";

const router = Router();

router.post("/", createMeal);
router.get("/", listMeals);
router.get("/:id", getMeal);
router.get("/:id/aliments", getMealAliments);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);

export default router;