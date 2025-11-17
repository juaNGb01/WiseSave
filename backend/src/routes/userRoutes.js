import express from "express";
import { getUserProfile, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticateToken, getUserProfile);
// router.put("/update", authenticateToken, updateUser);
router.delete("/delete", authenticateToken, deleteUser);

export default router;