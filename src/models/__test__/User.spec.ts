import { User } from '../User'
import { Error } from 'mongoose'
import { connect, clearDatabase, closeDatabase } from '../../mongoose.mock'
import { UserDocument } from '../User.types'

describe('User', () => {
  beforeAll(async () => await connect())
  afterEach(async () => await clearDatabase())
  afterAll(async () => await closeDatabase())

  it('Should throw Validation Error if required fields are not preset', async () => {
    try {
      await new User({}).save()
    } catch (error) {
      expect(error instanceof Error.ValidationError).toBeTruthy()
      const validationError = error as Error.ValidationError
      expect(Object.keys(validationError.errors)).toStrictEqual([
        'providerId',
        'provider'
      ])
      expect(
        validationError.errors['providerId'] instanceof Error.ValidatorError
      ).toBeTruthy()
      expect(
        validationError.errors['provider'] instanceof Error.ValidatorError
      ).toBeTruthy()
      expect(validationError.errors['provider']).toHaveProperty(
        'kind',
        'required'
      )
      expect(validationError.errors['providerId']).toHaveProperty(
        'kind',
        'required'
      )
    }
  })

  it('Should throw Validation Error when provider is not enum value', async () => {
    try {
      await new User({
        providerId: 'mockId',
        provider: 'mockProvider'
      }).save()
    } catch (error) {
      expect(error instanceof Error.ValidationError).toBeTruthy()
      const validationError = error as Error.ValidationError
      expect(validationError.errors).toHaveProperty('provider')
      expect(
        validationError.errors['provider'] instanceof Error.ValidatorError
      ).toBeTruthy()
      expect(validationError.errors['provider']).toHaveProperty('kind', 'enum')
    }
  })

  it('static toExpressUser - Should return Express.User when method toExpressUser is called', async () => {
    const user: UserDocument = await new User({
      providerId: 'mockId',
      provider: 'spotify'
    }).save()

    const userExpress: Express.User = user.toExpressUser()
    expect(userExpress).toHaveProperty('id', user.id)
    expect(userExpress).toHaveProperty('providerId', user.providerId)
    expect(userExpress).toHaveProperty('provider', user.provider)
  })

  it('method logInWithSpotify - Should create a new user if new and update if already exits', async () => {
    const newUser = await User.logInWithSpotify(
      'mockId',
      'accessTokenasda',
      'refreshñaskjdñasa',
      3600
    )
    expect(newUser).toHaveProperty('provider', 'spotify')
    expect(newUser).toHaveProperty('providerId', 'mockId')
    expect(newUser).toHaveProperty('accessToken', 'accessTokenasda')
    expect(newUser).toHaveProperty('refreshToken', 'refreshñaskjdñasa')

    const updatedUser = await User.logInWithSpotify(
      'mockId',
      'newaccessTokenasda',
      'newrefreshñaskjdñasa',
      3600
    )

    expect(updatedUser).toHaveProperty('id', newUser.id)
    expect(updatedUser).toHaveProperty('provider', 'spotify')
    expect(updatedUser).toHaveProperty('providerId', 'mockId')
    expect(updatedUser).toHaveProperty('accessToken', 'newaccessTokenasda')
    expect(updatedUser).toHaveProperty('refreshToken', 'newrefreshñaskjdñasa')
  })
})
