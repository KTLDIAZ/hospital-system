import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'
import UserRouter from './src/routes/user-routes.js'
import dbConnection from './src/infrastructure/db-connection.js'

dotenv.config()

dbConnection()

const app = express()

app.use( express.static('public') )

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/api/user', UserRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.PORT}`)
});