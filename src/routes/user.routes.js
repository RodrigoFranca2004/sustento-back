import { Router } from "express";
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  listMyEvolution,
  listDayMeals,
  listMyMealPlans,
  updateUserProfilePicture
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = Router();

// Rota para upload da foto de perfil
router.put(
    "/profile-picture",
    authMiddleware,
    upload.single('profilePicture'),
    updateUserProfilePicture
);

// crud
router.get("/", listUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// Rotas específicas do usuário (já protegidas)
router.get("/evolution/:id", authMiddleware, listMyEvolution);
router.get("/dayMeals/:id", authMiddleware, listDayMeals);
router.get("/mealPlans/:id", authMiddleware, listMyMealPlans);


export default router;

