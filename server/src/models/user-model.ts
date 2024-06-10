import { User } from '../schemas/user.js'
import { Types } from 'mongoose'
import { AppUser } from './interfaces/user.interface.js'
import bcrypt from 'bcrypt'
import { PATIENT_TYPE } from '../common/constants/user-types.js'

export class UserModel {

  static async getById(id: Types.ObjectId) {
    const user = await User.findById(id)
    return user
  }

  static async getByIdentityDocument(identityDocument: string) {
    const user = await User.findOne({ identityDocument })
      .select({ password: 0, roles: 0, audit: 0, medicalHistory: 0})
      
    return user
  }

  static async getByEmail(email: string) {
    const user = await User.findOne({ email })
    return user
  }

  static async getAll() {
    const users = await User.find().select({ medicalHistory: 0 }).exec()
    return users
  }

  static async getHashedPasswrod(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
  }

  static async changePassword(id: Types.ObjectId, oldPassword: string, newPassword: string) {
    const user = await this.getById(id)
    if (user ==  null) return false

    const passwordMacth =  await bcrypt.compare(oldPassword, user.password!);
    if (!passwordMacth) return false

    user.password = await this.getHashedPasswrod(newPassword)

    await user.save()

    return true
  }

  static async create(user: AppUser) {
    if (user.type !== PATIENT_TYPE) {
      user.password = await this.getHashedPasswrod(user.password!)
    }

    const newUser = await User.create({
      ...user,
    })

    return newUser
  }

  static async setType(type: string, userId: Types.ObjectId) {
    let user = await this.getById(userId)
    if (user == null)
      return false

    user.type = type
    await user.save()

    return true
  }

  static async IsInRole(id: Types.ObjectId, roles: string[]) {
    const user = await User.findById(id, { roles: 1})

    if (user == null) return false
    
    for (const role of roles) {
      const foundRole = user.roles.find(x => x.name === role)
      if (foundRole !== undefined) return true
    }

    return false
  }
}