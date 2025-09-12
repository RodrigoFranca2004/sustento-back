import { Router } from "express";
import {
  register,
  login,
  requestPasswordReset,
  resetPassword
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/requestPasswordReset", requestPasswordReset);
router.put("/resetPassword", resetPassword)

export default router;
