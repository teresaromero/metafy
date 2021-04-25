import { AxiosError } from 'axios'
import { HttpError, Result } from '../response'
import { RegularErrorResponse } from './spotify'

export function isAxiosError<T>(
  error: AxiosError<T> | Error
): error is AxiosError<T> {
  return (error as AxiosError).isAxiosError
}

export function handleError<T>(
  error: AxiosError<RegularErrorResponse> | Error
): Result<T> {
  if (isAxiosError<RegularErrorResponse>(error) && error.response) {
    return Result.error(
      new HttpError(
        error.response.data.error.status,
        error.response.data.error.message
      )
    )
  } else {
    return Result.error(new HttpError(500, error.message))
  }
}
