import prisma from "../../prisma"
import {ITeamCreate,ITeamUpdate} from "../utils/payloadSchema/Team";
import { TeamCreateSchema, TeamUpdateSchema } from "../utils/payloadSchema/Team";
export class TeamService {
    
    getTeamById = async(id:string):Promise<any> => {
        const data = await prisma.team.findUnique({where:{id:id}})
        return data
    }
    
    getAllTeamByManagerId = async(id:string):Promise<any> => {
        const data = await prisma.team.findMany({where:{managerId:id}})
        return data
    }

    createTeam = async(team:ITeamCreate):Promise<any> => {
        const data = await prisma.team.create({
            data:{
                name:team.name,
                managerId:team.managerId
            }
        })
        return data
    }

    deleteTeam = async(id:string,all:boolean=false):Promise<any> => {
        if(all){
            const deletedAllteamsByManagerId = await prisma.team.deleteMany({where:{managerId:id}})
            console.log("Deleted_teams : ",deletedAllteamsByManagerId)
            return deletedAllteamsByManagerId
        }else{
            const deletedteam = await prisma.team.delete({where:{id}})
            console.log("Deleted_team : ",deletedteam)
            return deletedteam
        }
    }
    updateTeamById = async(id:string,data:ITeamUpdate):Promise<any> => {
       
        const updatedTeam = await prisma.team.update({where:{id},data:{name:data.name,managerId:data.managerId}})
        console.log("Deleted_team : ",updatedTeam)
        return updatedTeam
        
    }
    
        
}
