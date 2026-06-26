"use client"
import React from 'react'
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Controller, useForm} from "react-hook-form";
import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {PostSchema} from "@/app/schemas/postSchema";

function CreatePage() {

    const form = useForm({
        resolver:standardSchemaResolver(PostSchema),
        defaultValues :{title: "" , content: ""}
    })


    return (
        <div className="h-full bg-chart-5 flex flex-col items-center">

            <div className="pt-3">
                <h1 className="text-2xl md:text-3xl font-extrabold font-mono text-chart-1 tracking-tighter">create post</h1>

                <p className="text-chart-1/40">create your own blog and post here</p>
            </div>

            <Card className="w-10/12 p-3 mt-5 border shadow-md">
                <CardTitle className="text-chart-1">new post</CardTitle>
                <CardDescription>post your blog here</CardDescription>
                <CardContent>
                    <form></form>
                </CardContent>
            </Card>

        </div>
    )
}

export default CreatePage
