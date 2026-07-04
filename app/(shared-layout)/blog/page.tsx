import React from 'react'
import {fetchQuery} from "convex/nextjs"
import {api} from "@/convex/_generated/api"
import {Card} from "@/components/ui/card";
import Image from "next/image";


async function blogPage() {

    const posts = await fetchQuery(api.posts.getPosts)

    return (
        <div className="w-full h-full bg-chart-5/60">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-extrabold pt-10 text-chart-5 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.3)]">Our
                    Blogs</h1>
                <p className="text-2xl pt-3 font-mono tracking-tighter text-muted">Insights , thoughts , and trends from
                    our team.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {posts.map((post) => {
                    return (
                        <Card key={post._id} className="shadow-2xl shadow-chart-4/30">
                            <Image src="/test1.png" alt="image" width={500}
                                   height={800}/>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

export default blogPage




































