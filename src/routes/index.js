import { Router } from "express"
import userRoutes from "./user.routes.js"
import mealPlanRoutes from "./mealPlan.routes.js"
import restrictionRoutes from "./restriction.routes.js"
import userEvolutionRoutes from "./userEvolution.routes.js"
import mealRoutes from "./meal.routes.js"
import alimentRoutes from "./aliment.routes.js"
import userRestrictionRoutes from "./userRestriction.routes.js"
import mealRecordRoutes from "./mealRecord.routes.js"
import mealAlimentRoutes from "./mealAliment.routes.js"
import authRoutes from "./auth.routes.js"
import fatSecretRoutes from "./fatSecret.routes.js"
import openFoodRoutes from "./openFood.routes.js"

const router = Router()

router.use("/users", userRoutes);
router.use("/mealPlans", mealPlanRoutes);
router.use("/restrictions", restrictionRoutes);
router.use("/userEvolutions", userEvolutionRoutes);
router.use("/meals", mealRoutes);
router.use("/aliments", alimentRoutes);
router.use("/userRestrictions", userRestrictionRoutes);
router.use("/mealRecords", mealRecordRoutes);
router.use("/mealAliments", mealAlimentRoutes);
router.use("/auth", authRoutes);
router.use("/fatSecret", fatSecretRoutes);
router.use("/openFood", openFoodRoutes);

export default router
