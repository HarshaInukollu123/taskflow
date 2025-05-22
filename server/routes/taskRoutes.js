import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"; // Make sure auth middleware is set

const router = express.Router();

// Only managers can create tasks (like Jira stories)
router.post("/", protect, authorizeRoles("manager", "admin"), createTask);

// Developers/managers can view their tasks
router.get("/", protect, getTasks);

// Everyone can update their assigned tasks (logic in controller)
router.put("/:id", protect, updateTask);

// Only manager can delete tasks (optional)
router.delete("/:id", protect, authorizeRoles("manager", "admin"), deleteTask);


export default router;
