import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { PayloadValidator } from "../utils/paloadValidator";
import { SignUpPayloadFormat, UpdateUserPayloadFormat } from "../utils/payloadSchema/User";

const router = Router();

const userController = new UserController()

router.get("/:id",userController.getUserById)

router.post("/signup",PayloadValidator(SignUpPayloadFormat),userController.signUp);

router.patch("/:id",PayloadValidator(UpdateUserPayloadFormat),userController.updateUser)

router.delete("/:id",userController.deleteUser)
router.delete("/",userController.deleteAllUser)


export default router;
