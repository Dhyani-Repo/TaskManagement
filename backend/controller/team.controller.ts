import type { Request, Response } from "express";
import  {TeamService}  from "../service/team.service";
import { ITeamCreate } from "../utils/payloadSchema/Team";

export class TeamController {
    private teamService : TeamService
    constructor(){
        this.teamService = new TeamService()
    }
    getTeamById = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            if(!id) res.status(400).json({message:`Please Provide Team 'id' in Params`})
            const teamData = await this.teamService.getTeamById(id)
            if(!teamData){res.status(404).json({message:"No Record Found !"})}
            res.json(teamData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }
    getAllTeamByManagerId = async(req:Request,res:Response):Promise<any> => {
        try{
            let id = req.params.id as string
            if(!id) res.status(400).json({message:`Please Provide Manager 'id' in Params`})
            const teamData = await this.teamService.getAllTeamByManagerId(id)
            if(!teamData){res.status(404).json({message:"No Record Found !"})}
            res.json(teamData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    createTeam = async(req: Request, res: Response) => {
        try {
            const payload: ITeamCreate = req.body;
            const team = await this.teamService.createTeam(payload)
            res.status(201).json({ message: "Team created successfully", team });
        } catch (err) {
            console.error("Error creating team:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    deleteAllTeamByManagerId = async(req:Request,res:Response):Promise<any> => {
        try{
            const {id} = req.params
            const teamData = await this.teamService.deleteTeam(id,true)
            if(!teamData){res.status(404).json({message:"No Record Found !"})}
            res.json(teamData)
        }catch(e:any){
            console.error(e)
            throw new Error(e)
        }
    }

    deleteTeam = async(req:Request,res:Response):Promise<any> => {
        try{
            const id = req.params.id
            if(!id) res.status(400).json({message:`Please Provide Team 'id' in Params`})
            const teamData = await this.teamService.deleteTeam(id,false)
            if(!teamData){res.status(404).json({message:"No Record Found !"})}
            res.json(teamData)
        }catch(e:any){
            console.error(e)
            res.json({
                message:"Unable to deleteTeam",
                error:e
            })
        }
    }

    updateTeam = async(req:Request,res:Response):Promise<any> => {
        try{
            const id = req.params.id
            if(!id) res.status(400).json({message:`Please Provide Manager 'id' in Params`})
            const updatedTeam = await this.teamService.updateTeamById(id,req.body)
            res.json({data:updatedTeam})
        }catch(e:any){
            console.error(e)
            res.json({
                message:"Unable to deleteTeam",
                error:e
            })
        }
        
    }
    
}