"use client";
import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {LoginSchema} from "@/app/schemas/loginSchema";
import {authClient} from "@/lib/auth-client";
import z from "zod"
import {toast} from "sonner";
import {useRouter} from "next/navigation";

function Login() {

    const form = useForm({
        resolver: standardSchemaResolver(LoginSchema),
        defaultValues: {email: "", password: ""}
    });

    const router = useRouter()

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        await authClient.signIn.email({
            email: data.email,
            password: data.password
        }).then(() => {
            toast.success("you successfully logged in");
            router.push("/");
        }).catch((error)=>{
            toast.error(error)
        })
    }

    return (
        <Card className="w-1/2 bg-chart-4/90">
            <CardHeader>
                <CardTitle className="text-center">log in</CardTitle>
                <CardDescription>log in with your account</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={!!fieldState.error}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input placeholder="amir@gmail.com" id={field.name} {...field} />
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
                                    <Input placeholder="****" id={field.name} {...field} />
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                </Field>
                            )}
                        />
                        <Button>log in</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login
