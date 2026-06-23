import z from "zod"

export const SignupSchema = z.object({
    name : z.string().min(3).max(30) ,
    password : z.string().min(8).max(30),
    email : z.email()
})