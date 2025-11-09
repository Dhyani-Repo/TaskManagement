import prisma from "../../prisma"
import { veryfyPassword } from "../utils/hasher";
import { generateTokens, JWTPayload } from "../utils/jwt";
import {ILoginIn, ISignUp, IUpdateUser} from "../utils/payloadSchema/User";

export class UserService {
    login = async (payload: ILoginIn): Promise<{ success: boolean; message?: string; user?: any; tokens?: any }> => {
    const user = await prisma.user.findFirst({ where: { email: payload.email } });
    if (!user) return { success: false, message: "User not found" };
    const isMatch = veryfyPassword(payload.password, user.password);
    if (!isMatch) return { success: false, message: "Invalid password" };
    const tokenPayload: JWTPayload = { id: user.id, role: user.role };
    const tokens = await generateTokens(tokenPayload);
    return {
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
      tokens
    };
  };

    getUserById = async(id:string):Promise<any> => {
        const data = await prisma.user.findUnique({where:{id:id}})
        return data
    }

    createUser = async(user:ISignUp):Promise<any> => {
        const userData = await prisma.user.findFirst({where:{email:user.email}})
        if(userData) userData
        const data = await prisma.user.create({
            data:{
                email:      user.email,
                name:       user.name,
                password:   user.password,
            }
        })
        return data
    }

    updateUser = async(user:IUpdateUser,id:string):Promise<any> => {
        const { name, email, password } = user;

        const updatedData: any = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        const data = await prisma.user.update({
            where:{id},
            data:updatedData
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
    
    getAllUserData = async(page:number,limit:number,skip:number):Promise<any> => {
        const [data, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" }, 
            }),
            prisma.user.count(),
        ]);
        return {users:data,total}
    }
        
}
