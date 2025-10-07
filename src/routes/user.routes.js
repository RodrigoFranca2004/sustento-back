import { Router } from "express";
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  listMyEvolution,
  listDayMeals,
  listMyMealPlans
} from "../controllers/user.controller.js";

const router = Router();

// crud
router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// get data from other tables associated with user
router.get("/evolution/:id", listMyEvolution);
router.get("/dayMeals/:id", listDayMeals);
router.get("/mealPlans/:id", listMyMealPlans);

export default router;
