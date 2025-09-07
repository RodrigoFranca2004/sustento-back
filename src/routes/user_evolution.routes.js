import { Router } from "express";
import {
  createUserEvolution,
  listUserEvolutions,
  getUserEvolution,
  updateUserEvolution,
  deleteUserEvolution,
} from "../controllers/user_evolution.controller.js";

const router = Router();

router.post("/", createUserEvolution);
router.get("/", listUserEvolutions);
router.get("/:id", getUserEvolution);
router.put("/:id", updateUserEvolution);
router.delete("/:id", deleteUserEvolution);

export default router;
