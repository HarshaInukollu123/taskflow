import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  submitTaskForApproval,
  approveTask,
  rejectTask,
} from "../controllers/taskController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"; // Make sure auth middleware is set
import Task from "../models/Task.js";

const router = express.Router();

// Only managers can create tasks (like Jira stories)
router.post("/", protect, authorizeRoles("manager", "admin"), createTask);

// Developers/managers can view their tasks
router.get("/", protect, getTasks);

// Everyone can update their assigned tasks (logic in controller)
router.put("/:id", protect, updateTask);

// Only manager can delete tasks (optional)
router.delete("/:id", protect, authorizeRoles("manager", "admin"), deleteTask);

// Get all tasks that are pending approval
router.get("/pending", protect, authorizeRoles("manager", "admin"), async (req, res) => {
  try {
    const tasks = await Task.find({ approvalStatus: "pending" })
      .populate("reporter", "name email")
      .populate("assignee", "name email");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching pending tasks:", err);
    res.status(500).json({ message: "Failed to load pending tasks" });
  }
});


router.patch("/:id/submit", protect, authorizeRoles("manager"), submitTaskForApproval);
router.patch("/:id/approve", protect, authorizeRoles("admin"), approveTask);
router.patch("/:id/reject", protect, authorizeRoles("admin"), rejectTask);


export default router;
