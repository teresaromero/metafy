declare namespace Express {
  export interface User {
    id: string
    providerId: string
    accessToken?: string
    refreshToken?: string
    expires_in?: number
  }

  export interface Request {
    'x-request-id': string
  }
}

declare module 'passport-spotify' {
  export interface Profile {
    provider: string
    id: string
    username: string
    displayName: string
    profileUrl: string | null
    photos: [string] | null
    country: string
    followers: number | null
    product: string | null
    emails?: [{ value: string; type: null }]
  }

  export type VerifyCallback = (
    error?: Error | null,
    user?: Express.User,
    info?: object
  ) => void

  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    expires_in: number,
    profile: Profile,
    done: VerifyCallback
  ) => void

  export class Strategy {
    constructor(options: StrategyOptions, verify: VerifyFunction)

    name: string
    authenticate(req: Express.Request, options?: object): void
  }
}
