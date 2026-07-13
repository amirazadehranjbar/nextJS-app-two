'use server'

import z from "zod"
import {revalidatePath} from 'next/cache'
import {fetchAuthMutation} from '@/lib/auth-server'
import {api} from '@/convex/_generated/api'
import {postSchema} from "@/app/schemas/postSchema"
import {redirect} from "next/navigation";
import {Id} from "@/convex/_generated/dataModel";



export async function createPostAction(
    values: z.infer<typeof postSchema>

) {
    const parsed = postSchema.safeParse(values);
    if (!parsed.success) throw new Error("some data not validated");

    await fetchAuthMutation(api.posts.createPost, {
        title: parsed.data!.title,
        body: parsed.data!.content,
        imageUrl : parsed.data.imageUrl || null

    });

    revalidatePath('/');
    revalidatePath('/blog');
    redirect('/blog');
}

