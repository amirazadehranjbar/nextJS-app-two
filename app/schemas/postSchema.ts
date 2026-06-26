import z from "zod"

export const PostSchema = z.object({
    title: z.string().min(3).max(40),
    content: z.string().min(20)
})