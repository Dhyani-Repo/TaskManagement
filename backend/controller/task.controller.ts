import type { Request, Response } from "express";
import  {taskService}  from "../service/task.service";
import { hashPassword } from "../utils/hasher";
import { ITaskCreate } from "../utils/payloadSchema/Task";
import prisma from "../../prisma";

export class TaskController {
    private taskService : taskService
    constructor(){
        this.taskService = new taskService()
    }
    getTaskById = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            const taskData = await this.taskService.getTaskById(req.body)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    createTask = async(req: Request, res: Response) => {
        try {
            const payload: ITaskCreate = req.body;
            const task = await this.taskService.createTask(payload)
            res.status(201).json({ message: "Task created successfully", task });
        } catch (err) {
            console.error("Error creating task:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    deleteAllTaskByUserId = async(req:Request,res:Response):Promise<any> => {
        try{
            const {id} = req.params
            const taskData = await this.taskService.deleteTask(id,true)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    deleteTask = async(req:Request,res:Response):Promise<any> => {
        try{
            const id = req.params.id
            const taskData = await this.taskService.deleteTask(id,false)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    
}