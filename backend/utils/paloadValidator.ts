import type { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { threadId } from "worker_threads"

export const PayloadValidator = (schema:any) => {
    return function(req:Request,res:Response,next:NextFunction) {
        try{
            const { value, error } = schema.validate(req.body)
            res.json({
                message:"Payload validation Failed",
                error
            })
            console.log(value)
            next()
        }catch(e:any) {
            console.error("Error Occured : ", e)
            
        }
    }
}