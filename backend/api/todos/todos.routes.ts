import express from 'express'
import {createTodo, deleteTodoById, getAllTodos, getTodoById, updateTodo} from './todos.controller'
import {todosMiddleware} from "../../middleware/todos.middleware";


export const todoRouter = express.Router()


todoRouter.get('/', getAllTodos)
todoRouter.get('/:id', getTodoById)
todoRouter.post('/',todosMiddleware,createTodo)
todoRouter.put('/:id',todosMiddleware,updateTodo)
todoRouter.delete('/:id',deleteTodoById)

