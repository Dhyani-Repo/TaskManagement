import prisma from "../../prisma"
import {ITaskCreate} from "../utils/payloadSchema/Task";

export class taskService {
    
    getTaskById = async(id:string):Promise<any> => {
        const data = await prisma.task.findUnique({where:{id:id}})
        return data
    }

    createTask = async(task:ITaskCreate):Promise<any> => {
        const data = await prisma.task.create({
            data:{
                title:task.title,
                description:task.description,
                status:task.status,
                userId:task.userId,
                creatorId:task.creatorId
                
            }
        })
        return data
    }

    deleteTask = async(id:string|null,all:boolean=false):Promise<any> => {
        if(id==null){
            if(all){
                const deleteAlltasks = await prisma.task.deleteMany()
                console.log("Deleted_tasks : ",deleteAlltasks)
                return deleteAlltasks
            }
            return null
        }else{
            const deletedtask = await prisma.task.delete({where:{id}})
            console.log("Deleted_task : ",deletedtask)
            return deletedtask
        }
    }
        
}
