import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'
import UserRouter from './src/routes/user-routes.js'
import MedicineRouter from './src/routes/medicine-routes.js'
import AuthRouter from './src/routes/auth-routes.js'
import dbConnection from './src/infrastructure/db-connection.js'
import cookieParser from 'cookie-parser'

dotenv.config()

dbConnection()

const app = express()

app.use( express.static('public') )

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(logger('dev'))

app.use('/api/user', UserRouter)
app.use('/api/medicine', MedicineRouter)
app.use('/api/auth', AuthRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.PORT}`)
});