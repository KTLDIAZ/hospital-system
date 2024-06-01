import { Audit } from './shared.interface'
import { Types } from 'mongoose'
export interface AppMedicine {
  name: string
  brand: string
  content: string
  description: string
  quantity: number
  inventory: [Inventory]
  transactions: [InventoryTransaction]
}

export interface Inventory {
  quantity: number
  sku: string
  expireAt: Date
  audit: Audit
}

export interface InventoryTransaction {
  inventoryId: Types.ObjectId
  quantity: number
  audit: Audit
}