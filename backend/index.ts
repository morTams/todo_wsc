import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { config } from './config'
import { exampleRouter } from './api/example/example.routes'
import {todoRouter} from "./api/todos/todos.routes";
import {usersMiddleware} from "./middleware/users.middleware";
import {usersRouter} from "./api/users/users.routes";

const path = config.isProduction() ? '.env.prod' : '.env.dev'

dotenv.config({
    path: [path],
})

const app = express()
const PORT = process.env.PORT
const corsOrigins = process.env.CORS
const corsOptions = {
    origin: corsOrigins,
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/example', exampleRouter)
app.use('/todos', todoRouter)
app.use('/users', usersRouter)
app.get('/', (request: Request, response: Response) => {
    response.status(200).send(`localhost:${PORT}/example`)
})

app.listen(PORT, () => {
    console.log('Server running at PORT: ', PORT)
}).on('error', (error) => {
    throw new Error(error.message)
})
