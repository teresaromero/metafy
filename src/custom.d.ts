
declare namespace Express {
    export interface User {
        id: string
        spotifyId: string
        username?: string
        accessToken?: string
        refreshToken?: string
        expires_in?: number
    }
}

