"use server";
import { getResetTokenByToken } from "@/data/resetToken";
import { getUserByEmail } from "@/data/user";
import { newPasswordSchema } from "@/schema/Schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing Token" };
  }

  const validatedField = newPasswordSchema.safeParse(values);

  if (!validatedField.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { password } = validatedField.data;

  const existingToken = await getResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "email does not exist!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "New password updated!",
  };
};
