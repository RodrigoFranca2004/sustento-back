import { Router } from "express";
import {
  register,
  login,
  requestPasswordReset,
  resetPassword
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/requestPasswordReset", requestPasswordReset);
router.put("/resetPassword", resetPassword)
router.post("/validateToken", authMiddleware, (req, res) => {
  res.json({valid: true, user: req.user})
})

export default router;
