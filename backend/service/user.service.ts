import prisma from "../../prisma"
import {ISignUp} from "../utils/payloadSchema/signIn";

export class UserService {
    
    getUserById = async(id:string):Promise<any> => {
        const data = await prisma.user.findUnique({where:{id:id}})
        return data
    }

    createUser = async(user:ISignUp):Promise<any> => {
        const data = await prisma.user.create({
            data:{
                email:      user.email,
                name:       user.name,
                password:   user.password,
            }
        })
        return data
    }

    deleteUser = async(id:string|null,all:boolean=false):Promise<any> => {
        if(id==null){
            if(all){
                const deleteAllUsers = await prisma.user.deleteMany()
                console.log("Deleted_Users : ",deleteAllUsers)
                return deleteAllUsers
            }
            return null
        }else{
            const deletedUser = await prisma.user.delete({where:{id}})
            console.log("Deleted_User : ",deletedUser)
            return deletedUser
        }
    }
        
}
