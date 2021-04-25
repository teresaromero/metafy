import { SpotifyApi } from './BaseInstance'
import { Result } from '../response'
import {
  SearchQuery,
  SearchResponse,
  NewReleasesQuery,
  NewReleasesResponse
} from './spotify'

export class SearchSpotifyApi extends SpotifyApi {
  static async search(query: SearchQuery): Promise<Result<SearchResponse>> {
    const { q, type, limit = 20, offset = 0 } = query
    const queryParam = q ? `query=${q}` : undefined
    const typeParam = type ? `type=${type}` : undefined
    const params = [queryParam, typeParam].filter(
      (param) => param !== undefined
    )

    return this.getInstance().get(
      `/search?${params.join('&')}&limit=${limit}&offset=${offset}`
    )
  }

  static async newReleases(
    query: NewReleasesQuery
  ): Promise<Result<NewReleasesResponse>> {
    const { country, limit = 20, offset = 0 } = query
    const countryQuery = country ? `country=${country}` : undefined
    return this.getInstance().get(
      `/browse/new-releases?${countryQuery}&limit=${limit}&offset=${offset}`
    )
  }
}
