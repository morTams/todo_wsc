import {NextFunction, Request, Response} from "express";
import {validateObject} from "../utils/objectValidator";
import validator from "validator";


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
    next()
}

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction){
    if(!req.body.isAdmin)
        return res.status(401).json({message: "No access permission"})
    next()
}