import { Router } from "express"
import userRoutes from "./user.routes.js"
import restrictionRoutes from "./restriction.routes.js"
import userEvolutionRoutes from "./user_evolution.routes.js"

const router = Router()

router.use("/users", userRoutes)
router.use("/restrictions", restrictionRoutes)
router.use("/userevolutions", userEvolutionRoutes)

export default router
