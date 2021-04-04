import { Request, Response } from 'express'
import winston, { transports } from 'winston'
import expressWinston from 'express-winston'

const console = new transports.Console()

const format = winston.format.printf(({ level, label, message, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message} `
})

const httpFormat = winston.format.printf(({ message, timestamp }) => {
  return `${timestamp} ${message} `
})

const httpMsgFormat = (req: Request, res: Response) => {
  const baseLog = `${res.statusCode} [${req.method}] ${
    req.url
  } query:${JSON.stringify(req.query)} body:${JSON.stringify(req.body)}`
  if (req.user) {
    return baseLog + ` user:${req.user.id}`
  }
  return baseLog
}

export const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), format),
  transports: [console]
})

export const httpLogger = expressWinston.logger({
  baseMeta: { label: 'http' },
  transports: [console],
  format: winston.format.combine(winston.format.timestamp(), httpFormat),
  msg: httpMsgFormat
})

export const httpErrorLogger = expressWinston.errorLogger({
  baseMeta: { label: 'http' },
  transports: [console],
  format: winston.format.combine(winston.format.timestamp(), httpFormat)
})
