import { SignJWT, jwtVerify } from 'jose'
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

export const getPayload = async (token: string) => {
  if (!token) return null
  
  const secret = new TextEncoder().encode(Enviroment.secret)

  const { payload } = await jwtVerify(token, secret)

  return payload
}