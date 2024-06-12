import axios from 'axios'
import AxiosInstance from './AxiosInstance'
import { ApiResponse } from '../types/api.interface'
import {
  AppMedicine,
  CreateMedicine,
  CreateMedicineInventory,
  CreateMedicineTransaction
} from '../types/medicine'

export default class MedicineService {
  static async Create(meidicne: CreateMedicine): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.post<ApiResponse<string>>('/medicine', meidicne)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<string> = {
          data: '',
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async GetAll(): Promise<ApiResponse<AppMedicine[]>> {
    try {
      const response = await AxiosInstance.get<ApiResponse<AppMedicine[]>>('/medicine')

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<AppMedicine[]> = {
          data: [],
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async GetById(id: string): Promise<ApiResponse<AppMedicine>> {
    try {
      const response = await AxiosInstance.get<ApiResponse<AppMedicine>>(`/medicine/${id}`)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<AppMedicine> = {
          data: null,
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async CreateInventory(
    inventory: CreateMedicineInventory,
    id: string
  ): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.post<ApiResponse<string>>(
        `/medicine/${id}/inventory`,
        inventory
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<string> = {
          data: '',
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async CreateTransaction(
    transaction: CreateMedicineTransaction,
    id: string
  ): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.post<ApiResponse<string>>(
        `/medicine/${id}/transaction`,
        transaction
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<string> = {
          data: '',
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }
}
