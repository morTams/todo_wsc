import {NextFunction, Request, Response} from "express";
import {validateObject} from "../utils/objectValidator";

export async function todosMiddleware(req: Request, res: Response, next: NextFunction){
    const requiredFields= ['id','title','category','isCompleted','userId']
    const validate = validateObject(req.body,requiredFields)
    if(!validate)
        return res.status(401).json({message: "The new object does not contain all required fields."})
    next()
}