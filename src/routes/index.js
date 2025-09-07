import { Router } from "express"
import userRoutes from "./user.routes.js"
import mealPlanRoutes from "./mealPlan.routes.js"
import restrictionRoutes from "./restriction.routes.js"
import userEvolutionRoutes from "./user_evolution.routes.js"
import mealRoutes from "./meal.routes.js"

const router = Router()

router.use("/users", userRoutes);
router.use("/mealPlans", mealPlanRoutes);
router.use("/restrictions", restrictionRoutes);
router.use("/userEvolutions", userEvolutionRoutes);
router.use("/meals", mealRoutes);

export default router
