import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getResetTokenByEmail } from "@/data/resetToken";
import { randomInt } from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = db.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return verificationToken;
};

export const generateResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = db.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = randomInt(100_000).toString();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
