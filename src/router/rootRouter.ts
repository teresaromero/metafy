import { Router } from 'express'
import { verify, sign } from '../utils/jwt'
import { clientNotValid } from '../utils/validation'
import { ACCOUNT_AUTH, REDIRECT_URI } from '../config'

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  res.render('index')
})

rootRouter.get('/token/:hashedToken', async (req, res) => {
  const { hashedToken } = req.params
  const access_token = verify(hashedToken)
  res.render('token', { access_token })
})

rootRouter.post('/token', async (req, res) => {
  const { client_id, client_secret } = req.body

  if (clientNotValid(client_id, client_secret)) {
    res.send({ error: 'no data' })
  }

  const state = sign(JSON.stringify({ client_secret, client_id }))

  res.redirect(
    `${ACCOUNT_AUTH}?client_id=${client_id}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}`
  )
})

export default rootRouter
