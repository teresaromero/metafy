import { AxiosError } from 'axios'
import R from 'ramda'
import { HttpError, Result } from '../response'
import { NewReleasesQuery, RegularErrorResponse, SearchQuery } from './spotify'

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

export function isError(
  data: RegularErrorResponse | unknown
): data is RegularErrorResponse {
  return (data as RegularErrorResponse).error !== undefined
}

export function isSearchQuery(
  query: SearchQuery | unknown
): query is SearchQuery {
  return (
    (query as SearchQuery).q !== undefined &&
    (query as SearchQuery).type !== undefined
  )
}

export function isNewReleasesQuery(
  query: NewReleasesQuery | unknown
): query is NewReleasesQuery {
  return (
    R.isEmpty(query) ||
    (query as NewReleasesQuery).country !== undefined ||
    (query as NewReleasesQuery).limit !== undefined ||
    (query as NewReleasesQuery).offset !== undefined
  )
}
