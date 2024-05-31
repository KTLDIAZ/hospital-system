import { Audit } from './shared.interface';

export interface AppUser  {
  fullName: string
  identityDocument: string
  email: string
  birthDate: Date
  bloodType: string
  password?: string
  type: string
  medicalHistory?: [MedicalHistory]
  specialties?: [string],
  audit: Audit
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