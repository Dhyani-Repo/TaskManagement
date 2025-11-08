import prisma from "../../prisma"
import {ITaskCreate, ITaskUpdate} from "../utils/payloadSchema/Task";

export class TaskService {
    
    getTaskById = async(id:string):Promise<any> => {
        const data = await prisma.task.findUnique({where:{id:id}})
        return data
    }

    getTaskByUserId = async(id:string):Promise<any> => {
        const data = await prisma.task.findMany({where:{userId:id}})
        if(!data || data.length == 0){return null}
        return data
    }
    getTaskByManagerId = async(id:string):Promise<any> => {
        const data = await prisma.user.findMany({
            where: { team: { managerId:id } }, // users whose team is managed by this manager
            include: {
            tasks: true, // include assigned tasks
            team: {
                select: { name: true, id: true } // optional: include team info
            }
            }
        });

        if (!data || data.length === 0) return null;
        return data;
    }

    
    createTask = async (task: ITaskCreate): Promise<any> => {
        const data = await prisma.task.create({
            data:{
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                userId: task.userId,
                creatorId: task.creatorId,
            }
        });

        return data;
    };

    updateTask = async (task: ITaskUpdate,id:string): Promise<any> => {
        const data = await prisma.task.update({
            where:{id},
            data:{
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                userId: task.userId,
            }
        });

        return data;
    };
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
