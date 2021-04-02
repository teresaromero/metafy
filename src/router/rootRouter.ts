import { Router } from 'express'
import { verify, sign } from '../utils/jwt'
import { clientNotValid } from '../utils/validation'
import { ACCOUNT_AUTH, CALLBACK_URL } from '../config'

export default ((router: Router): void => {

  router.get('/', (req, res) => {
    res.render('index')
  })

  router.get('/token/:hashedToken', async (req, res) => {
    const { hashedToken } = req.params
    const access_token = verify(hashedToken)
    res.render('token', { access_token })
  })

  router.post('/token', async (req, res) => {
    const { client_id, client_secret } = req.body

    if (clientNotValid(client_id, client_secret)) {
      res.send({ error: 'no data' })
    }

    const state = sign(JSON.stringify({ client_secret, client_id }))

    res.redirect(
      `${ACCOUNT_AUTH}?client_id=${client_id}&response_type=code&redirect_uri=${CALLBACK_URL}&state=${state}`
    )
  })

})

