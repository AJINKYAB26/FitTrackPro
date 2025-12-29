import express from "express";
import { createWorkout, getTodayWorkout,getRecentWorkouts, getWeeklyCalories } from "../controllers/workoutsController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// router.post("/", createWorkout);
router.get("/today",protect, getTodayWorkout);
router.post("/",protect, createWorkout);
router.get("/recent",protect, getRecentWorkouts);
router.get("/weekly-calories", protect, getWeeklyCalories);


export default router;
