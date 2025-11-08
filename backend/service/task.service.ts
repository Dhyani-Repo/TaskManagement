import prisma from "../../prisma"

class TaskService {
    getTaskById = async(id:string):Promise<any> => {
        const data = await prisma.task.findUnique({where:{id:id}})
        return data
    }
}

export default TaskService