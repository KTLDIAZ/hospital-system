import { Role } from "./role.interface"
import { Audit } from "./shared.interface"

export interface AppUser  {
  _id: string
  fullName: string
  identityDocument: string
  email: string
  birthDate: Date
  bloodType: string
  password: string
  type: string
  medicalHistory?: [MedicalHistory]
  specialties?: string[],
  audit: Audit
  isDisabled: boolean
  roles: [Role]
}

export interface Doctor {
  name: string
  specialties: [string]
}

export interface PrescriptionMedicine {
  name: string
  dose: string
}

export interface MedicalHistory {
  diagnosis: string
  observation: string
  prescription: PrescriptionMedicine
  date: Date
  doctor: Doctor
}

interface RemoveForCreateUser {
  _id: string
  audit: Audit
  medicalHistory: [MedicalHistory]
  isDisabled: boolean
  roles: [Role]
}

interface RoleForCreateUser {
  name: string
}

export interface CreateUser extends Omit<AppUser, keyof RemoveForCreateUser> {
  roles: RoleForCreateUser  []
}

export interface UserByIdentity {
  _id: string
  birthDate: string
  bloodType: string
  email: string
  fullName: string
  identityDocument: string
  isDisabled: boolean
  specialties: []
  type: string
}