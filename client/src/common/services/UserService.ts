import axios from 'axios'
import { ApiResponse } from '../types/api.interface'
import AxiosInstance from './AxiosInstance'
import { AppUser, CreateUser, UserByIdentity } from '../types/user.interface'

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
}
