import { Types } from "mongoose";

export interface Claims {
  userId: Types.ObjectId
  roles: string[]
}