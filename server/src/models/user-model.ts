import { User } from '../schemas/user'
import { Types } from 'mongoose'
import { AppUser } from './interfaces/user.interface'
import { DOCTOR_TYPE, PATIENT_TYPE, STAFF_TYPE } from '../common/user-types'

export class UserModel {

  static async getById(id: Types.ObjectId) {
    const user = await User.findById(id)
    return user
  }

  static async getByIdentityDocument(identityDocument: string) {
    const user = await User.find({ identityDocument })
    return user
  }

  static async getAll() {
    const users = await User.find().select({ medicalHistory: 0 }).exec()
    return users
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
    return await this.create(staff)
  }

  static async createDoctor(doctor: AppUser) {
    doctor.type = DOCTOR_TYPE
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