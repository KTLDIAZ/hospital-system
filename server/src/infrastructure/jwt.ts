import { EncryptJWT, base64url } from 'jose'
import Enviroment from '../common/constants/enviroment.js'

export const createToken = async (userId: string) => {
  const secret = base64url.decode(Enviroment.secret)
  const jwt = await new EncryptJWT({ userId })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .encrypt(secret)

  return jwt
}