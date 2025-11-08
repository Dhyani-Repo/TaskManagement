

import Joi from "joi";
import { TaskPriority, TaskStatus } from "../../constants";
export interface ITaskCreate {
  title: string;
  description?: string;
  status?: TaskStatus;
  userId: string;
  creatorId:string;
  priority?:TaskPriority;
}
export interface ITaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  userId?: string;
}


export const TaskCreateSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow(""),
  status: Joi.string().valid(...Object.values(TaskStatus)).optional(),
  priority: Joi.string().valid(...Object.values(TaskPriority)).optional(),
  userId: Joi.string().uuid().required(),
  creatorId: Joi.string().uuid().required(),
});

export const TaskUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional().allow(""),
  status: Joi.string().valid(...Object.values(TaskStatus)).optional(),
  priority: Joi.string().valid(...Object.values(TaskPriority)).optional(),
  userId: Joi.string().uuid().optional(),
}).min(1); // Ensures at least one field is provided for update
