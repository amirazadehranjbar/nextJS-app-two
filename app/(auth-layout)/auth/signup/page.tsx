"use client";
import React, {useTransition} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {SignupSchema} from "@/app/schemas/signupSchema";
import {
    Controller,
    useForm,

} from "react-hook-form";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import z from "zod";
import {Loader2} from "lucide-react";

function Signup() {

    const form = useForm({
        resolver: standardSchemaResolver(SignupSchema),
        defaultValues: {name: "", email: "", password: ""}
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: z.infer<typeof SignupSchema>) => {
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                name: data.name,
                password: data.password
            })
        })
    }

    return (

        <Card className="w-1/2 bg-chart-4/90 h-auto">
            <CardHeader>
                <CardTitle className="text-center">sign up</CardTitle>
                <CardDescription>sign up to get started</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <Controller
                            name="name"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={!!fieldState.error}>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="amir"
                                           id={field.name} {...field} />
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={!!fieldState.error}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="amir@gmail.com"
                                           id={field.name} {...field} />
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                </Field>
                            )}
                        />


                        <Controller
                            name="password"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={!!fieldState.error}>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="****"
                                           id={field.name} {...field} />
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                </Field>
                            )}
                        />
                        <Button className="cursor-pointer" disabled={isPending}>{
                            isPending
                                ? (<>
                                    <Loader2 className="size-4 animate-spin"/>
                                    <span>loading....</span>
                                </>)
                                : (<span>sign up</span>)
                        }</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>

    )
}

export default Signup
