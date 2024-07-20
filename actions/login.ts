"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schema/Schema";
import { error } from "console";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;
  // const existingUser = await getUserByEmail(email);
  // if (!existingUser) {
  //   return {
  //     error: "Email doesn't exist",
  //   };
  // }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(email);
  //   await sendVerificationEmail(email, verificationToken.token);

  //   return {
  //     success: "Confirmation email sent.",
  //   };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      code,
      isCode: code ? true : false,
    });

    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials!" };
        }
        case "AccessDenied": {
          if (error.cause?.err?.message === "Verification email sent!") {
            return {
              success: "Verification email sent!",
            };
          }
          if (error.cause?.err?.message === "TwoFactor") {
            return {
              twoFactor: true,
            };
          }
          return { error: error.cause?.err?.message || "Something went wrong" };
        }
        case "CallbackRouteError": {
          return { error: error.cause?.err?.message || "Something went wrong" };
        }
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
