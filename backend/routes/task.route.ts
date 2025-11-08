import { Router } from "express";
import { TaskController } from "../controller/task.controller";

const   router = Router();
const taskController = new TaskController()
router.get("/:id", taskController.getTaskById);

export default router;
