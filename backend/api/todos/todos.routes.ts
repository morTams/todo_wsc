import express from 'express'
import {createTodo, deleteTodoById, getAllTodos, getTodoById, updateTodo} from './todos.controller'
import {todosMiddleware} from "../../middleware/todos.middleware";
import {isAdminMiddleware} from "../../middleware/authorization.middleware";


export const todoRouter = express.Router()


todoRouter.get('/', getAllTodos)
// todoRouter.get('/user/:id', getTodoByUserId)
todoRouter.get('/:id', getTodoById)
todoRouter.post('/',todosMiddleware,createTodo)
todoRouter.put('/:id',todosMiddleware,updateTodo)
todoRouter.delete('/:id',deleteTodoById)

