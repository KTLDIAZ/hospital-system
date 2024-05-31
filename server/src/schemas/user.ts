import mongoose from 'mongoose'
const { Schema } = mongoose

const doctorSchema = new Schema({
  name: { type: String, required: true },
  specialties: [{ type: String, required: true }],
})

const medicineSchema = new Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
})

const medicalHistorySchema = new Schema({
  diagnosis: { type: String, required: true },
  observation: String,
  medicines: [{ type: medicineSchema, required: true }],
  date: { type: Date, default: Date.now },
  doctor: [{ type: doctorSchema, required: true }]
})

const userSchema = new Schema({
  fullName: { type: String, required: true },
  identityDocument: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  birthDate: Number,
  bloodType: String,
  medicalHistory: [medicalHistorySchema],

  roles: [String],
  // doctor
  specialties: [{ type: String, required: false }],
  //audit
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.model('User', userSchema)