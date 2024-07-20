import { db } from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  return await db.twoFactorToken.findFirst({
    where: {
      email,
    },
  });
};

export const getTwoFactorTokenByToken = async (token: string) => {
  return await db.twoFactorToken.findUnique({
    where: {
      token,
    },
  });
};
