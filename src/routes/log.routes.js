import { Router } from "express";
import { createLog } from "../controllers/log.controller.js";

const router = Router();

router.post("/", createLog);

export default router;