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
            if(userData.isUserExisted){res.status(409).json({message:"User Already Existed !"})}
            res.status(201).json(userData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    deleteUser = async(req:Request,res:Response):Promise<any> => {
        try{
            const id = req.params.id
            const userData = await this.userService.deleteUser(id)
            res.json(userData)
        }catch(e:any){
            console.error(e)
            if(e.code === "P2025") res.status(404)
            res.json({
                message:"User Not Deleted!",
                error:e
            })
        }
    }

    deleteAllUser = async(req:Request,res:Response):Promise<any> => {
        try{
            
            const userData = await this.userService.deleteUser(null,true)
            if(!userData){res.status(409).json({message:"No Record Found !"})}
            res.json(userData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    updateUser = async(req:Request,res:Response):Promise<any> => {
        try{
            const { id } = req.params;
            const hashedPass = req.body.password ? await hashPassword(req.body.password) : null
            req.body.password = hashedPass
            const userData = await this.userService.updateUser(req.body,id as string)
            if(!userData){res.status(404).json({message:"No Record Found !"})}
            res.json(userData)
        }catch(e:any){
            console.error(e)
            res.json({
                message:"User Not Updated!"
            })
        }
    }
    getAllUsers = async(req:Request,res:Response):Promise<any> => {
        try{
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const usersData = await this.userService.getAllUserData(page,limit,skip)   
            res.status(200).json({
                data:{...usersData}
            })  
        }catch(e:any){
            console.error(`error occured while getting all user data ${e}`)
            res.json({
                message:"Unable to Get Users Data !",
                error:e
            })
        }
    }
}