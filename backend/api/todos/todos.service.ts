import {dbService} from "../../services/db/db.service";
import {ITodo, IUser} from "../../globalTypes";
import {Request, Response} from "express";


export async function getAll(){
   const collection =  dbService.getCollection("todos")
    console.log(collection)
    return await collection.findAll()
}

export async function getTodoListByUserId(id: string){
    const collection =  dbService.getCollection("todos")
    const todoList = await collection.findAll() as ITodo[]
    let todoByUser = todoList.filter(t=> t.userId == id)
    return todoByUser
}

export async function getById(id: string){
    const todoById =  dbService.getCollection("todos")
    return await todoById.findById(id)
}

export async function create(todo: ITodo){
    const collection =  dbService.getCollection("todos")
    return await collection.create(todo)
}


export async function update(id: string,userId :string, newTodo: ITodo){
    const collection =  dbService.getCollection("todos")
    const todoList = await collection.findAll() as ITodo[]
    let todoById = todoList.find(t=> t.id === id) as ITodo
    if(todoById.userId != userId)
        throw new Error('You do not have permission to perform this action.');
    return await collection.update(id,newTodo)
}

export async function deleteTodo(id: string , userId: string){
    const collection =  dbService.getCollection("todos")
    const todoList = await collection.findAll() as ITodo[]
    let todoById = todoList.find(t=> t.id === id) as ITodo
    if(todoById.userId != userId)
        throw new Error('You do not have permission to perform this action.')
    return await collection.delete(id)
}
export async function deleteTodoByUserId(id: string) {
    try {
        const collection =  dbService.getCollection("todos")
        const todoList = await collection.findAll() as ITodo[]
        todoList.forEach(async (t)=> {
            if(t.userId == id)
                await collection.delete(t.id)
        })
        return { message: "Todos deleted by user id successfully" }
    }
    catch (err){
        throw new Error('Error to delete Todo by user id' )
    }
}