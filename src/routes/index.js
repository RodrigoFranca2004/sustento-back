import { Router } from "express"
import userRoutes from "./user.routes.js"
import mealPlanRoutes from "./mealPlan.routes.js"

const router = Router()

router.use("/users", userRoutes);
router.use("/mealPlans", mealPlanRoutes);

export default router
