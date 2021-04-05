import { AxiosError } from 'axios'
import R from 'ramda'
import { NewReleasesQuery, RegularErrorResponse, SearchQuery } from './spotify'

function isAxiosError(
  error: AxiosError<RegularErrorResponse> | Error
): error is AxiosError<RegularErrorResponse> {
  return (error as AxiosError).isAxiosError
}

export function handleError(
  error: AxiosError<RegularErrorResponse> | Error
): RegularErrorResponse {
  if (isAxiosError(error)) {
    const data = error.response!.data
    return data
  } else {
    return { error: { message: error.message, status: 500 } }
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
