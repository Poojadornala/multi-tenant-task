const cron = require("node-cron");
const Task = require("../models/Task.js"); 

cron.schedule("0 * * * *", async () => {
  const now = new Date();
  await Task.updateMany(
    { dueDate: { $lt: now }, status: { $ne: "Completed" } },
    { status: "Expired" }
  );
  console.log("Expired old tasks");
});
