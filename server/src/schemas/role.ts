import { Schema } from 'mongoose'
import { Role } from '../models/types/role.interface.js'
import { auditSchema } from './audit.js'

export const roleSchema = new Schema<Role>({
  name: { type: String, required: true, lowercase: true },
  audit: { type: auditSchema, required: true }
})