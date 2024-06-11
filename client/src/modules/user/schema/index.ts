import { toZod } from "tozod";
import { z } from "zod";
import { CreateUser } from "~/common/types/user.interface";


export const userSchema: toZod<CreateUser> = z.object({
  birthDate: z.date(),
  bloodType: z.string(),
  email: z.string().email(),
  fullName: z.string().min(5),
  type: z.string(),
  identityDocument: z.string(),
  password: z.string().min(8),
  roles: z.array(z.object({ name: z.string() })),
  specialties: z.array(z.string()).optional()
})