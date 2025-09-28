import { Router } from "express";
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  listMyEvolution,
} from "../controllers/user.controller.js";

const router = Router();

// crud
router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/evolution/:id", listMyEvolution);

export default router;
