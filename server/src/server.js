import express from 'express'
import cors from 'cors'
import { Server as socketIOServer } from 'socket.io'
import connectDB from './utils/connectDB.js'
import ioListeners from './utils/ioListeners.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

//instance of app
const app = express()

//set app to listen on port
const port = process.env.PORT
const server = app.listen(port, console.log('Server now listening now port', port))

//middleware
app.use(express.json())
app.use(cors())
app.use('/users', userRoutes)

//instance of socketio
const io = new socketIOServer(server, { cors: { origin: '*' } })

//connect to database
connectDB()

//socket io listeners
ioListeners(io)


