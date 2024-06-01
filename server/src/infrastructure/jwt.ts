import jose from 'jose'

export const createToken = async (userId: string) => {
  const secret = jose.base64url.decode(process.env.JWT_SECRET!)
  const jwt = await new jose.EncryptJWT({ userId })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .encrypt(secret)

  return jwt
}