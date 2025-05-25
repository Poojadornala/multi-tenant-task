const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Middleware to verify JWT
const Task = require('../models/Task'); // Mongoose Task model

// GET /api/dashboard → Dashboard statistics for logged-in user's organization
router.get("/", authenticate, async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    // Total tasks for the organization
    const totalTasks = await Task.countDocuments({ organization: organizationId });

    // Overdue tasks (due date passed & not completed)
    const overdueTasks = await Task.countDocuments({
      organization: organizationId,
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });

    // Completed tasks
    const completedTasks = await Task.countDocuments({
      organization: organizationId,
      status: "Completed"
    });

    // In Progress tasks
    const inProgressTasks = await Task.countDocuments({
      organization: organizationId,
      status: "In Progress"
    });

    res.status(200).json({
      totalTasks,
      overdueTasks,
      completedTasks,
      inProgressTasks
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
