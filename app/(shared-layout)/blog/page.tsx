import React, {Suspense} from 'react'
import {fetchQuery} from "convex/nextjs"
import {api} from "@/convex/_generated/api"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ExpandableProfileCard from "@/components/myComponents/expandable-profile-card";


function blogPage() {


    return (
        <div className="w-full h-screen bg-chart-5/60">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-extrabold pt-10 text-foreground drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.3)]">
                    Our Blogs
                </h1>
                <p className="text-2xl pt-3 font-mono tracking-tighter text-muted-foreground">
                    Insights, thoughts, and trends from our team.
                </p>
            </div>

            <Suspense fallback={<p className="text-5xl text-red-700 font-extrabold">Loading ....</p>}>
                <LoadingBlogs/>
            </Suspense>
        </div>
    )
}

export default blogPage

// suspense function for loading blogs
export async function LoadingBlogs() {


    await new Promise((resolve) => setTimeout(resolve, 5000))

    const posts = await fetchQuery(api.posts.getPosts)
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full p-4">

            {posts.map((post) => {
                return (
                    <ExpandableProfileCard key={post._id} imageSrc={`/test2.png`} title={post.title} body={post.body} author={post.authorId}/>
                );
            })}
        </div>
    );
}




































