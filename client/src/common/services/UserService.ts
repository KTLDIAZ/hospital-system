import axios from "axios"
import { ApiResponse } from '../types/api.interface';
import AxiosInstance from "./AxiosInstance"

export default class UserService {
  static async Search(identity: string) {
    try {
      const response = await AxiosInstance.get<ApiResponse<string>>(`/user/identity/${identity}`, 
        { withCredentials: true })
      
      return response.data
    } catch(error) {

      if (axios.isAxiosError(error))  {
        return error.response?.data
      } else {
        const response:ApiResponse<string> = {
          data: '',
          message: 'An error has ocurred',
          ok: false
        }
        return response 
      }

    }
  }
}