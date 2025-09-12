import { Router } from "express";

import {
    createMealAliment,
    listMealAliments,
    getMealAliment,
    updateMealAliment,
    deleteMealAliment
} from "../controllers/mealAliment.controller.js";

const router = Router();

router.post("/", createMealAliment);
router.get("/", listMealAliments);
router.get("/:id", getMealAliment);
router.put("/:id", updateMealAliment);
router.delete("/:id", deleteMealAliment);

export default router;