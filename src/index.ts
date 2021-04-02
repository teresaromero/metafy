import dotenv from 'dotenv'
import { PORT } from './config'
import { db, connectDB } from "./mongoose"
import session from "express-session"
import MongoDBStore from 'connect-mongodb-session'
import { setRoutes, setupServer } from './server'
const MongoStore = MongoDBStore(session);


(async () => {

  dotenv.config()

  if (db.readyState !== 1) {
    await connectDB()
  }

  const server = setupServer()
  setRoutes(server)

  server.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
  })
})()







