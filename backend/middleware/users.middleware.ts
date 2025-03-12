import {NextFunction, Request, Response} from "express";
import {validateObject} from "../utils/objectValidator";
import validator from "validator";
import {dbService} from "../services/db/db.service";
import {IUser} from "../globalTypes";


export async function usersMiddleware(req: Request, res: Response, next: NextFunction){
    const requiredFields= ['id','name','email','password','isAdmin']
    const validate = validateObject(req.body,requiredFields)
    if(!validate)
        return res.status(401).json({message: "The new object does not contain all required fields."})
    next()
}

export async function emailValidationMiddleware(req: Request, res: Response, next: NextFunction){
    const email = req.body.email
    const validate = validator.isEmail(email)
    if(!validate)
        return res.status(401).json({message: "Invalid email address"})
    const collection = dbService.getCollection("users")
    const allUsers = await collection.findAll()
    const users = allUsers as IUser[]
    for(let user of users) {
        if (user.email === email)
            return res.status(401).json({message: "A user with the same email already exists in the system."})
    }
    next()
}