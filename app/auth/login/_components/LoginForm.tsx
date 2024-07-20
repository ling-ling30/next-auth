"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "../../../../components/CardWrapper";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { login } from "@/actions/login";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/schema/Schema";

type Props = {};

const LoginForm = (props: Props) => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in used with diferent provider!"
      : null;
  const [isPending, startTransasition] = useTransition();

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(undefined);
    setSuccess(undefined);
    if (showTwoFactor) {
      if (!values.code) return setError("Invalid code!");
    }
    startTransasition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      BackButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        className="bg-background"
                        placeholder="132465"
                        id="code"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="bg-background"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="password"
                        className="bg-background"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      className="px-1 font-normal"
                      size={"sm"}
                      variant={"link"}
                    >
                      <Link href={"/auth/reset"}> Forgot password?</Link>
                    </Button>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormError message={error} />
          {urlError && <FormError message={urlError} />}
          <FormSuccess message={success} />

          <Button className="w-full" disabled={isPending} type="submit">
            {showTwoFactor ? "Confirm" : "Submit"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
