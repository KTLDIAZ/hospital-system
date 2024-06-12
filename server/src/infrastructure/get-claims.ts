import { jwtVerify } from "jose"
import Enviroment from "../common/constants/enviroment.js"

export const getClaims = async (token: string) => {
    if (!token) return null
    
    const secret = new TextEncoder().encode(Enviroment.secret)

    const { payload } = await jwtVerify(token, secret)

    return payload
}