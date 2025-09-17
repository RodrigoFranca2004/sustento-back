import express from "express";
import { searchFoodController } from "../controllers/apiFatSecret.controller.js";

const router = express.Router();

router.get("/search", searchFoodController);

export default router;
