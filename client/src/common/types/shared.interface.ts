export interface Audit {
  creatorId: string
  createdBy: string
  createdAt: Date
  updaterId: string
  updatedBy?: string
  updatedAt?: Date
}