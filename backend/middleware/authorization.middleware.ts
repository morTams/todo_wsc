import {NextFunction, Request, Response} from "express"
import {getById} from "../api/users/users.service"
import {strict} from "node:assert";

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction){
    const userId  = req.query.id as string
    const user :any = getById(userId)
    if(!user.isAdmin)
        return res.status(401).json({message: "No access permission"})
    next()
}
export async function authorizeUpdateMiddleware(req: Request, res: Response, next: NextFunction){
    const userIdToUpdate = req.params.id
    const user :any = getById(String(req.query.id))
    console.log(`out reqId ${req.query.id} userIdupdate= ${userIdToUpdate}`)
    if(req.query.id !== userIdToUpdate){
        console.log(`in if reqId ${req.query.id} userIdupdate= ${userIdToUpdate}`)
        if(user.isAdmin) {
            const allowedFields = ["isAdmin"]
            req.body = Object.fromEntries(
                Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
            )
        }
        else
        {
            return res.status(401).json({message: "No access permission"})
        }
    }
    else{
        const allowedFields = ["email", "name", "password"]
        req.body = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
        )
    }
    next()
}


//לבדוק לפי הJWT אם המשתמש הפעילהוא מנהל אז להתיר דברים מסויימים כמו לערוך משתמש להיות מנה אבל למשתמש מותר לערוך את עצמו רק על השם שלו ועל
//להוסיף מידדלוור של לוגר
//יהיה שתי פונקציות של עדכון יש גישה רק למשתמש לשנות רק את שלו כמו משתמש סיסמא ומייל
//והשני רק המנהל ניגש ורק לעדכן אדמין