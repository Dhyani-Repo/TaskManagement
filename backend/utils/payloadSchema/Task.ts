

import Joi from "joi";


export interface ITaskCreate {
  title: string;
  description?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  userId: string;
  creatorId:string;
}


export const TaskCreateSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title should be at least 3 characters long",
    }),

  description: Joi.string()
    .max(500)
    .optional()
    .allow("")
    .messages({
      "string.max": "Description can be at most 500 characters",
    }),

  status: Joi.string()
    .valid("PENDING", "IN_PROGRESS", "COMPLETED")
    .optional()
    .messages({
      "any.only": "Status must be one of PENDING, IN_PROGRESS, or COMPLETED",
    }),

  userId: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.guid": "Invalid userId format (must be UUID)",
      "any.required": "userId is required",
    }),
});
