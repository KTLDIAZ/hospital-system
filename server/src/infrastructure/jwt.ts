import { SignJWT } from 'jose'
import Enviroment from '../common/constants/enviroment.js'

export const createToken = async (userId: string) => {
  const secret = new TextEncoder().encode(Enviroment.secret)

  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)

  return jwt
}