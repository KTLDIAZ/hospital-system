import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

import { UserModel } from '../models/user-model.js'
import JWTService from './jwt-service.js'
import { PATIENT_TYPE, USER_TYPES } from '../common/constants/user-types.js'
import { Claims } from './types/jwt.interface.js'

export class AuthService {

  static async login(email: string, password: string) {
    const user = await UserModel.getByEmail(email)
    if (user == null) return null

    if (USER_TYPES.includes(user.type) && user.type !== PATIENT_TYPE) return null

    const passwordMatch = await bcrypt.compare(password, user.password!)
    if(!passwordMatch) return null

    const claims: Claims =  {
      userId: user._id,
      roles: user.roles.map(x => x.name)
    }

    return JWTService.createToken(claims)
  }

  static async changePassword(userId: Types.ObjectId, oldPassword: string, newPassword: string) {
    return await UserModel.changePassword(userId, oldPassword, newPassword)
  }
}