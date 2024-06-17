import { SignJWT, jwtVerify } from 'jose'
import Enviroment from '../common/constants/enviroment.js'
import { UserModel } from '../models/user-model.js'
import { Types } from 'mongoose'
import { Claims } from './types/jwt.interface.js'

export default class JWTService {

  static async createToken(claims: Claims) {
    const secret = new TextEncoder().encode(Enviroment.secret)


    const jwt = await new SignJWT({ ...claims })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret)

    return jwt
  }

  
  static async getClaims(token: string) {
    const payload = await this.getPayload(token)
    if (payload === null) return null
    
    const claims: Claims = {
      userId: new Types.ObjectId(payload['userId'] as string),
      roles: payload['roles'] as string[]
    }

    return claims
  }

  private static async getPayload(token: string) {
    if (!token) return null
  
    const secret = new TextEncoder().encode(Enviroment.secret)

    const { payload } = await jwtVerify(token, secret)

    return payload
  }

  static async isInRole(roles: string[], token: string) {
      if (!token) return false
      
      const secret = new TextEncoder().encode(Enviroment.secret)
  
      const { payload } = await jwtVerify(token, secret)
  
      const userId = payload['userId'] as string
      
      const isInRole = await UserModel.IsInRole(new Types.ObjectId(userId), roles)
      return isInRole
  }
}