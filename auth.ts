import NextAuth, { CredentialsSignin } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { sendTwoFactorEmail, sendVerificationEmail } from "./lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "./lib/token";
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation";
import {
  getTwoFactorTokenByEmail,
  getTwoFactorTokenByToken,
} from "./data/twoFactorToken";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, credentials }) {
      const code = credentials!.code as string;
      // Allow Oauth without email verification
      if (account?.provider == "oauth") return true;
      const existingUser = await getUserById(user.id!);

      if (!existingUser) {
        throw new CredentialsSignin("User not found");
      }

      // Prevent sign in without email verification
      if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
          existingUser.email!
        );
        await sendVerificationEmail(
          existingUser.email!,
          verificationToken.token
        );
        throw new CredentialsSignin("Verification email sent!");
      }

      //ADD 2FA Check
      if (existingUser.isTwoFactorEnabled) {
        // if no token provided then send an email
        if (!credentials?.code) {
          const verificationToken = await generateTwoFactorToken(user.email!);
          await sendTwoFactorEmail(user.email!, verificationToken.token);
          throw new CredentialsSignin("TwoFactor");
        }

        //check if the token exists
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email!
        );
        if (!twoFactorToken) {
          throw new CredentialsSignin("Invalid code");
        }

        if (twoFactorToken.token !== code) {
          throw new CredentialsSignin("Invalid code");
        }

        //check the code is expired
        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) {
          throw new CredentialsSignin("Code has expired");
        }

        await db.twoFactorToken.delete({
          where: {
            id: twoFactorToken.id,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      console.log("i am being called again");
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.name = token.name;
        session.user.email = token.email || "";
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }
      return session;
    },
  },
  // events: {
  //   async linkAccount({ user }) {
  //     await db.user.update({
  //       where: { id: user.id },
  //       data: {
  //         emailVerified: new Date(),
  //       },
  //     });
  //   },
  // },

  ...authConfig,
});
