import {NextFunction, Request, Response} from "express";

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction){
    if(!req.body.isAdmin)
        return res.status(401).json({message: "No access permission"})
    next()
}