import { Router } from "express";
import { createLog, listLogs, getLog, updateLog, deleteLog } from "../controllers/log.controller.js";

const router = Router();

router.post("/", createLog);
router.get("/", listLogs);
router.get("/:id", getLog);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);

export default router;