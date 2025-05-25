const express = require("express");
const Task = require("../models/Task.js");
const auth = require("../middleware/auth.js");
const router = express.Router();

// Create Task
router.post("/", auth(["Admin", "Manager"]), async (req, res) => {
  const task = new Task({ ...req.body, organization: req.user.org });
  await task.save();
  res.json(task);
});

// Get Tasks
router.get("/", auth(), async (req, res) => {
  const tasks = await Task.find({ organization: req.user.org });
  res.json(tasks);
});

module.exports = router;
