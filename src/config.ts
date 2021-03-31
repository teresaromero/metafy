export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 8080
export const JWTSECRET = process.env.JWTSECRET || 'supersecret'
export const SP_API_BASEURL = 'https://api.spotify.com'
export const ACCOUNT_AUTH = 'https://accounts.spotify.com/authorize'
export const ACCOUNT_TOKEN = 'https://accounts.spotify.com/api/token'
export const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:8080/auth/callback'
