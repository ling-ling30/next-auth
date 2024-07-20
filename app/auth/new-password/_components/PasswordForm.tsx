"use client";
import React, { useCallback, useState, useTransition } from "react";
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
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { newPasswordSchema } from "@/schema/Schema";
import { newPassword } from "@/actions/new-password";

type Props = {};

const PasswordForm = (props: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransasition] = useTransition();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    startTransasition(() => {
      newPassword(values, token).then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      BackButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className="bg-background"
                    placeholder="******"
                    type="password"
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default PasswordForm;
