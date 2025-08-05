"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignUpSchema, SignUpSchemaType } from "@/lib/schemas";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/action/register";

export default function SignUpPage() {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: SignUpSchemaType) => {
        setError(null);
        form.clearErrors();
        
        try {

            const result = await registerUser(data);

            if (!result.success) { 
                setError(result.error || "An error occured while creating your account.");
                return;
            }

            router.push("/auth/signin");

        } catch (error) {
            console.error("Registration error: ", error);
            setError("An error occured while creating your account.");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 mx-auto">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Create new Account</CardTitle>
                    <CardDescription className="text-center">
                        Or{" "}
                        <Link
                            href="/auth/signin"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign in to your account
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    {error && (
                        <p className="mb-4 text-sm text-destructive text-center">
                            {error}
                        </p>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}