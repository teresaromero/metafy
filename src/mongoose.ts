import mongoose, { Error } from 'mongoose'
import config from './config'
import { logger } from './winston'

export const dbConnection = mongoose.connection

mongoose.connection.on('connecting', () => logger.info('MongoDB connecting...'))
mongoose.connection.on('connected', () => logger.info('MongoDB connected'))
mongoose.connection.on('disconnecting', () =>
  logger.info('MongoDB disconnecting...')
)
mongoose.connection.on('disconnected', () =>
  logger.info('MongoDB disconnected')
)
mongoose.connection.on('close', () => logger.info('MongoDB closed'))
mongoose.connection.on('reconnectFailed', () =>
  logger.warn('MongoDB reconnectFailed')
)

mongoose.connection.on('error', (error: Error) => {
  logger.error(error.message)
})

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  } catch (error) {
    logger.error(error.message)
    process.exit(1)
  }
}
