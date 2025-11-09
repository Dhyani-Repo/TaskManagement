import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { PayloadValidator } from "../utils/paloadValidator";
import { LoginPayloadFormat, SignUpPayloadFormat, UpdateUserPayloadFormat } from "../utils/payloadSchema/User";
import { validateUser } from "../middleware/auth";

const router = Router();

const userController = new UserController()

router.get("/:id",validateUser,userController.getUserById)

router.post("/signup",PayloadValidator(SignUpPayloadFormat),userController.signUp);
router.post("/login",PayloadValidator(LoginPayloadFormat),userController.login);


router.patch("/:id",PayloadValidator(UpdateUserPayloadFormat),userController.updateUser)

router.delete("/:id",userController.deleteUser)
router.delete("/",userController.deleteAllUser)


export default router;
