import Joi, { EmailOptions, string } from "joi";
import { UserRoles } from "../../constants";

export interface ISignUp {
    name:string,
    email:string,
    password:string
    role?: "ADMIN" | "USER" | "MANAGER";
    teamId?: string;

}
// export const SignUpPayloadFormat = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
// })
export const SignUpPayloadFormat = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...Object.values(UserRoles))
    .optional(),
  teamId: Joi.string()
    .uuid()
    .optional()
    .messages({
      "string.guid": "Invalid teamId format (must be UUID)",
    }),
});

export const UpdateUserPayloadFormat = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    role: Joi.string()
    .valid(...Object.values(UserRoles))
    .optional(),
    teamId: Joi.string()
        .uuid()
        .optional()
        .messages({
        "string.guid": "Invalid teamId format (must be UUID)",
    })
})
export interface IUpdateUser {
    name?:string,
    email?:string,
    password?:string
}
