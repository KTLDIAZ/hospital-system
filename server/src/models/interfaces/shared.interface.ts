import { Types } from "mongoose"

export interface Audit {
  creatorId: Types.ObjectId
  createdBy: string
  createdAt: Date
  updaterId: Types.ObjectId
  updatedBy?: string
  updatedAt?: Date
}