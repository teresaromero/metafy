import dotenv from 'dotenv'

dotenv.config()

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  JWTSECRET: process.env.JWTSECRET || 'supersecret',
  SP_API_BASEURL: 'https://api.spotify.com/v1',
  ACCOUNT_AUTH: 'https://accounts.spotify.com/authorize',
  ACCOUNT_TOKEN: 'https://accounts.spotify.com/api/token',
  CALLBACK_URL:
    process.env.CALLBACK_URL || 'http://localhost:8080/auth/spotify/callback',
  CLIENT_ID: process.env.SP_CLIENT_ID || 'client id from spotify',
  CLIENT_SECRET: process.env.SP_CLIENT_SECRET || 'client secret from spotify',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/metafy',
  MONGO_SESSION_SECRET:
    process.env.MONGO_SESSION_SECRET || 'mongosessionsecret',
  MONGO_SESSION_NAME: process.env.MONGO_SESSION_NAME || 'sessions'
}
