import {getAll, getById,create,update,deleteUser} from "./users.service";
import {Request, Response} from "express";
import {deleteTodoByUserId} from "../todos/todos.service";


export async function getAllUsers(req: Request, res: Response){
    try{
        const users = await getAll()
        res.send(users)
    }
    catch (err){
        res.status(404).send({ err: 'Error to get All Users' })
    }
}
export async function getUserById(req: Request, res: Response){
    try{
        const {id} = req.params
        const user = await getById(id)
        res.send(user)
    }
    catch (err){
        res.status(404).send({ err: 'Error to get user' })
    }
}
export async function createUser(req: Request, res: Response){
    try{
        console.log("create user : "+req.body)
        const user = await create(req.body)
        res.send(user)
    }
    catch (err){
        res.status(404).send({ err: 'Error to create new user' })
    }
}
export async function updateUser(req: Request, res: Response){
    try{
        const {id} = req.params
        const user = await update(id,req.body)
        res.send(user)
    }
    catch (err){
        res.status(404).send({ err: 'Error to update user' })
    }
}
export async function deleteUserById(req: Request, res: Response){
    try{
        const {id} = req.params
        const deletedUser = await deleteUser(id)
        const deletedTodo = await deleteTodoByUserId(id)
        res.send({deletedUser , deletedTodo})
    }
    catch (err){
        res.status(404).send({ err: 'Error to delete user' })
    }
}