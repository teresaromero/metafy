import mongoose, { Connection } from 'mongoose'
import config from './config'
import { logger } from './winston'

export const db: Connection = mongoose.connection

db.on('connecting', () => logger.info('MongoDB connecting...'))
db.on('connected', () => logger.info('MongoDB connected'))
db.on('disconnecting', () => logger.info('MongoDB disconnecting...'))
db.on('disconnected', () => logger.info('MongoDB disconnected'))
db.on('close', () => logger.info('MongoDB closed'))
db.on('reconnected', () => logger.info('MongoDB reconnected'))
db.on('error', (err) => {
  logger.error(err.message)
})

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}
