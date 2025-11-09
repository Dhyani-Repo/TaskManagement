import { Router } from "express";
import { TaskController } from "../controller/task.controller";
import { PayloadValidator } from "../utils/paloadValidator";
import { TaskCreateSchema, TaskUpdateSchema } from "../utils/payloadSchema/Task";

const   router = Router();
const taskController = new TaskController()
router.get("/:id", taskController.getTaskById);
router.get("/userId/:id", taskController.getTaskByUserId);
router.get("/managerId/:id",taskController.getTaskByManagerId)
router.delete("/:id", taskController.deleteTask);
router.delete("/:id", taskController.deleteAllTaskByUserId);
router.patch("/:id",PayloadValidator(TaskUpdateSchema),taskController.updateTask)
router.post("/:id",PayloadValidator(TaskCreateSchema),taskController.createTask)

export default router;
