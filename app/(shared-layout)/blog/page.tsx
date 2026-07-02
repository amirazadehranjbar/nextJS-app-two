import React from 'react'
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"


async function blogPage() {

    const posts = await fetchQuery(api.posts.getPosts)

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}

export default blogPage
