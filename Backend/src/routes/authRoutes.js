import express from "express";
import { registerUser, loginUser, getUsers, banUser, activateUser} from "../controllers/userController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.put("/:userId/ban", protect, isAdmin, banUser);

router.put("/:userId/activate", protect, isAdmin, activateUser);

export default router;
