"use client"
import React, {FormEvent, SyntheticEvent, useRef, useState, useTransition} from 'react'
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Controller, useForm} from "react-hook-form";
import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {postSchema} from "@/app/schemas/postSchema";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {api} from "@/convex/_generated/api";
import z from "zod"
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {unstable_rethrow} from "next/navigation";
import {createPostAction} from "@/app/(shared-layout)/create/actions";
import {useMutation} from "convex/react";
import {Id} from "@/convex/_generated/dataModel";

function CreatePost() {

    //region select an upload image functions section ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
    const imageInput = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const onSubmit = async (values: z.infer<typeof postSchema>) => {
        startTransition(async () => {
            try {
                let storageId: Id<"_storage"> | undefined;

                if (selectedImage) {
                    const postUrl = await generateUploadUrl();
                    const result = await fetch(postUrl, {
                        method: "POST",
                        headers: {"Content-Type": selectedImage.type},
                        body: selectedImage,
                    });
                    ({storageId} = await result.json());
                }

                await createPostAction(values, storageId);
                toast.success("Article posted successfully");
            } catch (e) {
                unstable_rethrow(e);
                toast.error("you must log in first");
            }
        });
    };
    //endregion


    const form = useForm({
        resolver: standardSchemaResolver(postSchema),
        defaultValues: {title: "", content: ""}
    });

    const [isPending, startTransition] = useTransition();


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

                            <Controller
                                name="image"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={!!fieldState.error}>
                                        <FieldLabel htmlFor={field.name}>image</FieldLabel>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={imageInput}
                                            onChange={(event) => setSelectedImage(event.target.files![0])}
                                            disabled={selectedImage !== null}
                                        />
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button className="w-full mt-4" type="submit" disabled={isPending}>
                            {isPending
                                ? (<Loader2 className="size-4"/>)
                                : (<p>post</p>)
                            }
                        </Button>

                    </form>
                </CardContent>
            </Card>

        </div>
    )
}

export default CreatePost


