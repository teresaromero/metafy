import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
  NewReleasesQuery,
  NewReleasesResponse,
  PrivateUserObject,
  PublicUserObject,
  SearchQuery,
  SearchResponse
} from './spotify'
import config from '../../config'
import { handleError } from './utils'
import { Result } from '../response'

// Note: If Web API returns status code 429, it means that you have sent too many requests.
// When this happens, check the Retry-After header, where you will see a number displayed.
// This is the number of seconds that you need to wait, before you try your request again.

export class SpotifyApi {
  private static instance: AxiosInstance

  private static getInstance(): AxiosInstance {
    if (!SpotifyApi.instance) {
      SpotifyApi.instance = axios.create({ baseURL: config.SP_API_BASEURL })
    }

    SpotifyApi.instance.defaults.headers.get['Content-Type'] =
      'application/json'

    SpotifyApi.instance.interceptors.request.use((request) => {
      return request
    })
    SpotifyApi.instance.interceptors.response.use((response) => {
      return response
    })
    return SpotifyApi.instance
  }

  static setAuthorization(user: Express.User): void {
    SpotifyApi.getInstance().defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.accessToken}`
  }

  static resetAuthorization(): void {
    SpotifyApi.getInstance().defaults.headers.common[
      'Authorization'
    ] = undefined
  }

  static async getCurrentUser(): Promise<AxiosResponse<PrivateUserObject>> {
    return SpotifyApi.getInstance().get('/me')
  }

  static async getUser(
    user_id: string
  ): Promise<AxiosResponse<PublicUserObject>> {
    return SpotifyApi.getInstance().get(`/users/${user_id}`)
  }

  static async search(query: SearchQuery): Promise<Result<SearchResponse>> {
    const { q, type, limit = 20, offset = 0 } = query
    const queryParam = q ? `query=${q}` : undefined
    const typeParam = type ? `type=${type}` : undefined
    const params = [queryParam, typeParam].filter(
      (param) => param !== undefined
    )

    return SpotifyApi.getInstance().get(
      `/search?${params.join('&')}&limit=${limit}&offset=${offset}`
    )
  }

  static async newReleases(
    query: NewReleasesQuery
  ): Promise<Result<NewReleasesResponse>> {
    const { country, limit = 20, offset = 0 } = query
    const countryQuery = country ? `country=${country}` : undefined
    return SpotifyApi.getInstance().get(
      `/browse/new-releases?${countryQuery}&limit=${limit}&offset=${offset}`
    )
  }
}
