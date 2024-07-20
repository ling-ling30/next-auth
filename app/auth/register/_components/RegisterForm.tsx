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
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schema/Schema";
import { useRouter } from "next/navigation";

type Props = {};

const RegisterForm = (props: Props) => {
  const [isPending, startTransasition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransasition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        // if (data.success) {
        //   router.push("/auth/login");
        // }
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      BackButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="bg-background"
                    placeholder="Name"
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
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button className="w-full" disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
