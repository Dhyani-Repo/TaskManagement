import type { Request, Response } from "express";
import  {TaskService}  from "../service/task.service";
import { ITaskCreate, ITaskUpdate } from "../utils/payloadSchema/Task";

export class TaskController {
    private taskService : TaskService
    constructor(){
        this.taskService = new TaskService()
    }
    getTaskById = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            if(!id) res.status(400).json({message:`Please Provide Task 'id' In Params`})
            const taskData = await this.taskService.getTaskById(req.body)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    getTaskByUserId = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            if(!id) res.status(400).json({message:`Please Provide Task 'id' In Params`})
            const taskData = await this.taskService.getTaskByUserId(req.body)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    getTaskByManagerId = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            if(!id) res.status(400).json({message:`Please Provide Task 'id' In Params`})
            const taskData = await this.taskService.getTaskByUserId(req.body)
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

    updateTask = async(req: Request, res: Response) => {
        try {
            const id = req.params.id
            if(!id) res.status(400).json({message:`Please Provide task 'id'  in params !`})
            const payload: ITaskUpdate = req.body;
            const task = await this.taskService.updateTask(payload,id)
            res.status(201).json({ message: "Task created successfully", task });
        } catch (err) {
            console.error("Error creating task:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    deleteAllTaskByUserId = async(req:Request,res:Response):Promise<any> => {
        try{
            const taskData = await this.taskService.deleteTask(null,true)
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
            if(!id) res.status(400).json({message:`Please Provide task 'id'  in params !`})
            const taskData = await this.taskService.deleteTask(id,false)
            if(!taskData){res.status(404).json({message:"No Record Found !"})}
            res.json(taskData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    
}