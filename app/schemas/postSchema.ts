import z from "zod"

export const postSchema = z.object({
    title: z.string().min(3).max(40),
    content: z.string().min(20),
    image : z.string().optional().default("https://placehold.co/600x400")
})