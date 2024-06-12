import { Audit } from './shared.interface'

export interface AppMedicine {
  _id: string
  name: string
  brand: string
  content: string
  description: string
  quantity: number
  inventory: Inventory[]
  transactions: InventoryTransaction[]
  audit: Audit
}

interface RemoveForCreateMedicine {
  _id: string
  inventory: Inventory[]
  transactions: InventoryTransaction[]
  quantity: number
  audit: Audit
}

export type CreateMedicine = Omit<AppMedicine, keyof RemoveForCreateMedicine>

export interface Inventory {
  _id: string
  quantity: number
  sku: string
  expireAt: Date
  audit: Audit
}

interface RemoveForCreateInventory {
  _id: string
  audit: Audit
}

export type CreateMedicineInventory = Omit<Inventory, keyof RemoveForCreateInventory>

export interface InventoryTransaction {
  _id: string
  inventoryId: string
  quantity: number
  audit: Audit
}

interface RemoveForCreateTransaction {
  _id: string
  audit: Audit
}

export type CreateMedicineTransaction = Omit<InventoryTransaction, keyof RemoveForCreateTransaction>
