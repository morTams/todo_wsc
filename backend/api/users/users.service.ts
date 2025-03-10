import {dbService} from "../../services/db/db.service";
import {IUser} from "../../globalTypes";

export async function getAll(){
    const collection = dbService.getCollection("users")
    return await collection.findAll()
}
export async function getById(id: string){
    const collection = dbService.getCollection("users")
    return await collection.findById(id)
}
export async function create(user: IUser){
    const collection = dbService.getCollection("users")
    return await collection.create(user)
}
export async function update(id: string, user: IUser){
    const collection = dbService.getCollection("users")
    return await collection.update(id, user)
}
export async function deleteUser(id: string){
    const collection = dbService.getCollection("users")
    return await collection.delete(id)
}