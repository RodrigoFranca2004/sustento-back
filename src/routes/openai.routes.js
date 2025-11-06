import { Router } from "express";
import { suggestDiet } from "../controllers/openai.controller.js";

const router = Router();
router.post("/diet-suggestion", suggestDiet);

export default router;
