

import Joi from "joi";


export interface ITeamCreate {
  name: string;
  managerId: string;
  memberIds?: string[];
}

export interface ITeamUpdate {
  name?: string;
  managerId?: string;
  memberIds?: string[];
}


export const TeamCreateSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  managerId: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.guid": "Invalid managerId format (must be UUID)",
      "any.required": "Manager ID is required",
    }),
  memberIds: Joi.array()
    .items(
      Joi.string().uuid().messages({
        "string.guid": "Each memberId must be a valid UUID",
      })
    )
    .optional(),

});

export const TeamUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  managerId: Joi.string()
    .uuid()
    .optional()
    .messages({
      "string.guid": "Invalid managerId format (must be UUID)",
    }),
  memberIds: Joi.array()
    .items(
      Joi.string().uuid().messages({
        "string.guid": "Each memberId must be a valid UUID",
      })
    )
    .optional(),
});

