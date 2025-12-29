import express from "express";
import { sendDietEmail } from "../controllers/dietEmail.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-email", protect, sendDietEmail);

export default router;
