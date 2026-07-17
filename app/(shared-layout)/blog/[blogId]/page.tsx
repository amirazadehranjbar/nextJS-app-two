"use client"
import React, {Suspense, use} from 'react'
import {FaRegArrowAltCircleLeft} from "react-icons/fa";
import Link from "next/link";
import {useParams} from "next/navigation";
import {fetchQuery} from "convex/nextjs";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";


function BlogIdPage() {

    const {blogId} = useParams<{ blogId: Id<"posts"> }>()

    return (
        <div className="animate-in fade-in duration-500 w-full h-full bg-chart-5">
            <div className="w-full shadow-md flex p-4">
                <Link href="/blog">
                    <FaRegArrowAltCircleLeft className="size-9 cursor-pointer"/>
                </Link>
            </div>

            {/*
              Suspense only wraps PostContent, not the whole page.
              This means the back-arrow header above renders immediately,
              and only this inner area shows "Loading..." while the post fetches.
              If use() were called directly here in BlogIdPage, the ENTIRE
              component (including the header) would disappear during loading.
            */}
            <Suspense fallback={<div>Loading...</div>}>
                <PostContent blogId={blogId} />
            </Suspense>

        </div>
    )
}

export default BlogIdPage


// NOTE: this old function is now unused — kept here so you can compare
// it against the new approach below. It was async and returned JSX directly,
// which is why calling it as {getPost(blogId)} inside JSX didn't work reliably
// in a Client Component: React can't render a raw Promise like that outside
// a Server Component or use().
export const getPost = async (blogId : Id<"posts">) => {
    const post = await fetchQuery(api.posts.getPostById , {postId : blogId})
    if(!post){
        return (<div>error</div>)
    }
    return (
        <div className="w-full h-full flex flex-col items-center content-center">
            {post?.title}
        </div>
    )
}


// This is the component that actually calls use().
// Splitting it out from BlogIdPage lets Suspense target just this piece.
function PostContent({ blogId }: { blogId: Id<"posts"> }) {

    // use() needs a promise. If it's still pending, use() "throws" it,
    // React catches that throw, and shows the nearest Suspense fallback
    // instead of rendering this component. Once the promise resolves,
    // use() returns the actual value and this component renders normally.
    const post = use(getPostPromise(blogId))

    if (!post) {
        return <div>error</div>
    }

    return (
        <div className="w-full h-full flex flex-col items-center content-center">
            {post.title}
        </div>
    )
}


// The cache lives OUTSIDE any component, at module scope, so it survives
// across re-renders (it's not reset when BlogIdPage re-renders).
const postPromiseCache = new Map<string, Promise<any>>()

// This function is NOT async — it's a plain function that returns
// a promise, either a freshly-created one (first call for this blogId)
// or the SAME one it made before (every call after that).
//
// Why this matters for use(): on every re-render, React calls
// getPostPromise(blogId) again. If this created a new fetchQuery(...)
// promise every single time, use() would see a "new" promise each render
// and suspend forever — that was the bug in the old getPost.
// By caching per blogId, the second (and third, and Nth) call returns
// the EXACT SAME promise object, so use() can actually resolve it once
// and move on.
function getPostPromise(blogId: Id<"posts">) {
    if (!postPromiseCache.has(blogId)) {
        postPromiseCache.set(blogId, fetchQuery(api.posts.getPostById, { postId: blogId }))
    }
    return postPromiseCache.get(blogId)!
}