
const { getsubTask, getSubTaskById, updateSubTask, deleteSubTask, createSubTask } = require("../controllers/subTaskControler");
const {  verifyAccessToken } = require("../middleware/tokenMiddleware");

const router = require("express").Router();


router.post("/", verifyAccessToken, createSubTask);
router.get("/", verifyAccessToken, getsubTask);
router
  .get("/:id", verifyAccessToken, getSubTaskById)
  .patch("/:id", verifyAccessToken, updateSubTask)
  .delete("/:id", verifyAccessToken, deleteSubTask);

module.exports = router;
