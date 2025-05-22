import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Get all users (admin/manager access only)
router.get("/", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const users = await User.find({}, "_id name email role"); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
