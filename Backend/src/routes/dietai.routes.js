import express from "express";
import { generateDietPlan } from "../controllers/dietai.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate",protect, generateDietPlan);

export default router;
