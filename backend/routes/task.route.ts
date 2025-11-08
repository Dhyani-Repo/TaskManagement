import { Router } from "express";
import { TaskController } from "../controller/task.controller";

const   router = Router();
const taskController = new TaskController()
router.get("/:id", taskController.getTaskById);
router.delete("/:id", taskController.deleteTask);
router.delete("/:id", taskController.deleteAllTaskByUserId);

export default router;
