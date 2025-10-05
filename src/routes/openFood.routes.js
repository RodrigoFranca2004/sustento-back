import express from "express";
import { searchAliment } from "../controllers/openFood.controller.js";

const router = express.Router();

router.get("/search", searchAliment);

export default router;
