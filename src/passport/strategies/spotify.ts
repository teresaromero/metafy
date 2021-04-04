import { PassportStatic } from 'passport'
import { Strategy as SpotifyStategy, VerifyFunction } from 'passport-spotify'
import config from '../../config'
import { User } from '../../models/User'

const verifyFunction: VerifyFunction = async (
  accessToken,
  refreshToken,
  expires_in,
  profile,
  done
) => {
  try {
    const user = await User.updateOrCreate(
      { providerId: profile.id },
      { accessToken, refreshToken, expires_in, provider: 'spotify' }
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
    console.log('Passport Connexion ' + error.message)
    process.exit(1)
  }
}
