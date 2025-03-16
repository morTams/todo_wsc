import { Request, Response } from 'express'
import {create, getAll, getById, update, deleteTodo, getTodoListByUserId} from './todos.service'
import {ITodo} from "../../globalTypes";
import { v4 as uuidv4 } from "uuid";

export async function getAllTodos(req: Request, res: Response) {
    try {
        const userId = req.query.id as string
        const todoList = await getTodoListByUserId(userId)
        res.send(todoList)
    }
    catch (err){
        res.status(404).send({ err: 'Error to get All Todos by user' })
    }
}
// export async function getTodoByUserId(req: Request, res: Response) {
//     try {
//         const userId = req.body
//         const todoList = await getTodoListByUserId(userId)
//         res.send(todoList)
//     }
//     catch (err){
//         res.status(404).send({ err: 'Error to get All Todos by user' })
//     }
// }
export async function getTodoById(req: Request, res: Response){
    const {id} = req.params
    const todoById = await getById(id)
    res.send(todoById)
}

export async function createTodo(req: Request, res: Response) {
    try {
        const userId= req.query.id as string
        const data = req.body
        const newTodo:ITodo={
            id: "",
            title:data.title,
            description: data.description,
            category: data.category,
            isCompleted: false,
            userId: userId
        }
        const todo = await create(newTodo)
        res.send(todo)
    }
    catch (err){
        res.status(404).send({ err: 'Error to create Todo' })
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const userId = req.query.id as string
        const {id} =req.params
        const updateTodo = await update(id,userId,req.body)
        res.send(updateTodo)
    }
    catch (err){
        res.status(404).send({ err: 'Error to update Todo' })
    }
}

export async function deleteTodoById(req: Request, res: Response) {
    try {
        const {id} = req.params
        const userId = req.query.id as string
        const Todo = await deleteTodo(id, userId)
        res.send(Todo)
    }
    catch (err){
        res.status(404).send({ err: 'Error to delete Todo' })
    }
}

