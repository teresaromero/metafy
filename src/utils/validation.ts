import { isNil, isEmpty } from 'ramda'

export const clientNotValid = (
  client_id: string,
  client_secret: string
): boolean =>
  isNil(client_id) ||
  isNil(client_secret) ||
  isEmpty(client_id) ||
  isEmpty(client_secret)
