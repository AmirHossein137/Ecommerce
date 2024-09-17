//@ts-nocheck

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          await connectDB();
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Please enter valid information...");
          }

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("Please create an account first...");
          }

          const isValid = await verifyPassword(password, user.password);

          if (!isValid) throw new Error("Email or password is incorrect");

          return { email };
        } catch (err) {
          console.log(err);
          throw new Error("A problem has occurred on the server");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
