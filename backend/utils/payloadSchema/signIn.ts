import Joi, { EmailOptions, string } from "joi";

export interface ISignUp {
    name:string,
    email:string,
    password:string
}
export const SignUpPayloadFormat = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})