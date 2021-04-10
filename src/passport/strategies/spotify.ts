import { PassportStatic } from 'passport'
import { Strategy as SpotifyStategy, VerifyFunction } from 'passport-spotify'
import config from '../../config'
import { User } from '../../models/User'
import { logger } from '../../winston'

const verifyFunction: VerifyFunction = async (
  accessToken,
  refreshToken,
  expires_in,
  profile,
  done
) => {
  try {
    const user = await User.logInWithSpotify(
      profile.id,
      accessToken,
      refreshToken,
      expires_in
    )
    return done(null, user.toExpressUser())
  } catch (error) {
    done(error)
  }
}

export default (passport: PassportStatic): void => {
  try {
    passport.use(
      new SpotifyStategy(
        {
          clientID: config.CLIENT_ID,
          clientSecret: config.CLIENT_SECRET,
          callbackURL: config.CALLBACK_URL
        },
        verifyFunction
      )
    )
  } catch (error) {
    logger.error('Passport Connexion ' + error.message)
  }
}
