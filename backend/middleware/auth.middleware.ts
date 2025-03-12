import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {dbService} from "../services/db/db.service"
import {IUser} from "../globalTypes"

dotenv.config()

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id:string , email:string}
        const collection = dbService.getCollection("users")
        const allUsers = await collection.findAll()
        const users = allUsers as IUser[]
        // @ts-ignore
        const user = users.find(u=>u.id===decoded.id)
        if (!user) return res.status(404).json({ message: "User not found." });
        req.query.id = decoded.id
        next()
    } catch (err)
    {
        res.status(400).json({ message: "Invalid token" })
    }
}
