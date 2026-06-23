"use client";
import React from 'react'
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

function Signup() {

    const form = useForm({
        resolver: standardSchemaResolver(SignupSchema),
        defaultValues: {name: "", email: "", password: ""}
    });

    const onSubmit = async (data : z.infer<typeof  SignupSchema>)=>{
        await authClient.signUp.email({
            email : data.email ,
            name : data.name ,
            password : data.password
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
                                    <Input aria-invalid={fieldState.invalid} placeholder="amir" id={field.name} {...field} />
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
                                    <Input aria-invalid={fieldState.invalid} placeholder="amir@gmail.com" id={field.name} {...field} />
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
                                    <Input aria-invalid={fieldState.invalid} placeholder="****" id={field.name} {...field} />
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []}/>
                                </Field>
                            )}
                        />
                        <Button className="cursor-pointer">sign up</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>

    )
}

export default Signup
