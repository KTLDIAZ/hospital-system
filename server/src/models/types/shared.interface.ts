import { Types } from "mongoose"

export interface Audit extends UpdateAudit {
  creatorId: Types.ObjectId
  createdBy: string
  createdAt: Date
}

export interface UpdateAudit {
  updaterId?: Types.ObjectId
  updatedBy?: string
  updatedAt?: Date
}