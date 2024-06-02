import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

import { UserModel } from '../models/user-model.js'
import { createToken } from './jwt.js'
import { PATIENT_TYPE, USER_TYPES } from '../common/constants/user-types.js'

export class AuthService {

  static async login(email: string, password: string) {
    const user = await UserModel.getByEmail(email)
    if (user == null) return null

    if (USER_TYPES.includes(user.type) && user.type !== PATIENT_TYPE) return null

    const passwordMatch = await bcrypt.compare(password, user.password!)
    if(!passwordMatch) return null

    return createToken(user.id)
  }

  static async changePassword(userId: Types.ObjectId, oldPassword: string, newPassword: string) {
    return await UserModel.changePassword(userId, oldPassword, newPassword)
  }
}