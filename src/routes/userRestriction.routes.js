import { Router } from "express";
import {
  createUserRestriction,
  listUserRestrictions,
  getUserRestriction,
  updateUserRestriction,
  deleteUserRestriction,
} from "../controllers/userRestriction.controller.js";

const router = Router();

router.post("/", createUserRestriction);
router.get("/", listUserRestrictions);
router.get("/single", getUserRestriction);      // new route to search 1 register
router.put("/", updateUserRestriction);         // using query params
router.delete("/", deleteUserRestriction);      // using query params

export default router;
