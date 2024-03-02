const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask, getCompletedTasks, getUnCompletedTasks } = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middlewares.js");

// Routes beginning with /api/tasks
router.get("/", verifyAccessToken, getTasks);
router.get("/completed", verifyAccessToken, getCompletedTasks);
router.get("/uncompleted", verifyAccessToken, getUnCompletedTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:taskId", verifyAccessToken, putTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;
