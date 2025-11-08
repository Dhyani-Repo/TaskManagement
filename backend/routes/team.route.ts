import { Router } from "express";
import { TeamController } from "../controller/team.controller";
import { PayloadValidator } from "../utils/paloadValidator";
import { TeamCreateSchema, TeamUpdateSchema } from "../utils/payloadSchema/Team";

const   router = Router();
const teamController = new TeamController()
router.get("/:id", teamController.getTeamById);
router.get("/managerId/:", teamController.getAllTeamByManagerId);
router.delete("/:id", teamController.deleteTeam);
router.delete("/managerId/:id", teamController.deleteAllTeamByManagerId);
router.patch("/:id",PayloadValidator(TeamUpdateSchema),teamController.updateTeam)
router.post("/:id",PayloadValidator(TeamCreateSchema),teamController.createTeam)

export default router;
