import { Response } from 'express'
import { Result } from '../libs/response'

export const handleResponse = <T>(res: Response, result: Result<T>): void => {
  if (result.isError && result.error) {
    res.status(result.error.statusCode).send(result.error.toJSON)
  } else {
    res.send(result.data)
  }
}
