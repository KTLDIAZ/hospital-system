import axios from 'axios'
import { ApiResponse } from '../types/api.interface'
import AxiosInstance from './AxiosInstance'
import {
  AppUser,
  CreateUser,
  CreateMedicalHistory,
  UserByIdentity,
  UpdateUser
} from '../types/user.interface'

export default class UserService {
  static async GetByIdentity(identity: string) {
    try {
      const response = await AxiosInstance.get<ApiResponse<UserByIdentity>>(
        `/user/identity/${identity}`,
        { withCredentials: true }
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<UserByIdentity> = {
          data: null,
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async CreateUser(user: CreateUser): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.post<ApiResponse<string>>('/user', user)

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

  static async GetAll(): Promise<ApiResponse<AppUser[]>> {
    try {
      const response = await AxiosInstance.get<ApiResponse<AppUser[]>>('/user')

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<AppUser[]> = {
          data: [],
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async GetById(id: string): Promise<ApiResponse<AppUser>> {
    try {
      const response = await AxiosInstance.get<ApiResponse<AppUser>>(`/user/${id}`)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data
      } else {
        const response: ApiResponse<AppUser> = {
          data: null,
          message: 'An error has ocurred',
          ok: false
        }
        return response
      }
    }
  }

  static async CreateMedicalHistory(
    medicalHistory: CreateMedicalHistory,
    id: string
  ): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.post<ApiResponse<string>>(
        `/user/${id}/medical-history`,
        medicalHistory
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

  static async Update(user: UpdateUser, id: string): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.put<ApiResponse<string>>(`/user/${id}/`, user)

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

  static async Disable(id: string): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.patch<ApiResponse<string>>(`/user/${id}/disable`)

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

  static async Enable(id: string): Promise<ApiResponse<string>> {
    try {
      const response = await AxiosInstance.patch<ApiResponse<string>>(`/user/${id}/enable`)

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
