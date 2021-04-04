
declare namespace Express {
    export interface User {
        id: string
        providerId: string
        accessToken?: string
        refreshToken?: string
        expires_in?: number
    }
}

