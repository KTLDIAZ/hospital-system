import { Schema, model } from 'mongoose'
import { Doctor, MedicalHistory, PrescriptionMedicine, AppUser } from '../models/types/user.interface.js'
import { auditSchema } from './audit.js';
import { USER_TYPES } from '../common/constants/user-types.js';
import { roleSchema } from './role.js';

const doctorSchema = new Schema<Doctor>({
  doctorId: { type: Schema.Types.ObjectId , required: true},
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
  prescription: { type: [prescriptionSchema], required: true },
  date: { type: Date, default: Date.now },
  doctor: { type: doctorSchema, required: true }
})

const userSchema = new Schema<AppUser>({
  fullName: { type: String, required: true, uppercase: true },
  identityDocument: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: false, unique: true,  lowercase: true },
  password: { type: String, required: false },
  birthDate: { type: Date, required: true },
  bloodType: { type: String, required: true },
  medicalHistory: [medicalHistorySchema],
  isDisabled: { type: Boolean, required: true },
  roles: { type: [roleSchema], required: true },
  type: { type: String, enum: USER_TYPES, index: true },
  // doctor
  specialties: [{ type: String, required: false }],
  audit: { type: auditSchema, required: true }
})

export const User = model('Users', userSchema)