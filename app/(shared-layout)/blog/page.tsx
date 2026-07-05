import React, {Suspense} from 'react'
import {fetchQuery} from "convex/nextjs"
import {api} from "@/convex/_generated/api"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


function blogPage() {


    return (
        <div className="w-full h-full bg-chart-5/60">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-extrabold pt-10 text-chart-5 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.3)]">Our
                    Blogs</h1>
                <p className="text-2xl pt-3 font-mono tracking-tighter text-muted">Insights , thoughts , and trends from
                    our team.</p>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {posts.map((post) => {
                return (
                    <Card key={post._id} className="shadow-2xl shadow-chart-4/30 bg-chart-5">
                        <Image src="/test2.png" alt="image" width={0}
                               height={0}
                               sizes="60vw"
                               className="w-full p-2"/>
                        <CardContent>
                            <h1 className="text-center text-lg font-bold font-mono text-chart-1">{post.title}</h1>
                            <p className="text-muted-foreground pt-2 line-clamp-3">{post.body}</p>
                        </CardContent>

                        <CardFooter className="items-center justify-center flex cursor-pointer hover:bg-chart-2
                            transition-all duration-500 ease-out">
                            <Link href={`/blog/${post._id}`} className="font-mono text-chart-1">
                                read more
                            </Link>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}




































