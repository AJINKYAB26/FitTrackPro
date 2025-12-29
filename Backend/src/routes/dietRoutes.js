import express from "express";
import { createDiet, getDietPlans, getDietById } from "../controllers/dietController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isAdmin, createDiet);
router.get("/", getDietPlans);
router.get("/:id", getDietById);

export default router;
