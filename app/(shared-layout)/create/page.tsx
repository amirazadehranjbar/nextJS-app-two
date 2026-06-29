"use client"
import React from 'react'
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Controller, useForm} from "react-hook-form";
import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {PostSchema} from "@/app/schemas/postSchema";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

function CreatePage() {

    const form = useForm({
        resolver: standardSchemaResolver(PostSchema),
        defaultValues: {title: "", content: ""}
    });


    const onSubmit = () => {
        console.log("submmit");
    }


    return (
        <div className="h-full bg-chart-5 flex flex-col items-center">

            <div className="pt-3">
                <h1 className="text-2xl md:text-3xl font-extrabold font-mono text-chart-1 tracking-tighter">create
                    post</h1>

                <p className="text-chart-1/40">create your own blog and post here</p>
            </div>

            <Card className="w-10/12 p-3 mt-5 border shadow-md">
                <CardTitle className="text-chart-1 text-center">new post</CardTitle>
                <CardDescription>post your blog here</CardDescription>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                        <input aria-invalid={fieldState.invalid} placeholder="title"
                                               id={field.name} {...field}
                                               className="p-2 border-2 outline-none border-border mb-2 shadow-lg shadow-chart-4 rounded-md focus:border-ring/50"/>
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                    </Field>
                                )}
                            />


                            <Controller
                                name="content"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                                        <textarea aria-invalid={fieldState.invalid} placeholder="title"
                                                  id={field.name} {...field}
                                                  className="p-2 border-2 outline-none border-border mb-2 shadow-lg shadow-chart-4 rounded-md focus:border-ring/50"/>
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button className="w-full mt-4" type="submit">
                            post
                        </Button>

                    </form>
                </CardContent>
            </Card>

        </div>
    )
}

export default CreatePage
