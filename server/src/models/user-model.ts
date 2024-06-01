import { User } from '../schemas/user.js'
import { Types } from 'mongoose'
import { AppUser } from './interfaces/user.interface.js'
import { DOCTOR_TYPE, PATIENT_TYPE, STAFF_TYPE } from '../common/user-types.js'
import bcrypt from 'bcrypt';

export class UserModel {

  static async getById(id: Types.ObjectId) {
    const user = await User.findById(id)
    return user
  }

  static async getByIdentityDocument(identityDocument: string) {
    const user = await User.find({ identityDocument })
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
    const hashedPassword = await bcrypt.hash(password, 20)
    return hashedPassword
  }

  static async changePassword(id: Types.ObjectId, oldPassword: string, newPassword: string) {
    const user = await User.findById(id)
    if (user ==  null) return false

    const passwordMacth =  await bcrypt.compare(oldPassword, user.password!);
    if (!passwordMacth) return false

    user.password = await this.getHashedPasswrod(newPassword)

    await user.save()

    return true
  }

  private static async create(user: AppUser) {
    const newUser = await User.create({
      ...user,
    })

    return newUser
  }

  static async createPatient(patient: AppUser) {
    patient.type = PATIENT_TYPE
    return await this.create(patient)
  }

  static async createStaff(staff: AppUser) {
    staff.type = STAFF_TYPE
    staff.password = await this.getHashedPasswrod(staff.password!)

    return await this.create(staff)
  }

  static async createDoctor(doctor: AppUser) {
    doctor.type = DOCTOR_TYPE
    doctor.password = await this.getHashedPasswrod(doctor.password!)

    return await this.create(doctor)
  }

  static async setType(type: string, userId: Types.ObjectId) {
    let user = await User.findById(userId)
    if (user == null)
      return false

    user.type = type
    await user.save()

    return true
  }
}