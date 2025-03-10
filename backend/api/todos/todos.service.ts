import {dbService} from "../../services/db/db.service";
import {ITodo} from "../../globalTypes";


export async function getAll(){
   const collection =  dbService.getCollection("todos")
    console.log(collection)
    return await collection.findAll()
}
export async function getById(id: string){
    const todoById =  dbService.getCollection("todos")
    return await todoById.findById(id)
}

export async function create(todo: ITodo){
    const collection =  dbService.getCollection("todos")
    return await collection.create(todo)
}


export async function update(id: string, newTodo: ITodo){
    const collection =  dbService.getCollection("todos")
    return await collection.update(id,newTodo)
}

export async function deleteTodo(id: string){
    const collection =  dbService.getCollection("todos")
    return await collection.delete(id)
}