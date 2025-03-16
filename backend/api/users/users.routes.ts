import {createUser, deleteUserById, getAllUsers, getUserById, updateUser} from "../users/users.controller"
import {emailValidationMiddleware, usersMiddleware} from "../../middleware/users.middleware"
import express from "express";
import {authorizeUpdateMiddleware, isAdminMiddleware} from "../../middleware/authorization.middleware";


export const usersRouter = express.Router()

usersRouter.get('/',isAdminMiddleware, getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/',usersMiddleware,emailValidationMiddleware,createUser)
usersRouter.put('/:id',emailValidationMiddleware,authorizeUpdateMiddleware,updateUser)
usersRouter.delete('/:id',isAdminMiddleware,deleteUserById)