import Task from "../models/Task.js";

// @desc    Get all tasks for logged in user
export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "developer") {
      // Show only assigned tasks
      tasks = await Task.find({ assignee: req.user._id }).populate("assignee reporter", "name email role");
    } else {
      // Managers/Admins see all
      tasks = await Task.find({}).populate("assignee reporter", "name email role");
    }

    res.json(tasks);
  } catch (error) {
    console.error("❌ Fetch tasks error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      priority,
      status,
      dueDate,
      assignee
    } = req.body;

    const task = await Task.create({
      title,
      description,
      type,
      priority,
      status,
      dueDate,
      assignee,
      reporter: req.user.id, // ✅ captured from JWT via middleware
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("❌ Task creation error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const submitTaskForApproval = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.approval.status = 'pending';
  await task.save();
  res.json({ message: "Task submitted for approval", task });
};


export const approveTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.approval.status = 'approved';
  task.approval.approvedBy = req.user._id;
  task.approval.rejectionReason = '';
  await task.save();
  res.json({ message: "Task approved", task });
};

export const rejectTask = async (req, res) => {
  const { reason } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.approval.status = 'rejected';
  task.approval.rejectionReason = reason || "No reason provided";
  task.approval.approvedBy = null;
  await task.save();
  res.json({ message: "Task rejected", task });
};
