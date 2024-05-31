import { Schema, model } from 'mongoose'
import { Doctor, MedicalHistory, PrescriptionMedicine, AppUser } from '../models/interfaces/user.interface'
import { auditSchema } from './audit';
import { userTypes } from '../common/user-types';

const doctorSchema = new Schema<Doctor>({
  name: { type: String, required: true },
  specialties: [{ type: String, required: true }],
})

const prescriptionSchema = new Schema<PrescriptionMedicine>({
  name: { type: String, required: true },
  dose: { type: String, required: true },
})

const medicalHistorySchema = new Schema<MedicalHistory>({
  diagnosis: { type: String, required: true },
  observation: String,
  prescription: [{ type: prescriptionSchema, required: true }],
  date: { type: Date, default: Date.now },
  doctor: [{ type: doctorSchema, required: true }]
})

const userSchema = new Schema<AppUser>({
  fullName: { type: String, required: true },
  identityDocument: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  birthDate: { type: Date, required: true },
  bloodType: { type: String, required: true },
  medicalHistory: [medicalHistorySchema],

  type: { type: String, enum: userTypes },
  // doctor
  specialties: [{ type: String, required: false }],
  audit: { type: auditSchema, required: true }
})

export const User = model('User', userSchema)