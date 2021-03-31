import * as jwt from 'jsonwebtoken'
import { JWTSECRET } from '../config'

export const sign = (payload: string) => jwt.sign(payload, JWTSECRET)

export const verify = (token: string) => jwt.verify(token, JWTSECRET)
