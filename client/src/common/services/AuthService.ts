import { ApiResponse } from "../types/api.interface"
import AxiosInstance from "./AxiosInstance"

export default class AuthService {
  static async Login(email: string, password: string) {
    try {
      await AxiosInstance.post<ApiResponse<string>>('/auth/login', 
        { email, password }, 
        { withCredentials: true })
      return true
    } catch(ex) {
      return false
    }
  }
}