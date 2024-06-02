import { Schema } from 'mongoose'
import { Role } from '../models/interfaces/role.interface.js'
import { auditSchema } from './audit.js'

export const roleSchema = new Schema<Role>({
  name: { type: String, required: true, unique: true, lowercase: true },
  audit: { type: auditSchema, required: true }
})