import credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema/Schema";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new CredentialsSignin("Invalid credentials!");
          }
          if (validatedFields.data.code) {
            credentials.code = validatedFields.data.code;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new CredentialsSignin("Invalid credentials!");
          }
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
