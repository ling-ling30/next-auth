"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordEmail } from "@/lib/mail";
import { generateResetToken } from "@/lib/token";
import { resetSchema } from "@/schema/Schema";
import { z } from "zod";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedField = resetSchema.safeParse(values);

  if (!validatedField.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedField.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const token = await generateResetToken(email);

  await sendPasswordEmail(email, token.token);

  return { success: "Reset email sent!" };
};
