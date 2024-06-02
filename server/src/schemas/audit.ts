import { Schema } from 'mongoose'
import { Audit } from '../models/interfaces/shared.interface.js'

export const auditSchema = new Schema<Audit>({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true, uppercase: true },
  updaterId: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
  updatedAt: { type: Date, required: false },
  updatedBy: { type: String, required: false, uppercase: true },
})