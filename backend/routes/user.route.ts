import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { PayloadValidator } from "../utils/paloadValidator";
import { SignUpPayloadFormat } from "../utils/payloadSchema/signIn";

const router = Router();
const userController = new UserController()

router.get("/:id",userController.getUserById)

router.post("/signup",PayloadValidator(SignUpPayloadFormat),userController.signUp);


export default router;
