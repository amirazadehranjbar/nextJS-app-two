'use server'

import z from "zod"
import {revalidatePath} from 'next/cache'
import {fetchAuthMutation} from '@/lib/auth-server'
import {api} from '@/convex/_generated/api'
import {postSchema} from "@/app/schemas/postSchema"
import {redirect} from "next/navigation";


export async function createPostAction(values: z.infer<typeof postSchema>) {


    await fetchAuthMutation(api.posts.createPost, {
        title: values.title,
        body: values.content,
    })

    revalidatePath('/')
    revalidatePath('/blog')
    redirect('/')
}

export async function getPostsAction (){

}