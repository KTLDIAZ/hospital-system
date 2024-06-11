import { ApiResponse } from "../types/api.interface"
import AxiosInstance from "./AxiosInstance"

export default class AuthService {
  static async Login(email: string, password: string) {
    try {
      const response = await AxiosInstance.post<ApiResponse<string>>('/auth/login', 
        { email, password }, 
        { withCredentials: true })
      return response.data.ok
    } catch(ex) {
      return false
    }
  }

  static async GetRoles() {
    try {
      const response = await AxiosInstance
        .get<ApiResponse<object>>('/auth/roles', { withCredentials: true })
      return response.data
    } catch(ex) {
      const errorResponse: ApiResponse<object> = { ok: false, message: 'an error has ocurred', data: null }
      return errorResponse
    }
  }

  static async GetUserTypes() {
    try {
      const response = await AxiosInstance
        .get<ApiResponse<string[]>>('/auth/user-types', { withCredentials: true })
      return response.data
    } catch(ex) {
      const errorResponse: ApiResponse<string[]> = { ok: false, message: 'an error has ocurred', data: null }
      return errorResponse
    }
  }
}