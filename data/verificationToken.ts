import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  return await db.verificationToken.findFirst({
    where: {
      email,
    },
  });
};

export const getVerificationTokenByToken = async (token: string) => {
  return await db.verificationToken.findUnique({
    where: {
      token,
    },
  });
};
