import {Request, Response, NextFunction} from "express";
import {IUser} from "../../globalTypes";
import {dbService} from "../../services/db/db.service";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";

export async function userRegister(req: Request, res: Response, next: NextFunction) {
    try {
        const {name,email,password}=req.body;
        const collection = dbService.getCollection("users")
        const allUsers = await collection.findAll()
        const users = allUsers as IUser[]
        const user = users[users.length-1]
        const bcryptPassword = await bcrypt.hash(password,10)
        // let userId = Number(user.id) +1
        //console.log(`name: ${name} email: ${email} pass: ${password} `)
        let userDetail:IUser={
            id: uuidv4(),
            name,
            email,
            password: bcryptPassword,
            isAdmin: false
        }
        console.log("req body : "+req.body)
        req.body = userDetail
        req.url = '/'
        req.method = 'POST'
        next()
    }
    catch (err){
        res.status(404).send({ err: 'Registration failed' })
    }
}

export async function userLogin(req: Request, res: Response) {
    try {
        const {email, password } = req.body
        const collection = dbService.getCollection("users")
        const allUsers = await collection.findAll()
        const users = allUsers as IUser[]
        let user = users.find(u=> u.email === email)
        if(!user)
            return res.status(401).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" })
        const token = jwt.sign({id: user.id ,email: email}, process.env.JWT_SECRET as string,{ expiresIn: "1h" })
        res.json({token})
    }
    catch (err){
        res.status(404).send({ err: 'Login failed' })
    }
}