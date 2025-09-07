import { Router } from "express"
import userRoutes from "./user.routes.js"
import mealPlanRoutes from "./mealPlan.routes.js"
import restrictionRoutes from "./restriction.routes.js"
import userEvolutionRoutes from "./userEvolution.routes.js"
import mealRoutes from "./meal.routes.js"
import alimentRoutes from "./aliment.routes.js"
import userRestrictionRoutes from "./userRestriction.routes.js"
import mealAlimentRoutes from "./mealAliment.routes.js"

const router = Router()

router.use("/users", userRoutes);
router.use("/mealPlans", mealPlanRoutes);
router.use("/restrictions", restrictionRoutes);
router.use("/userEvolutions", userEvolutionRoutes);
router.use("/meals", mealRoutes);
router.use("/aliments", alimentRoutes);
router.use("/userRestrictions", userRestrictionRoutes);
router.use("/mealAliments", mealAlimentRoutes);

export default router
