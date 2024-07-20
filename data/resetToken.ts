import { db } from "@/lib/db";

export const getResetTokenByEmail = async (email: string) => {
  return await db.passwordResetToken.findFirst({
    where: {
      email,
    },
  });
};

export const getResetTokenByToken = async (token: string) => {
  return await db.passwordResetToken.findUnique({
    where: {
      token,
    },
  });
};
