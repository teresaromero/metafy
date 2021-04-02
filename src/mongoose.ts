import mongoose, { Connection } from "mongoose"
import { MONGO_URI } from "./config"

export const db: Connection = mongoose.connection

db.on("connecting", () => console.log('MongoDB connecting...'))
db.on("connected", () => console.log('MongoDB connected'))
db.on("disconnecting", () => console.log('MongoDB disconnecting...'))
db.on("disconnected", () => console.error('MongoDB disconnected'))
db.on("close", () => console.log('MongoDB closed'))
db.on("reconnected", () => console.log('MongoDB reconnected'))
db.on("error", (err) => {
    console.error(err.message)
    process.exit(1)
})

export const connectDB = async (): Promise<void> => {
    await mongoose.connect(
        MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
}
