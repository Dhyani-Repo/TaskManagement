import type { Request, Response } from "express";
import TaskService  from "../service/task.service";

export class TaskController {

    taskService:TaskService

    constructor(){
        this.taskService = new TaskService()
    }

    getTaskById = async(req:Request,res:Response) => {
        try{
            let id = req.params.id as string
            const taskData = await this.taskService.getTaskById(id)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

}