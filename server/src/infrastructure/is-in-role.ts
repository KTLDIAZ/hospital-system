import { jwtVerify } from "jose"
import Enviroment from "../common/constants/enviroment.js"
import { UserModel } from "../models/user-model.js"
import { Types } from "mongoose"

export const isInRole = async (roles: string[], token: string) => {
    if (!token) return false
    
    const secret = new TextEncoder().encode(Enviroment.secret)

    const { payload } = await jwtVerify(token, secret)

    const userId = payload['userId'] as string
    
    const isInRole = await UserModel.IsInRole(new Types.ObjectId(userId), roles)
    return isInRole
}