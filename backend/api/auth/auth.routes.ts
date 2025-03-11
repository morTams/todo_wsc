import express from "express"
import {userLogin, userRegister} from "./auth.controller"
import {emailValidationMiddleware} from "../../middleware/users.middleware";
import {usersRouter} from "../users/users.routes";

export const authRouter = express.Router()


authRouter.get('/',userLogin)
authRouter.post('/', userRegister,usersRouter);

