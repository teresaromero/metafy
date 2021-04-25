import { NextFunction, Request, Response } from 'express'
import { Result } from '../libs/response'
import { SpotifyApi } from '../libs/spotify'
import {
  NewReleasesQuery,
  NewReleasesResponse,
  SearchQuery,
  SearchResponse
} from '../libs/spotify/spotify'
import { handleError } from '../libs/spotify/utils'

export const getSearchQuery = () => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchQuery = (req.query as unknown) as SearchQuery
    const { data } = await SpotifyApi.search(searchQuery)
    const result = Result.ok(data)
    res.send(result.data)
  } catch (err) {
    const { error } = handleError<SearchResponse>(err)
    next(error)
  }
}

export const getNewReleasesForCountry = () => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchQuery = (req.query as unknown) as NewReleasesQuery
    const { data } = await SpotifyApi.newReleases(searchQuery)
    const result = Result.ok(data)
    res.send(result.data)
  } catch (err) {
    const { error } = handleError<NewReleasesResponse>(err)
    next(error)
  }
}
