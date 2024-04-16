const {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} = require("../controllers/taskControler");

const { verifyAccessToken } = require("../middleware/tokenMiddleware");

const router = require("express").Router();

router
  .post("/", verifyAccessToken, createTask)
  .get("/", verifyAccessToken, getTasks);
router
  .get("/:id", verifyAccessToken, getTaskById)
  .patch("/:id", verifyAccessToken, updateTask)
  .delete("/:id", verifyAccessToken, deleteTask);

module.exports = router;
