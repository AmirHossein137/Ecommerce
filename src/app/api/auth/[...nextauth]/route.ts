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
            throw new Error("لطفا اطلاعات معتبر وارد نمایید");
          }

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("لطفا ابتدا حساب کاربری ایجاد نمایید");
          }

          const isValid = await verifyPassword(password, user.password);

          if (!isValid) throw new Error("ایمیل یا رمز عبور اشتباه است");

          return { email };

        } catch (err) {
          console.log(err);
          throw new Error("مشکلی در سرور رخ داده است");
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
