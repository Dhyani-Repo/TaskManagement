import type { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { hashPassword } from "../utils/hasher";

export class UserController {
    private userService : UserService
    constructor(){
        this.userService = new UserService()
    }
    getUserById = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            const userData = await this.userService.getUserById(id)
            if(!userData){res.status(404).json({message:"No Record Found !"})}
            res.json(userData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    signUp = async(req:Request,res:Response):Promise<any> => {
        try{
            const hashedPass = await hashPassword(req.body.password)
            req.body.password = hashedPass
            const userData = await this.userService.createUser(req.body)
            if(!userData){res.status(404).json({message:"No Record Found !"})}
            res.json(userData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    deleteAllUser = async(req:Request,res:Response):Promise<any> => {
        try{
            
            const userData = await this.userService.deleteUser(null,true)
            if(!userData){res.status(404).json({message:"No Record Found !"})}
            res.json(userData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    deleteUser = async(req:Request,res:Response):Promise<any> => {
        try{
            const id = req.params.id
            const userData = await this.userService.deleteUser(id,true)
            if(!userData){res.status(404).json({message:"No Record Found !"})}
            res.json(userData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    
}