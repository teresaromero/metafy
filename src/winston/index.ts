import { Request } from 'express'
import winston, { transports } from 'winston'
import expressWinston from 'express-winston'

const console = new transports.Console()

const dynamicMeta = (req: Request): object => ({
  'x-request-id': req['x-request-id'] || undefined,
  user: req.user?.id || undefined
})

const format = winston.format.printf(({ level, label, message, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

export const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), format),
  transports: [console]
})

export const httpLogger = expressWinston.logger({
  baseMeta: { label: 'http' },
  transports: [console],
  dynamicMeta,
  headerBlacklist: ['cookie']
})

export const httpErrorLogger = expressWinston.errorLogger({
  baseMeta: { label: 'http' },
  transports: [console]
})
