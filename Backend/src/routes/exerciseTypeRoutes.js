import express from "express";
import { createExerciseType, getExerciseTypes, updateExerciseType, deleteExerciseType } from "../controllers/exerciseTypeController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",protect, isAdmin, createExerciseType);
router.get("/", getExerciseTypes);
router.put("/:id", protect, isAdmin, updateExerciseType);
router.delete("/:id", protect, isAdmin, deleteExerciseType);

export default router;
