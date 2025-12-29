import express from "express";
import multer from "multer";

import {
  createExercise,
  deleteExercise,
  getExerciseByCategory,
  updateExercise,
  getExercises
} from "../controllers/exerciseController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, isAdmin, createExercise);
router.put("/:id", protect, isAdmin, updateExercise);
router.delete("/:id", protect, isAdmin, deleteExercise);

router.get("/", getExercises);
router.get("/category/:id", getExerciseByCategory);


export default router;
