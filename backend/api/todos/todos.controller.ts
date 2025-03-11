import { Request, Response } from 'express'
import {create, getAll, getById, update, deleteTodo, getTodoListByUserId} from './todos.service'

export async function getAllTodos(req: Request, res: Response) {
    try {
        const todoList = await getAll()
        res.send(todoList)
    }
    catch (err){
        res.status(404).send({ err: 'Error to get All Todos' })
    }
}
export async function getTodoByUserId(req: Request, res: Response) {
    try {
        const userId = req.body
        const todoList = await getTodoListByUserId(userId)
        res.send(todoList)
    }
    catch (err){
        res.status(404).send({ err: 'Error to get All Todos by user' })
    }
}
export async function getTodoById(req: Request, res: Response){
    const {id} = req.params
    const todoById = await getById(id)
    res.send(todoById)
}

export async function createTodo(req: Request, res: Response) {
    try {
        const newTodo = req.body
        const todo = await create(newTodo)
        res.send(todo)
    }
    catch (err){
        res.status(404).send({ err: 'Error to create Todo' })
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const {id} =req.params
        const updateTodo = await update(id,req.body)
        res.send(updateTodo)
    }
    catch (err){
        res.status(404).send({ err: 'Error to update Todo' })
    }
}

export async function deleteTodoById(req: Request, res: Response) {
    try {
        const {id} = req.params
        const Todo = await deleteTodo(id)
        res.send(Todo)
    }
    catch (err){
        res.status(404).send({ err: 'Error to delete Todo' })
    }
}

