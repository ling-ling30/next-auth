"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schema/Schema";
import { error } from "console";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth, unstable_update } from "@/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const dbUser = await getUserById(user.id);
  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser) {
      return {
        error: "Email already in use!",
      };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }

  if (values.password && values.newPassword && dbUser?.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return {
        error: "Incorrect passworrd!",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  if (!dbUser) {
    return {
      error: "Unauthorized",
    };
  }
  if (values) {
    const updatedUser = await db.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        ...values,
      },
    });

    revalidatePath("/server");
    return {
      success: "User is updated!",
    };
  }
};
