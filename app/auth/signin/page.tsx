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
import { SignInSchema, SignInSchemaType } from "@/lib/schemas";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { update: updateSession } = useSession();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    // Handle sign-in logic here, e.g., call an API to authenticate the user
    setError(null);

    try {
      const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password.");
        } else {
          setError("An error occurred during sign in.");
        }
      } else { 
        await updateSession();
        router.push("/");
      }
      
    } catch (err) {
      console.log("Sign in error: ",err);
      setError("An error occurred during sign in.");
    }

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 mx-auto">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Sign in to your Account
          </CardTitle>
          <CardDescription className="text-center">
            Or{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:underline"
            >
              Create a new account
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>

          {error && (
            <p className="mb-4 text-sm text-destructive text-center">
              { error }
            </p>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}