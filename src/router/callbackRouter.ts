import { Router, Request, Response } from 'express'
import axios from 'axios'
import { verify, sign } from '../utils/jwt'
import { clientNotValid } from '../utils/validation'
import { ACCOUNT_TOKEN, REDIRECT_URI } from '../config'

const callbackRouter = Router()

callbackRouter.get('/callback', async (req: Request, res: Response) => {
  const { code, state, error } = req.query as any
  if (error) {
    res.status(405).send({ error })
  }

  const reqState = verify(state)

  if (typeof reqState === 'string') {
    res.send({ error: 'invalid credentials' })
  }

  const { client_id, client_secret } = reqState as {
    client_id: string
    client_secret: string
  }
  if (clientNotValid(client_id, client_secret)) {
    res.send({ error: 'invalid credentials' })
  }
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', REDIRECT_URI)
  params.append('client_id', client_id)
  params.append('client_secret', client_secret)

  try {
    const { data } = await axios(ACCOUNT_TOKEN, {
      method: 'POST',
      params
    })
    const hashedToken = sign(data.access_token)
    res.redirect(`/token/${hashedToken}`)
  } catch (error) {
    res.send({ error })
  }
})

export default callbackRouter
